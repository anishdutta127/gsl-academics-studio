import { z } from "zod";

// Difficulty levels per DESIGN.md and the playbook domain model.
export const DifficultySchema = z.enum(["gentle", "standard", "advanced"]);
export type Difficulty = z.infer<typeof DifficultySchema>;

// A slug is lowercase kebab. Enforced so routing stays predictable.
const SlugSchema = z.string().regex(/^[a-z0-9-]+$/, {
  message: "slug must be lowercase letters, digits, and hyphens only"
});

// Publication status. Draft playbooks still render; we may hide them in lists later.
export const StatusSchema = z.enum(["draft", "published"]).default("draft");

// A step inside a playbook. Mid-flow checks are the per-step quality nudges the
// writer sees beneath the prompt block. Advisory, not gating (see design review Pass 2).
export const StepSchema = z.object({
  title: z.string().min(1),
  instruction: z.string().min(1),
  tool: z.string().optional(),
  prompt: z.string().optional(),
  mid_flow_checks: z.array(z.string()).default([]),
  expected_output: z.string().optional(),
  next_action: z.string().optional()
});
export type Step = z.infer<typeof StepSchema>;

// Playbook frontmatter. Metadata + steps + audit prompt all live here.
// Markdown body is reserved for the overview prose (use-when, before-you-start, common pitfalls).
export const PlaybookFrontmatterSchema = z.object({
  slug: SlugSchema,
  title: z.string().min(1),
  icon: z.string().optional(), // emoji or Lucide icon name
  category: z.string().min(1),
  what_youll_make: z.string().min(1),
  time_needed: z.string().min(1), // human-readable, e.g. "45 to 90 minutes"
  difficulty: DifficultySchema,
  programme: z.string().optional(),
  skills_referenced: z.array(SlugSchema).default([]),
  related_playbooks: z.array(SlugSchema).default([]),
  status: StatusSchema,
  /** Prose copy (markdown) rendered in the "Use this when" warm callout. */
  use_when: z.string().min(1),
  /** Array of short check-items rendered as a pre-flight list. No state. */
  before_you_start: z.array(z.string()).default([]),
  /** Prose copy (markdown) rendered after the Audit Stage. Optional. */
  common_pitfalls: z.string().optional(),
  steps: z.array(StepSchema).min(1),
  audit_prompt_template: z.string().optional()
});
export type PlaybookFrontmatter = z.infer<typeof PlaybookFrontmatterSchema>;

export const PlaybookSchema = z.object({
  frontmatter: PlaybookFrontmatterSchema,
  body: z.string()
});
export type Playbook = z.infer<typeof PlaybookSchema>;

// Skill: long-form markdown framework document. Full body lives in the markdown body.
export const SkillFrontmatterSchema = z.object({
  slug: SlugSchema,
  title: z.string().min(1),
  category: z.string().min(1),
  summary: z.string().min(1),
  status: StatusSchema,
  last_edited_by: z.string().optional(),
  last_edited_at: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "last_edited_at must be YYYY-MM-DD" })
    .optional()
});
export type SkillFrontmatter = z.infer<typeof SkillFrontmatterSchema>;

export const SkillSchema = z.object({
  frontmatter: SkillFrontmatterSchema,
  body: z.string()
});
export type Skill = z.infer<typeof SkillSchema>;

// Schools: simple directory, edited in meta/schools.json.
export const SchoolSchema = z.object({
  name: z.string().min(1),
  city: z.string().min(1),
  programmes: z.array(z.string()).default([]),
  status: z.string().optional(),
  last_touch_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
});
export type School = z.infer<typeof SchoolSchema>;
export const SchoolsSchema = z.array(SchoolSchema);

// Weekly assignments: one JSON object covers the current week.
export const AssignmentItemSchema = z.object({
  name: z.string().min(1),
  playbook: SlugSchema,
  topic: z.string().min(1)
});
export type AssignmentItem = z.infer<typeof AssignmentItemSchema>;

export const AssignmentsSchema = z.object({
  week_of: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  assignments: z.array(AssignmentItemSchema).default([])
});
export type Assignments = z.infer<typeof AssignmentsSchema>;

// Team: used for attribution on assignment cards and the team page.
export const TeamMemberSchema = z.object({
  name: z.string().min(1),
  email: z.string().optional(),
  avatar_url: z.string().optional()
});
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export const TeamSchema = z.array(TeamMemberSchema);

// Output links: map of "outputs/<playbook>/<filename>" to OneDrive share URL.
// Decision 011 A: if an output filename is not in the map, the Studio shows
// a disabled "Ask Anish for the share link" state on that card.
export const OutputLinksSchema = z.record(z.string(), z.string());
export type OutputLinks = z.infer<typeof OutputLinksSchema>;

// A discovered output file, surfaced to UI with optional parsed filename chips.
export interface DiscoveredOutput {
  filename: string;
  relativePath: string; // e.g. "outputs/lesson-plan/class-06_photosynthesis_lesson-plan_2026-04-15.pptx"
  parsed: import("./parse-filename").ParsedOutputFilename | null;
  shareUrl: string | null;
}
