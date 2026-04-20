import { describe, it, expect } from "vitest";
import { parseOutputFilename } from "./parse-filename";

describe("parseOutputFilename", () => {
  it("parses a canonical filename", () => {
    expect(
      parseOutputFilename(
        "class-06_photosynthesis_teaching-ppt_2026-04-15.pptx"
      )
    ).toEqual({
      grade: "class-06",
      topic: "photosynthesis",
      playbook: "teaching-ppt",
      date: "2026-04-15",
      ext: "pptx"
    });
  });

  it("accepts multi-hyphen topic slugs", () => {
    const result = parseOutputFilename(
      "class-11_the-industrial-revolution_lesson-plan_2026-03-20.docx"
    );
    expect(result?.topic).toBe("the-industrial-revolution");
    expect(result?.playbook).toBe("lesson-plan");
    expect(result?.ext).toBe("docx");
  });

  it("lowercases the extension", () => {
    const result = parseOutputFilename(
      "class-09_maths_assessment_2026-04-01.PDF"
    );
    expect(result?.ext).toBe("pdf");
  });

  it("returns null for a freeform filename", () => {
    expect(parseOutputFilename("Photosynthesis Deck Final.pptx")).toBeNull();
  });

  it("returns null for an impossible date", () => {
    expect(
      parseOutputFilename("class-06_topic_playbook_2026-13-45.pptx")
    ).toBeNull();
  });

  it("returns null when the extension is missing", () => {
    expect(
      parseOutputFilename("class-06_topic_playbook_2026-04-15")
    ).toBeNull();
  });

  it("returns null when segments are missing", () => {
    expect(
      parseOutputFilename("class-06_topic_2026-04-15.pptx")
    ).toBeNull();
  });

  it("rejects a year outside the sanity range", () => {
    expect(
      parseOutputFilename("class-06_topic_playbook_1899-04-15.pptx")
    ).toBeNull();
  });
});
