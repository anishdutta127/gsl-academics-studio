/**
 * sync-content: pulls content from OneDrive into ./content-synced/ for committing.
 *
 * What gets synced:
 *   - playbooks/          (markdown files, copied verbatim)
 *   - skills/             (markdown files, copied verbatim)
 *   - meta/               (JSON files, copied verbatim)
 *
 * What does NOT get synced (decision 010 risk 1, decision 011 A):
 *   - outputs (all subfolders and files)
 *                         The actual .pptx / .docx / .pdf files stay in
 *                         OneDrive. A 40MB PPTX committed weekly would blow
 *                         past Vercel's 100MB deploy cap within a month.
 *
 * What the script writes instead:
 *   - content-synced/meta/outputs-manifest.json
 *                         A listing of filenames per playbook, read by the
 *                         content library view. Share URLs come from
 *                         meta/output-links.json (Ritu-maintained).
 *
 * The script is idempotent: it deletes each synced subtree before re-copying,
 * so deletions in OneDrive propagate on the next run.
 *
 * Required env:
 *   GSL_ONEDRIVE_PATH     Absolute path to the OneDrive "studio" folder.
 *
 * Usage:
 *   pnpm sync-content     (loads .env.local via tsx --env-file flag)
 */

import { promises as fs, constants as fsConstants } from "node:fs";
import path from "node:path";
import { parseOutputFilename } from "../lib/content/parse-filename";

const COPY_SUBDIRS = ["playbooks", "skills", "meta"] as const;

/**
 * The standards/ tree is a special case: rationale.md and metadata.json
 * are repo-friendly text, but reference.<ext> files (pptx, docx, pdf) follow
 * the same binary-bloat constraint as outputs (decision 010 risk 1).
 * Sync copies only the text-shaped files; reference files stay in OneDrive
 * and are linked via meta/output-links.json.
 */
const STANDARDS_TEXT_EXTENSIONS = new Set([".md", ".json", ".gitkeep"]);

async function readable(p: string): Promise<boolean> {
  try {
    await fs.access(p, fsConstants.R_OK);
    return true;
  } catch {
    return false;
  }
}

async function countFiles(dir: string, predicate: (f: string) => boolean) {
  try {
    const files = await fs.readdir(dir);
    return files.filter(predicate).length;
  } catch {
    return 0;
  }
}

/**
 * Recursively copies a standards subtree from source to destination, copying
 * only text-shaped files (.md, .json, .gitkeep) and creating empty subdirs
 * to mirror the source structure. Calls onFile for telemetry.
 */
async function syncStandardsTree(
  src: string,
  dst: string,
  onFile: (kind: "text" | "binary") => void
): Promise<void> {
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      await fs.mkdir(d, { recursive: true });
      await syncStandardsTree(s, d, onFile);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    const isText =
      STANDARDS_TEXT_EXTENSIONS.has(ext) || entry.name === ".gitkeep";
    if (isText) {
      await fs.copyFile(s, d);
      onFile("text");
    } else {
      onFile("binary");
    }
  }
}

