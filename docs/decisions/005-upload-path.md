# Decision 005: Upload path (OBSOLETE)

**Status:** OBSOLETE, superseded by [010](./010-onedrive-content-source-pivot.md)
**Date original:** 2026-04-21
**Date superseded:** 2026-04-22

## What this originally recorded

Under the Supabase-backed plan, content library uploads (pptx, docx, pdf, up to 100MB) went directly from the browser to Supabase Storage via a signed upload URL. Two server actions: `createUploadSession` minted a signed URL after validating file size and type, then `finaliseUpload` inserted the `content_library_item` row after HEAD-verifying the file had landed. XHR progress bar in the UI (fetch does not expose upload progress). Phase 2 orphan reaper cleaned Storage blobs whose session never finalised.

Chosen over the simpler server-action proxy upload because Vercel's 10-second serverless timeout on the hobby tier reliably kills 40MB PPTX uploads over a mediocre connection.

## Why obsolete

The architecture pivot in 010 removes Studio-side uploads entirely. Writers drop their finished .pptx and .docx files into the relevant OneDrive folder (`Acads/outputs/<playbook>/`). OneDrive handles the upload, the versioning, the sharing. The Studio reads the folder and presents a list with links.

Because the files live in OneDrive, not Supabase Storage, and not in the Studio's own cloud storage, there is nothing for the Studio to orphan-reap, timeout on, or mint URLs for.

## Where to read now

See [010](./010-onedrive-content-source-pivot.md). Note the flagged risk about git repo bloat if the sync script tries to copy `outputs/*` into `./content-synced/`; the content library should show links to OneDrive web URLs, not host files in the repo.
