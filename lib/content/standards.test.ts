import { describe, it, expect } from "vitest";
import { extractKeyQualities } from "./standards-helpers";
import { StandardRationaleSchema } from "./types";

describe("StandardRationaleSchema", () => {
  it("parses a valid rationale frontmatter", () => {
    const result = StandardRationaleSchema.parse({
      set_by: "Ritu Sharma",
      set_on: "2026-04-22",
      topic: "Building a simple chatbot",
      grade: "Class 6",
      programme: "STEM/IIT-G",
      reference_filename: "reference.pptx"
    });
    expect(result.set_by).toBe("Ritu Sharma");
    expect(result.programme).toBe("STEM/IIT-G");
  });

  it("treats programme as optional", () => {
    const result = StandardRationaleSchema.parse({
      set_by: "Ritu",
      set_on: "2026-04-22",
      topic: "Pitching your startup idea",
      grade: "Class 9",
      reference_filename: "reference.pdf"
    });
    expect(result.programme).toBeUndefined();
  });

  it("rejects a malformed set_on date", () => {
    expect(() =>
      StandardRationaleSchema.parse({
        set_by: "Ritu",
        set_on: "April 22 2026",
        topic: "X",
        grade: "Class 6",
        reference_filename: "reference.pptx"
      })
    ).toThrow();
  });

  it("rejects a missing reference_filename", () => {
    expect(() =>
      StandardRationaleSchema.parse({
        set_by: "Ritu",
        set_on: "2026-04-22",
        topic: "X",
        grade: "Class 6"
      })
    ).toThrow();
  });
});

describe("extractKeyQualities", () => {
  it("extracts bullets from the ## Key qualities section", () => {
    const body = `## Key qualities

- One idea per slide
- Bloom's chip on every slide
- At least three Indian-context examples

## Why this is the bar

A short paragraph here.`;
    expect(extractKeyQualities(body)).toEqual([
      "One idea per slide",
      "Bloom's chip on every slide",
      "At least three Indian-context examples"
    ]);
  });

  it("accepts asterisk bullets", () => {
    const body = `## Key qualities\n\n* First\n* Second\n`;
    expect(extractKeyQualities(body)).toEqual(["First", "Second"]);
  });

  it("returns empty when no Key qualities heading exists", () => {
    expect(extractKeyQualities("Just some prose with no headings.")).toEqual(
      []
    );
  });

  it("stops at the next h2 heading", () => {
    const body = `## Key qualities

- A
- B

## Why this is the bar

- Not a quality, just a bullet in a different section`;
    expect(extractKeyQualities(body)).toEqual(["A", "B"]);
  });

  it("is case insensitive on the heading", () => {
    const body = `## key Qualities\n\n- One`;
    expect(extractKeyQualities(body)).toEqual(["One"]);
  });
});
