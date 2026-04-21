import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { getOutputLinks } from "./loader";
import {
  StandardRationaleSchema,
  normaliseOutputLink,
  type LoadedArchivedStandard,
  type LoadedCurrentStandard,
  type LoadedStandardProposal
} from "./types";

/**
 * Standards System loader (decision 012).
 *
 * Reads from the same content-root resolution the main loader uses
 * (./content-synced/ in synced mode, GSL_ONEDRIVE_PATH in onedrive mode).
 * Reference files (the actual pptx/docx/pdf) stay in OneDrive; the loader
 * resolves a share URL via meta/output-links.json keyed by relative path.
 *
 * All folders may be empty; the empty-state UI handles that case.
 */

// We intentionally re-derive the content root locally rather than exporting
// the resolver from loader.ts. Keeps the loader API surface tight; this
// module is a peer, not a dependent.
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

  let primary: string;
  let fallback: string | null;
  if (source === "onedrive") {
    if (!onedrivePath) {
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
        return fallback;
      } catch {
        // fall through
      }
    }
    throw new Error(
      `[standards] content root not readable: ${primary}${
        fallback ? ` (fallback ${fallback} also unreadable)` : ""
      }`
    );
  }
});

interface ParsedRationale {
  rationale: ReturnType<typeof StandardRationaleSchema.parse>;
  bodyMarkdown: string;
}

/**
 * Reads a rationale.md from a standards subfolder (current, a proposal
 * folder, or an archive folder). Returns null on ENOENT, throws on parse
 * error so we surface bad frontmatter loudly.
 */
async function readRationale(absDir: string): Promise<ParsedRationale | null> {
  const file = path.join(absDir, "rationale.md");
  let raw: string;
  try {
    raw = await fs.readFile(file, "utf8");
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw e;
  }
  const parsed = matter(raw);
  const rationale = StandardRationaleSchema.parse(parsed.data);
  return { rationale, bodyMarkdown: parsed.content.trim() };
}

export const getCurrentStandard = cache(
  async (playbookSlug: string): Promise<LoadedCurrentStandard | null> => {
    const root = await resolveContentRoot();
    const dir = path.join(root, "standards", playbookSlug, "current");
    let parsed: ParsedRationale | null;
    try {
      parsed = await readRationale(dir);
    } catch (e) {
      console.error(
        `[standards] failed to parse current rationale for ${playbookSlug}: ${(e as Error).message}`
      );
      return null;
    }
    if (!parsed) return null;

    const referencePath = `standards/${playbookSlug}/current/${parsed.rationale.reference_filename}`;
    const links = await getOutputLinks();
    const { shareUrl } = normaliseOutputLink(links[referencePath]);
    return {
      rationale: parsed.rationale,
      bodyMarkdown: parsed.bodyMarkdown,
      referencePath,
      shareUrl
    };
  }
);

export const getStandardProposals = cache(
  async (playbookSlug: string): Promise<LoadedStandardProposal[]> => {
    const root = await resolveContentRoot();
    const dir = path.join(root, "standards", playbookSlug, "proposals");
    let entries: string[];
    try {
      const dirents = await fs.readdir(dir, { withFileTypes: true });
      entries = dirents
        .filter((d) => d.isDirectory() && !d.name.startsWith("."))
        .map((d) => d.name);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw e;
    }

    const links = await getOutputLinks();
    const out: LoadedStandardProposal[] = [];
    for (const folder of entries) {
      let parsed: ParsedRationale | null;
      try {
        parsed = await readRationale(path.join(dir, folder));
      } catch (e) {
        console.error(
          `[standards] proposal ${playbookSlug}/${folder} has bad rationale: ${(e as Error).message}`
        );
        continue;
      }
      if (!parsed) continue;
      const referencePath = `standards/${playbookSlug}/proposals/${folder}/${parsed.rationale.reference_filename}`;
      out.push({
        folder,
        rationale: parsed.rationale,
        bodyMarkdown: parsed.bodyMarkdown,
        referencePath,
        shareUrl: normaliseOutputLink(links[referencePath]).shareUrl
      });
    }
    // Newest proposals first by set_on, falling back to folder name.
    out.sort((a, b) => {
      const da = a.rationale.set_on;
      const db = b.rationale.set_on;
      return db.localeCompare(da);
    });
    return out;
  }
);

export const getArchivedStandards = cache(
  async (playbookSlug: string): Promise<LoadedArchivedStandard[]> => {
    const root = await resolveContentRoot();
    const dir = path.join(root, "standards", playbookSlug, "archive");
    let entries: string[];
    try {
      const dirents = await fs.readdir(dir, { withFileTypes: true });
      entries = dirents
        .filter((d) => d.isDirectory() && !d.name.startsWith("."))
        .map((d) => d.name);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw e;
    }

    const links = await getOutputLinks();
    const out: LoadedArchivedStandard[] = [];
    for (const folder of entries) {
      let parsed: ParsedRationale | null;
      try {
        parsed = await readRationale(path.join(dir, folder));
      } catch (e) {
        console.error(
          `[standards] archive ${playbookSlug}/${folder} has bad rationale: ${(e as Error).message}`
        );
        continue;
      }
      if (!parsed) continue;
      const referencePath = `standards/${playbookSlug}/archive/${folder}/${parsed.rationale.reference_filename}`;
      // If the folder name is YYYY-MM-DD, use it as the archived-at date.
      const archivedAt = /^\d{4}-\d{2}-\d{2}$/.test(folder) ? folder : null;
      out.push({
        folder,
        archivedAt,
        rationale: parsed.rationale,
        bodyMarkdown: parsed.bodyMarkdown,
        referencePath,
        shareUrl: normaliseOutputLink(links[referencePath]).shareUrl
      });
    }
    out.sort((a, b) => {
      const da = a.archivedAt ?? a.rationale.set_on;
      const db = b.archivedAt ?? b.rationale.set_on;
      return db.localeCompare(da);
    });
    return out;
  }
);

// Pure helpers re-exported for component use. Live in a peer module so they
// are testable without dragging React's RSC `cache` into the test runtime.
export { extractKeyQualities } from "./standards-helpers";
