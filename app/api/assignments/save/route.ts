import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { AssignmentsSchema } from "@/lib/content/types";

/**
 * POST /api/assignments/save
 *
 * Writes the full assignments state (an array of week objects) to Vercel
 * Blob under assignments-staging/<YYYY-MM-DD>.json so Anish can promote it
 * into OneDrive at meta/assignments.json during the weekly sync. The same
 * promote-to-OneDrive pattern the standards and skills uploads use.
 *
 * Body: JSON matching AssignmentsSchema (array of week objects, or a single
 * week object for legacy compat).
 *
 * Also writes the same state to the "latest" key so the server can pick up
 * the most recent draft for UI mirroring if desired. Per Phase 1 decision,
 * the canonical read path still hits meta/assignments.json in OneDrive;
 * this endpoint is write-only staging.
 *
 * Graceful degradation: returns 503 when BLOB_READ_WRITE_TOKEN is missing,
 * so the client UI can still mutate local state while telling the user
 * "changes will not survive reload until uploads are configured".
 */
export async function POST(req: NextRequest) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Uploads not configured yet on this environment. Changes will not persist beyond your browser. Ask Anish to enable Vercel Blob."
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Body was not valid JSON." },
      { status: 400 }
    );
  }

  const parsed = AssignmentsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Assignment payload failed validation.",
        issues: parsed.error.issues
      },
      { status: 422 }
    );
  }

  const now = new Date().toISOString().replace(/[:.]/g, "-");
  const folder = "assignments-staging";
  const file = `${folder}/${now}.json`;

  try {
    const content = JSON.stringify(parsed.data, null, 2) + "\n";
    const blob = await put(file, content, {
      access: "public",
      contentType: "application/json; charset=utf-8",
      token,
      addRandomSuffix: false
    });
    const latest = await put(`${folder}/latest.json`, content, {
      access: "public",
      contentType: "application/json; charset=utf-8",
      token,
      addRandomSuffix: false,
      allowOverwrite: true
    });
    return NextResponse.json({
      ok: true,
      url: blob.url,
      latestUrl: latest.url
    });
  } catch (e) {
    const message = (e as Error).message || "Upload failed";
    return NextResponse.json(
      { ok: false, error: `Could not save: ${message}.` },
      { status: 500 }
    );
  }
}
