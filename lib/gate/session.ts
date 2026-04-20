/**
 * Session helpers for the shared-password gate.
 *
 * Uses Web Crypto only so the same code runs in both Edge (middleware) and
 * Node (route handlers). The signing secret is GSL_STUDIO_PASSWORD itself:
 * rotating the password rotates all existing sessions, which is the behaviour
 * we want for a shared-link door lock. No secondary secret to configure.
 *
 * Cookie payload format:
 *   "<issued-at-ms>.<hmac-sha256-hex>"
 *
 * A valid cookie:
 *   1. Splits on the last "." into payload + signature.
 *   2. HMAC-SHA256 of payload with GSL_STUDIO_PASSWORD as key equals signature.
 *   3. issued-at is within the last 30 days.
 *
 * Not authentication. A door lock. See docs/decisions/010.
 */

const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const encoder = new TextEncoder();

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  const bytes = new Uint8Array(sig);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}

/**
 * Constant-time string comparison. Use this for any user-supplied value
 * compared against a secret. Still short-circuits on length mismatch,
 * which only leaks that the lengths differ, not the content.
 */
export function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function issueSessionCookie(secret: string): Promise<string> {
  const payload = String(Date.now());
  const sig = await hmacHex(secret, payload);
  return `${payload}.${sig}`;
}

export async function isValidSessionCookie(
  cookie: string,
  secret: string
): Promise<boolean> {
  const idx = cookie.lastIndexOf(".");
  if (idx < 0) return false;
  const payload = cookie.slice(0, idx);
  const providedSig = cookie.slice(idx + 1);
  if (!/^\d+$/.test(payload)) return false;

  const expectedSig = await hmacHex(secret, payload);
  if (!constantTimeEqual(providedSig, expectedSig)) return false;

  const issuedAt = Number(payload);
  if (!Number.isFinite(issuedAt)) return false;
  const age = Date.now() - issuedAt;
  return age >= 0 && age <= SESSION_MAX_AGE_MS;
}

export const SESSION_COOKIE_NAME = "gsl-studio-session";
export const SESSION_MAX_AGE_SECONDS = Math.floor(SESSION_MAX_AGE_MS / 1000);
