import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { PLAYBOOK_SLUGS, type PlaybookSlug } from "@/lib/content/types";

/**
 * POST /api/standards/upload
 *
 * Standards proposal upload, Phase 1 staging pattern (decision 012 Phase 2
 * placeholder). Writes the candidate reference file + a generated
 * rationale.md into Vercel Blob under:
 *
 *   standards-staging/<playbookSlug>/<YYYY-MM-DD>_<proposerSlug>_<topicSlug>/
 *     reference.<ext>
 *     rationale.md
 *
 * Anish reviews the staging folder weekly and, for anything that raises
 * the bar, moves the files into OneDrive at
 *   Acads/studio/standards/<playbookSlug>/current/
 * archives the old current, runs pnpm sync-content, and redeploys. The
 * Studio then renders the new bar automatically.
 *
 * Graceful degradation: when BLOB_READ_WRITE_TOKEN is missing (local dev
 * without Blob enabled, or a prod environment where the token has not been
 * provisioned yet), returns a warm 503 so the UI can show a helpful note
 * rather than a mystery error.
 */

const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25 MB, covers a teaching deck with images
const ALLOWED_EXT = new Set([
  "pptx",
  "docx",
  "pdf",
  "md",
  "txt",
  "png",
  "jpg",
  "jpeg"
]);

function slugify(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "unnamed";
}

function getExt(filename: string): string | null {
  const match = /\.([a-z0-9]+)$/i.exec(filename);
  return match ? match[1].toLowerCase() : null;
}

function isValidPlaybookSlug(slug: unknown): slug is PlaybookSlug {
  return (
    typeof slug === "string" &&
    (PLAYBOOK_SLUGS as readonly string[]).includes(slug)
  );
}

function buildRationaleMd(params: {
  proposerName: string;
  topic: string;
  grade: string;
  programme: string;
  referenceFilename: string;
  keyQualities: string[];
  whyThisIsTheBar: string;
}): string {
  const today = new Date().toISOString().slice(0, 10);
  const qualities = params.keyQualities
    .map((q) => q.trim())
    .filter(Boolean)
    .map((q) => `- ${q}`)
    .join("\n");
  return `---
set_by: ${params.proposerName}
set_on: ${today}
topic: ${params.topic}
grade: ${params.grade}
programme: ${params.programme || "general"}
reference_filename: ${params.referenceFilename}
---

## Key qualities

${qualities || "- (to be filled in by reviewer)"}

## Why this is the bar

${params.whyThisIsTheBar.trim() || "(to be filled in by reviewer)"}
`;
}

export async function POST(req: NextRequest) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Uploads are not configured yet on this environment. Ask Anish to enable Vercel Blob and set BLOB_READ_WRITE_TOKEN."
      },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not read the form. Try again." },
      { status: 400 }
    );
  }

  const file = form.get("file");
  const playbookSlug = form.get("playbookSlug");
  const proposerName = (form.get("proposerName") as string | null)?.trim() ?? "";
  const topic = (form.get("topic") as string | null)?.trim() ?? "";
  const grade = (form.get("grade") as string | null)?.trim() ?? "";
  const programme = (form.get("programme") as string | null)?.trim() ?? "";
  const whyThisIsTheBar =
    (form.get("whyThisIsTheBar") as string | null)?.trim() ?? "";
  const keyQualitiesRaw =
    (form.get("keyQualities") as string | null) ?? "";
  const keyQualities = keyQualitiesRaw
    .split(/\r?\n/)
    .map((s) => s.replace(/^[-*\s]+/, "").trim())
    .filter(Boolean);

  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "No file attached." },
      { status: 400 }
    );
  }
  if (!isValidPlaybookSlug(playbookSlug)) {
    return NextResponse.json(
      { ok: false, error: "Unknown playbook slug." },
      { status: 400 }
    );
  }
  if (!proposerName) {
    return NextResponse.json(
      { ok: false, error: "Your name is required." },
      { status: 400 }
    );
  }
  if (!topic) {
    return NextResponse.json(
      { ok: false, error: "A one-line topic is required." },
      { status: 400 }
    );
  }
  if (!grade) {
    return NextResponse.json(
      { ok: false, error: "Grade is required (e.g. Class 6)." },
      { status: 400 }
    );
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json(
      {
        ok: false,
        error: `File is over the 25 MB staging limit. Email Anish the file directly instead.`
      },
      { status: 413 }
    );
  }
  const ext = getExt(file.name) ?? "bin";
  if (!ALLOWED_EXT.has(ext)) {
    return NextResponse.json(
      {
        ok: false,
        error: `File type .${ext} is not accepted. Allowed: ${[...ALLOWED_EXT].join(", ")}.`
      },
      { status: 415 }
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const proposerSlug = slugify(proposerName);
  const topicSlug = slugify(topic);
  const folder = `standards-staging/${playbookSlug}/${today}_${proposerSlug}_${topicSlug}`;
  const referenceFilename = `reference.${ext}`;

  try {
    const fileBlob = await put(`${folder}/${referenceFilename}`, file, {
      access: "public",
      contentType: file.type || undefined,
      token,
      addRandomSuffix: false
    });

    const rationaleMd = buildRationaleMd({
      proposerName,
      topic,
      grade,
      programme,
      referenceFilename,
      keyQualities,
      whyThisIsTheBar
    });
    const rationaleBlob = await put(
      `${folder}/rationale.md`,
      rationaleMd,
      {
        access: "public",
        contentType: "text/markdown; charset=utf-8",
        token,
        addRandomSuffix: false
      }
    );

    return NextResponse.json({
      ok: true,
      folder,
      referenceUrl: fileBlob.url,
      rationaleUrl: rationaleBlob.url
    });
  } catch (e) {
    const message = (e as Error).message || "Upload failed";
    return NextResponse.json(
      {
        ok: false,
        error: `Upload failed: ${message}. Try again, or email Anish the file.`
      },
      { status: 500 }
    );
  }
}
