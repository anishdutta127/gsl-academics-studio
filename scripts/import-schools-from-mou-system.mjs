#!/usr/bin/env node
/**
 * One-shot import script: merges gsl-mou-system src/data/{schools,mous}.json
 * into a Studio-shaped schools.json that goes into OneDrive at
 *   Acads/studio/meta/schools.json
 *
 * Money, billing, and PII fields are intentionally DROPPED:
 *   totalLifetimeValue, contractValue, received, tds, balance, spWithoutTax,
 *   spWithTax, billingName, pan, gstNumber, contactPerson, email, phone,
 *   pinCode, legalEntity, paymentSchedule, salesRep.
 *
 * Kept fields, per school, aggregated from mous.json:
 *   slug         kebab-case derived from name
 *   name         from schools.json
 *   city         from schools.json
 *   state        from schools.json
 *   programmes   unique list across this school's MOUs
 *   students     sum of studentsActual across Active MOUs (student impact framing)
 *   active_mous_count   count of MOUs with status Active
 *   earliest_start_date earliest startDate across all MOUs for this school
 *   status       "Active" if any MOU is Active, else "Pending"
 *
 * Usage:
 *   node scripts/import-schools-from-mou-system.mjs <path-to-mou-repo>
 *     <optional-output-path>
 *
 * Defaults to /tmp/gsl-mou-system and writing into the OneDrive Acads path
 * if one exists at the default GSL_ONEDRIVE_PATH, else stdout.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const MOU_REPO = process.argv[2] || "/tmp/gsl-mou-system";
const OUT_PATH =
  process.argv[3] ||
  "C:/Users/anish/OneDrive - MAF TECHNOLOGIES PRIVATE LIMITED/Acads/studio/meta/schools.json";

function slugify(raw) {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "unnamed";
}

const schools = JSON.parse(
  readFileSync(path.join(MOU_REPO, "src/data/schools.json"), "utf8")
);
const mous = JSON.parse(
  readFileSync(path.join(MOU_REPO, "src/data/mous.json"), "utf8")
);

const mousBySchool = new Map();
for (const m of mous) {
  const list = mousBySchool.get(m.schoolId) ?? [];
  list.push(m);
  mousBySchool.set(m.schoolId, list);
}

const out = [];
for (const s of schools) {
  const schoolMous = mousBySchool.get(s.id) ?? [];
  const activeMous = schoolMous.filter((m) => m.status === "Active");
  const programmes = [...new Set(schoolMous.map((m) => m.programme))].sort();
  const students = activeMous.reduce(
    (sum, m) => sum + (Number.isFinite(m.studentsActual) ? m.studentsActual : 0),
    0
  );
  const startDates = schoolMous
    .map((m) => m.startDate)
    .filter(Boolean)
    .sort();
  const earliestStartDate = startDates[0] ?? null;
  const status = activeMous.length > 0 ? "Active" : "Pending";

  // Clean the name: strip leading asterisks used as flags upstream.
  const cleanName = s.name.replace(/^\*+/, "").trim();

  out.push({
    slug: slugify(cleanName),
    name: cleanName,
    city: s.city ?? null,
    state: s.state ?? null,
    programmes,
    students,
    active_mous_count: activeMous.length,
    earliest_start_date: earliestStartDate,
    status
  });
}

out.sort((a, b) => a.name.localeCompare(b.name));

const outStr = JSON.stringify(out, null, 2) + "\n";

const outDir = path.dirname(OUT_PATH);
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}
writeFileSync(OUT_PATH, outStr, "utf8");

const withProgrammes = out.filter((x) => x.programmes.length > 0).length;
const totalStudents = out.reduce((sum, x) => sum + x.students, 0);
console.log(`[import] wrote ${out.length} schools to ${OUT_PATH}`);
console.log(`[import] ${withProgrammes} schools have at least one active MOU`);
console.log(`[import] total students across active MOUs: ${totalStudents}`);
