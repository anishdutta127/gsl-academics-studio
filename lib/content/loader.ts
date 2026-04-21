import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import {
  AssignmentsSchema,
  OutputLinksSchema,
  PlaybookSchema,
  SchoolsSchema,
  SkillSchema,
  TeamSchema,
  normaliseOutputLink,
  type Assignments,
  type DiscoveredOutput,
  type OutputLinks,
  type Playbook,
  type School,
  type Skill,
  type TeamMember
} from "./types";
import { parseOutputFilename } from "./parse-filename";

/**
 * The content loader resolves a single content root per request.
 *
 * GSL_CONTENT_SOURCE = "onedrive" (dev default)  → reads GSL_ONEDRIVE_PATH
 * GSL_CONTENT_SOURCE = "synced"   (prod default) → reads ./content-synced/
 *
 * If the primary root is unreadable, the loader falls back to
 * ./content-synced/. Dev keeps working when OneDrive sync is broken.
 * See CLAUDE.md > Content pipeline.
 */

const DEFAULT_SOURCE: "onedrive" | "synced" = "onedrive";

function syncedRoot(): string {
  return path.join(process.cwd(), "content-synced");
}

const resolveContentRoot = cache(async (): Promise<string> => {
  const source =
    (process.env.GSL_CONTENT_SOURCE as "onedrive" | "synced" | undefined) ??
    DEFAULT_SOURCE;
  const onedrivePath = process.env.GSL_ONEDRIVE_PATH;
  const synced = syncedRoot();

  // Figure out the intended primary and whether a fallback exists.
  let primary: string;
  let fallback: string | null;
  if (source === "onedrive") {
    if (!onedrivePath) {
      // Treat unset as "use synced directly" rather than throwing. This makes
      // production builds work when only ./content-synced/ is on disk, and it
      // makes fresh checkouts work before the developer has set up OneDrive.
      primary = synced;
      fallback = null;
    } else {
      primary = onedrivePath;
      fallback = synced;
    }
  } else {
    primary = synced;
    fallback = null;
  }

  try {
    await fs.access(primary);
    return primary;
  } catch {
    if (fallback) {
      try {
        await fs.access(fallback);
        console.warn(
          `[content] ${primary} unreadable, falling back to ${fallback}`
        );
        return fallback;
      } catch {
        // fall through to the combined error below
      }
    }
    throw new Error(
      `[content] content root is not readable: ${primary}${
        fallback ? ` (also tried fallback ${fallback})` : ""
      }. ` +
        "Set GSL_ONEDRIVE_PATH, or run `pnpm sync-content`, or create content-synced/."
    );
  }
});

