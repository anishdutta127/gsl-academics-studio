import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

/**
 * POST /api/skills/upload
 *
 * Skill contribution upload. Writes a file + a small metadata.md describing
 * the proposer's purpose into Vercel Blob at:
 *
 *   skills-staging/<skillSlug>/<YYYY-MM-DD>_<proposer>/
 *     <originalFilename>
 *     metadata.md
 *
 * Anish merges contributions into the canonical skill markdown in OneDrive
 * weekly. Same promote-to-OneDrive pattern the standards upload uses.
 *
 * Skill slug is validated loosely (kebab-case only) because skills can be
 * added over time; the 7-slug allow-list used for playbooks does not apply.
 */

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB is generous for a markdown or PDF contribution
const ALLOWED_EXT = new Set(["md", "txt", "pdf", "docx"]);
const SKILL_SLUG_RE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;

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

function buildMetadataMd(params: {
  skillSlug: string;
  proposerName: string;
  purpose: string;
  filename: string;
}): string {
  const today = new Date().toISOString().slice(0, 10);
  return `---
skill_slug: ${params.skillSlug}
proposer: ${params.proposerName}
submitted_on: ${today}
source_filename: ${params.filename}
---

## What this adds

${params.purpose.trim()}
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
  const skillSlug = (form.get("skillSlug") as string | null)?.trim() ?? "";
  const proposerName = (form.get("proposerName") as string | null)?.trim() ?? "";
  const purpose = (form.get("purpose") as string | null)?.trim() ?? "";

  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "No file attached." },
      { status: 400 }
    );
  }
  if (!SKILL_SLUG_RE.test(skillSlug)) {
    return NextResponse.json(
      { ok: false, error: "Invalid skill slug." },
      { status: 400 }
    );
  }
  if (!proposerName) {
    return NextResponse.json(
      { ok: false, error: "Your name is required." },
      { status: 400 }
    );
  }
  if (!purpose) {
    return NextResponse.json(
      { ok: false, error: "Tell us what this adds in 1 to 2 sentences." },
      { status: 400 }
    );
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json(
      {
        ok: false,
        error: "File is over the 10 MB limit. Email Anish the file instead."
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
  const folder = `skills-staging/${skillSlug}/${today}_${proposerSlug}`;
  const safeName = slugify(file.name.replace(/\.[^.]+$/, "")) + "." + ext;

  try {
    const fileBlob = await put(`${folder}/${safeName}`, file, {
      access: "public",
      contentType: file.type || undefined,
      token,
      addRandomSuffix: false
    });

    const metadataMd = buildMetadataMd({
      skillSlug,
      proposerName,
      purpose,
      filename: safeName
    });
    const metaBlob = await put(`${folder}/metadata.md`, metadataMd, {
      access: "public",
      contentType: "text/markdown; charset=utf-8",
      token,
      addRandomSuffix: false
    });

    return NextResponse.json({
      ok: true,
      folder,
      fileUrl: fileBlob.url,
      metadataUrl: metaBlob.url
    });
  } catch (e) {
    const message = (e as Error).message || "Upload failed";
    return NextResponse.json(
      { ok: false, error: `Upload failed: ${message}.` },
      { status: 500 }
    );
  }
}
