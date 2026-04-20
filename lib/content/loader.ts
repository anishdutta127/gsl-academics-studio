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

function primaryRoot(): string {
  const source =
    (process.env.GSL_CONTENT_SOURCE as "onedrive" | "synced" | undefined) ??
    DEFAULT_SOURCE;

  if (source === "onedrive") {
    const p = process.env.GSL_ONEDRIVE_PATH;
    if (!p) {
      throw new Error(
        "[content] GSL_CONTENT_SOURCE=onedrive but GSL_ONEDRIVE_PATH is not set. " +
          "Set it in .env.local, or switch GSL_CONTENT_SOURCE=synced."
      );
    }
    return p;
  }
  return path.join(process.cwd(), "content-synced");
}

function syncedRoot(): string {
  return path.join(process.cwd(), "content-synced");
}

const resolveContentRoot = cache(async (): Promise<string> => {
  const primary = primaryRoot();
  try {
    await fs.access(primary);
    return primary;
  } catch {
    // Fall back to committed content-synced if the primary is unreadable.
    const fallback = syncedRoot();
    if (fallback === primary) {
      throw new Error(
        `[content] content root ${primary} is not readable. No fallback available.`
      );
    }
    try {
      await fs.access(fallback);
      console.warn(
        `[content] ${primary} unreadable, falling back to ${fallback}`
      );
      return fallback;
    } catch {
      throw new Error(
        `[content] neither ${primary} nor ${fallback} is readable. ` +
          `Set GSL_ONEDRIVE_PATH or run \`pnpm sync-content\`.`
      );
    }
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

export const getOutputsForPlaybook = cache(
  async (playbookSlug: string): Promise<DiscoveredOutput[]> => {
    const root = await resolveContentRoot();
    const dir = path.join(root, "outputs", playbookSlug);
    let files: string[];
    try {
      files = await fs.readdir(dir);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw e;
    }

    const links = await getOutputLinks();
    const results: DiscoveredOutput[] = files
      .filter((f) => !f.startsWith(".") && f !== ".gitkeep")
      .map((filename) => {
        const parsed = parseOutputFilename(filename);
        const relativePath = `outputs/${playbookSlug}/${filename}`;
        const shareUrl = links[relativePath] ?? null;
        return { filename, relativePath, parsed, shareUrl };
      });

    // Sort: parseable outputs by date desc first, then unparseable by filename.
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