async function readMarkdownDir(
  subdir: string
): Promise<{ filename: string; raw: string }[]> {
  const root = await resolveContentRoot();
  const dir = path.join(root, subdir);
  try {
    const files = await fs.readdir(dir);
    const results: { filename: string; raw: string }[] = [];
    for (const f of files) {
      if (!f.endsWith(".md")) continue;
      const full = path.join(dir, f);
      const raw = await fs.readFile(full, "utf8");
      results.push({ filename: f, raw });
    }
    return results;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
}

async function readJsonFile<T>(
  relative: string,
  parse: (v: unknown) => T,
  fallback: T
): Promise<T> {
  const root = await resolveContentRoot();
  const file = path.join(root, relative);
  try {
    const raw = await fs.readFile(file, "utf8");
    return parse(JSON.parse(raw));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    console.error(
      `[content] failed to parse ${relative}: ${(e as Error).message}`
    );
    return fallback;
  }
}

// Playbooks ---------------------------------------------------------------

export const getAllPlaybooks = cache(async (): Promise<Playbook[]> => {
  const files = await readMarkdownDir("playbooks");
  const out: Playbook[] = [];
  for (const { filename, raw } of files) {
    try {
      const parsed = matter(raw);
      const playbook = PlaybookSchema.parse({
        frontmatter: parsed.data,
        body: parsed.content.trim()
      });
      out.push(playbook);
    } catch (e) {
      console.error(
        `[content] failed to parse playbook ${filename}: ${(e as Error).message}`
      );
    }
  }
  return out.sort((a, b) =>
    a.frontmatter.title.localeCompare(b.frontmatter.title)
  );
});

export const getPlaybook = cache(
  async (slug: string): Promise<Playbook | null> => {
    const all = await getAllPlaybooks();
    return all.find((p) => p.frontmatter.slug === slug) ?? null;
  }
);

// Skills ------------------------------------------------------------------

export const getAllSkills = cache(async (): Promise<Skill[]> => {
  const files = await readMarkdownDir("skills");
  const out: Skill[] = [];
  for (const { filename, raw } of files) {
    try {
      const parsed = matter(raw);
      const skill = SkillSchema.parse({
        frontmatter: parsed.data,
        body: parsed.content.trim()
      });
      out.push(skill);
    } catch (e) {
      console.error(
        `[content] failed to parse skill ${filename}: ${(e as Error).message}`
      );
    }
  }
  return out.sort((a, b) =>
    a.frontmatter.title.localeCompare(b.frontmatter.title)
  );
});

export const getSkill = cache(async (slug: string): Promise<Skill | null> => {
  const all = await getAllSkills();
  return all.find((s) => s.frontmatter.slug === slug) ?? null;
});

// Meta JSON ---------------------------------------------------------------

export const getSchools = cache(
  async (): Promise<School[]> =>
    readJsonFile("meta/schools.json", (v) => SchoolsSchema.parse(v), [])
);

export const getAssignments = cache(
  async (): Promise<Assignments | null> =>
    readJsonFile(
      "meta/assignments.json",
      (v) => AssignmentsSchema.parse(v),
      null as Assignments | null
    )
);

export const getTeam = cache(
  async (): Promise<TeamMember[]> =>
    readJsonFile("meta/team.json", (v) => TeamSchema.parse(v), [])
);

export const getOutputLinks = cache(
  async (): Promise<OutputLinks> =>
    readJsonFile(
      "meta/output-links.json",
      (v) => OutputLinksSchema.parse(v),
      {} as OutputLinks
    )
);

// Outputs -----------------------------------------------------------------

/**
 * Lists outputs for a playbook.
 *
 * In onedrive mode we read the directory live. In synced mode the actual
 * output files were not copied into ./content-synced/ (decision 010 risk 1),
 * so we read meta/outputs-manifest.json which the sync script wrote.
 *
 * Both paths return the same DiscoveredOutput shape so the UI does not
 * branch on mode.
 */
async function listOutputFilenames(
  root: string,
  playbookSlug: string
): Promise<string[]> {
  // Try reading the outputs subdirectory directly first (onedrive mode, or a
  // dev who also synced outputs by hand).
  const dir = path.join(root, "outputs", playbookSlug);
  try {
    const files = await fs.readdir(dir);
    return files.filter((f) => !f.startsWith(".") && f !== ".gitkeep");
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
  }

  // Fallback: read the manifest the sync script wrote (synced mode).
  const manifestPath = path.join(root, "meta", "outputs-manifest.json");
  try {
    const raw = await fs.readFile(manifestPath, "utf8");
    const manifest = JSON.parse(raw) as {
      playbooks?: Record<string, string[]>;
    };
    return manifest.playbooks?.[playbookSlug] ?? [];
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
}

/**
 * Cross-playbook aggregation: returns every DiscoveredOutput across every
 * published playbook, already sorted by parsed-date-desc (unparseable at
 * the end). Used by the school detail page and the /impact dashboard.
 */
export const getAllOutputs = cache(async (): Promise<DiscoveredOutput[]> => {
  const playbooks = await getAllPlaybooks();
  const published = playbooks.filter(
    (p) => p.frontmatter.status === "published"
  );
  const perPlaybook = await Promise.all(
    published.map((p) => getOutputsForPlaybook(p.frontmatter.slug))
  );
  const all = perPlaybook.flat();
  all.sort((a, b) => {
    if (a.parsed?.date && b.parsed?.date) {
      return b.parsed.date.localeCompare(a.parsed.date);
    }
    if (a.parsed && !b.parsed) return -1;
    if (!a.parsed && b.parsed) return 1;
    return a.filename.localeCompare(b.filename);
  });
  return all;
});

export const getOutputsForPlaybook = cache(
  async (playbookSlug: string): Promise<DiscoveredOutput[]> => {
    const root = await resolveContentRoot();
    const filenames = await listOutputFilenames(root, playbookSlug);
    const links = await getOutputLinks();

    const results: DiscoveredOutput[] = filenames.map((filename) => {
      const parsed = parseOutputFilename(filename);
      const relativePath = `outputs/${playbookSlug}/${filename}`;
      const { shareUrl, schools } = normaliseOutputLink(links[relativePath]);
      return { filename, relativePath, parsed, shareUrl, schools };
    });

    // Parseable outputs sort by date desc; unparseable fall to the end.
    results.sort((a, b) => {
      if (a.parsed?.date && b.parsed?.date) {
        return b.parsed.date.localeCompare(a.parsed.date);
      }
      if (a.parsed && !b.parsed) return -1;
      if (!a.parsed && b.parsed) return 1;
      return a.filename.localeCompare(b.filename);
    });
    return results;
  }
);
