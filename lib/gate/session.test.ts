import { describe, it, expect } from "vitest";
import {
  constantTimeEqual,
  isValidSessionCookie,
  issueSessionCookie
} from "./session";

describe("constantTimeEqual", () => {
  it("returns true for identical strings", () => {
    expect(constantTimeEqual("abc", "abc")).toBe(true);
  });
  it("returns false for differing strings of equal length", () => {
    expect(constantTimeEqual("abc", "abd")).toBe(false);
  });
  it("returns false for differing lengths", () => {
    expect(constantTimeEqual("abc", "abcd")).toBe(false);
  });
});

describe("session cookies", () => {
  const secret = "team-password-2026";

  it("issues a cookie that verifies", async () => {
    const cookie = await issueSessionCookie(secret);
    expect(cookie).toMatch(/^\d+\.[0-9a-f]+$/);
    expect(await isValidSessionCookie(cookie, secret)).toBe(true);
  });

  it("rejects a tampered signature", async () => {
    const cookie = await issueSessionCookie(secret);
    const tampered = cookie.slice(0, -1) + (cookie.slice(-1) === "0" ? "1" : "0");
    expect(await isValidSessionCookie(tampered, secret)).toBe(false);
  });

  it("rejects a different secret", async () => {
    const cookie = await issueSessionCookie(secret);
    expect(await isValidSessionCookie(cookie, "other-password")).toBe(false);
  });

  it("rejects a malformed cookie", async () => {
    expect(await isValidSessionCookie("not-a-cookie", secret)).toBe(false);
    expect(await isValidSessionCookie("", secret)).toBe(false);
    expect(await isValidSessionCookie("only-one-part", secret)).toBe(false);
  });

  it("rejects an expired cookie (simulated)", async () => {
    const thirtyOneDaysAgo = Date.now() - 31 * 24 * 60 * 60 * 1000;
    // Build a cookie with a stale timestamp but a real signature.
    const payload = String(thirtyOneDaysAgo);
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    const hex = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    expect(await isValidSessionCookie(`${payload}.${hex}`, secret)).toBe(false);
  });
});