async function main() {
  const source = process.env.GSL_ONEDRIVE_PATH;
  if (!source) {
    console.error(
      "[sync] GSL_ONEDRIVE_PATH is not set. Set it in .env.local and re-run."
    );
    process.exit(1);
  }

  const target = path.join(process.cwd(), "content-synced");
  console.log(`[sync] source: ${source}`);
  console.log(`[sync] target: ${target}`);
  console.log();

  if (!(await readable(source))) {
    console.error(
      `[sync] source directory is not readable: ${source}\n` +
        "[sync]   check the path, check OneDrive sync, retry."
    );
    process.exit(1);
  }

  await fs.mkdir(target, { recursive: true });

  const counts: Record<string, number> = {};

  // 1. Copy markdown + meta subtrees.
  for (const sub of COPY_SUBDIRS) {
    const src = path.join(source, sub);
    const dst = path.join(target, sub);
    if (!(await readable(src))) {
      console.warn(`[sync] skipping ${sub}/: not present in source`);
      continue;
    }
    // Fresh copy so OneDrive deletions propagate. Don't delete .gitignore
    // inside content-synced because it lives at content-synced/.gitignore,
    // not inside the subdirectories we are replacing.
    await fs.rm(dst, { recursive: true, force: true });
    await fs.cp(src, dst, { recursive: true, force: true });

    if (sub === "playbooks" || sub === "skills") {
      counts[sub] = await countFiles(dst, (f) => f.endsWith(".md"));
    } else if (sub === "meta") {
      counts[sub] = await countFiles(dst, (f) => f.endsWith(".json"));
    }
    console.log(`[sync] copied ${sub}/ (${counts[sub] ?? 0} files)`);
  }

  // 1b. Standards: copy text-shaped files only. Reference files stay in
  //     OneDrive (decision 012 follows decision 010 risk 1).
  const standardsSrc = path.join(source, "standards");
  const standardsDst = path.join(target, "standards");
  let standardsBuckets = 0;
  let standardsTextFiles = 0;
  let standardsBinariesSkipped = 0;
  if (await readable(standardsSrc)) {
    await fs.rm(standardsDst, { recursive: true, force: true });
    await fs.mkdir(standardsDst, { recursive: true });
    const playbookDirs = await fs.readdir(standardsSrc, {
      withFileTypes: true
    });
    for (const playbookEntry of playbookDirs) {
      if (!playbookEntry.isDirectory()) continue;
      standardsBuckets += 1;
      const playbookSrc = path.join(standardsSrc, playbookEntry.name);
      const playbookDst = path.join(standardsDst, playbookEntry.name);
      await fs.mkdir(playbookDst, { recursive: true });
      // Walk current/, proposals/, archive/ and any nested subfolders.
      await syncStandardsTree(playbookSrc, playbookDst, (kind) => {
        if (kind === "text") standardsTextFiles += 1;
        else standardsBinariesSkipped += 1;
      });
    }
    console.log(
      `[sync] standards/ copied (${standardsBuckets} playbook bucket(s), ${standardsTextFiles} text file(s), ${standardsBinariesSkipped} binary file(s) intentionally skipped)`
    );
  } else {
    console.warn(
      "[sync] no standards/ directory in source (ok for an empty studio)"
    );
  }

  // 2. Scan outputs/ without copying files. Build manifest, warn on unparseable
  //    filenames. Decision 011 B: unparseable filenames still render in the UI
  //    with a "naming convention not followed" note, so we only warn.
  const outputsSrc = path.join(source, "outputs");
  const manifest: Record<string, string[]> = {};
  const warnings: string[] = [];
  let outputTotal = 0;

  if (await readable(outputsSrc)) {
    const playbookDirs = await fs.readdir(outputsSrc, { withFileTypes: true });
    for (const entry of playbookDirs) {
      if (!entry.isDirectory()) continue;
      const slug = entry.name;
      const dir = path.join(outputsSrc, slug);
      const files = await fs.readdir(dir);
      const names = files.filter(
        (f) => !f.startsWith(".") && f !== ".gitkeep"
      );
      manifest[slug] = names;
      outputTotal += names.length;
      for (const filename of names) {
        if (!parseOutputFilename(filename)) {
          warnings.push(
            `outputs/${slug}/${filename}: filename convention not followed`
          );
        }
      }
    }
  } else {
    console.warn(
      "[sync] no outputs/ directory in source (ok for an empty studio)"
    );
  }

  const manifestPath = path.join(target, "meta", "outputs-manifest.json");
  await fs.mkdir(path.dirname(manifestPath), { recursive: true });
  const manifestBody = {
    generated_at: new Date().toISOString(),
    playbooks: manifest
  };
  await fs.writeFile(
    manifestPath,
    JSON.stringify(manifestBody, null, 2) + "\n",
    "utf8"
  );
  console.log(
    `[sync] wrote outputs-manifest.json with ${
      Object.keys(manifest).length
    } playbook bucket(s)`
  );

  // 3. Summary.
  console.log();
  console.log("[sync] summary:");
  console.log(`  playbooks:   ${counts.playbooks ?? 0}`);
  console.log(`  skills:      ${counts.skills ?? 0}`);
  console.log(`  meta files:  ${counts.meta ?? 0}`);
  if (Object.keys(manifest).length > 0) {
    console.log("  outputs per playbook:");
    for (const [slug, names] of Object.entries(manifest)) {
      console.log(`    ${slug}: ${names.length}`);
    }
  }
  console.log(`  outputs total: ${outputTotal}`);
  console.log(`  warnings:    ${warnings.length}`);
  if (warnings.length > 0) {
    console.log();
    console.log(
      "[sync] filename-convention warnings (outputs will still render, just without filter chips):"
    );
    for (const w of warnings) console.log(`  ${w}`);
  }

  console.log();
  console.log(
    "[sync] done. Review with `git status`, then commit if you want the changes deployed."
  );
}

main().catch((e) => {
  console.error("[sync] fatal:", e);
  process.exit(1);
});
