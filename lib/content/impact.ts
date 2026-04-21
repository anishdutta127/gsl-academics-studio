import type { DiscoveredOutput, School } from "./types";

/**
 * Pure helpers for computing impact figures across programmes, schools, and
 * outputs. Stateless; called by server components and safe to unit-test.
 */

/**
 * Resolves the schools an output reaches.
 *
 * Programme attribution is primary: an output tagged to a programme reaches
 * every school enrolled in that programme. Direct school tags are merged in
 * as optional overrides (for outputs targeted at specific schools outside
 * the programme default).
 */
export function schoolsReachedByOutput(
  output: DiscoveredOutput,
  schools: School[]
): School[] {
  if (output.programmes.length === 0 && output.schools.length === 0) {
    return [];
  }
  const programmeSet = new Set(output.programmes);
  const directSchoolSet = new Set(output.schools);
  const reached = new Map<string, School>();
  for (const s of schools) {
    if (directSchoolSet.has(s.slug)) {
      reached.set(s.slug, s);
      continue;
    }
    if (s.programmes.some((p) => programmeSet.has(p))) {
      reached.set(s.slug, s);
    }
  }
  return [...reached.values()];
}

export interface OutputReach {
  schools: School[];
  studentCount: number;
}

export function outputReach(
  output: DiscoveredOutput,
  schools: School[]
): OutputReach {
  const reached = schoolsReachedByOutput(output, schools);
  const studentCount = reached.reduce((sum, s) => sum + s.students, 0);
  return { schools: reached, studentCount };
}

export interface ProgrammeImpact {
  slug: string;
  schoolCount: number;
  studentCount: number;
  outputCount: number;
}

/**
 * Aggregates outputs + schools by programme slug. Every programme listed in
 * programmeSlugs gets a row, even when no outputs or schools are attached
 * yet, so the UI can render a full grid.
 */
export function programmeImpact(
  programmeSlugs: string[],
  outputs: DiscoveredOutput[],
  schools: School[]
): ProgrammeImpact[] {
  return programmeSlugs.map((slug) => {
    const programmeSchools = schools.filter((s) =>
      s.programmes.includes(slug)
    );
    const programmeOutputs = outputs.filter((o) => o.programmes.includes(slug));
    const studentCount = programmeSchools.reduce(
      (sum, s) => sum + s.students,
      0
    );
    return {
      slug,
      schoolCount: programmeSchools.length,
      studentCount,
      outputCount: programmeOutputs.length
    };
  });
}

/**
 * Outputs that reach a given school, via programme enrolment or direct tag.
 */
export function outputsReachingSchool(
  school: School,
  outputs: DiscoveredOutput[]
): DiscoveredOutput[] {
  const schoolProgrammes = new Set(school.programmes);
  return outputs.filter((o) => {
    if (o.schools.includes(school.slug)) return true;
    return o.programmes.some((p) => schoolProgrammes.has(p));
  });
}

/**
 * Team-wide reach rollup from a list of outputs.
 * Returns unique schools reached, unique programmes tagged, and total
 * students across those unique schools.
 */
export function teamReach(
  outputs: DiscoveredOutput[],
  schools: School[]
): {
  uniqueSchools: number;
  uniqueProgrammes: number;
  studentsImpacted: number;
} {
  const programmeSet = new Set<string>();
  const schoolSet = new Set<string>();
  const schoolsBySlug = new Map(schools.map((s) => [s.slug, s]));
  for (const o of outputs) {
    for (const p of o.programmes) programmeSet.add(p);
    const reached = schoolsReachedByOutput(o, schools);
    for (const s of reached) schoolSet.add(s.slug);
  }
  let studentsImpacted = 0;
  for (const slug of schoolSet) {
    const s = schoolsBySlug.get(slug);
    studentsImpacted += s?.students ?? 0;
  }
  return {
    uniqueSchools: schoolSet.size,
    uniqueProgrammes: programmeSet.size,
    studentsImpacted
  };
}
