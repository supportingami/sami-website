# Project Audit Request

## Context

This is a headless CMS website. The architectural goal is:

- A **production site** hosted as a pure static site (SSG, CDN-delivered, no runtime backend)
- A separate **staging/authoring environment** (Strapi CMS) where content authors work
- Content changes on staging trigger a rebuild + redeploy of the static production site

## Primary Question

Does the current implementation successfully achieve this goal? Identify
unnecessary complications, critical vulnerabilities, reliability risks, and
code quality / maintainability concerns.

## Scope

Audit all of the following. If you cannot inspect something, say so explicitly
rather than inferring:

- `backend/` — Strapi config, content types, permissions, middleware, plugins
- `frontend/` — pages, components, data fetching, build config, static export setup
- `scripts/` — CLI tooling, ETL / sync code
- `.github/workflows/` — CI/CD pipelines
- `docker/`, `config/` — container definitions, environment files
- Root-level config — package manifests, lockfiles, tsconfig, linting

## Required Coverage

Explicitly address each of these, even if the finding is "no issues found":

1. **Security**

   - XSS / injection surfaces (esp. `dangerouslySetInnerHTML`, unsanitized author HTML)
   - Secret management — hardcoded values, tracked env files, fallback defaults
   - Strapi Users & Permissions: which content types are publicly readable? Are
     API tokens scoped to read-only where appropriate?
   - File upload handling — storage location, type/size validation
   - Dependency vulnerabilities (`npm audit`, Strapi/Next.js patch level)

2. **Reliability & Data Integrity**

   - Database choice vs. hosting platform compatibility
   - **Is there a tested backup and restore path today?** (Treat this as separate
     from, and potentially more urgent than, any migration recommendation.)
   - Failure modes of the content → build → deploy pipeline

3. **Architecture**

   - Is the static-export + staging-CMS split cleanly implemented, or leaky?
   - Host lock-in: could this deploy to Cloudflare Pages / Netlify / S3 unchanged?
   - Build pipeline complexity — is any step unnecessary?

4. **Code Quality & Maintainability**
   - React / TypeScript anti-patterns
   - Custom code that duplicates first-party tooling
   - Dead, deprecated, or conflicting dependencies
   - **Testing posture** — what tests exist, what coverage, what gaps?

## Severity Rubric

Rate every finding using these definitions. State the assumption behind the rating.

- **Critical** — Exploitable by an unauthenticated party, OR causes unrecoverable
  data loss. Blocks release.
- **High** — Requires authenticated/privileged access to exploit, OR causes
  recoverable data loss / extended outage.
- **Medium** — Operational friction, degraded correctness, or a latent risk that
  needs a second condition to trigger.
- **Low** — Hygiene, polish, or best-practice deviation with no functional impact.

For security findings, reason as: _exploitability × blast radius_.
For reliability findings, reason as: _probability × recoverability_.

Use one severity label per finding. Do not hedge with ranges like "Medium-High" —
pick one and justify it.

## Evidence Requirements

For every finding:

- Cite the specific file path and line range you actually read
- Label the finding as either:
  - **[Confirmed]** — directly observed in the code/config
  - **[Inferred]** — deduced from surrounding context; state what would confirm
    or refute it
- Before flagging a platform-level risk, check whether existing configuration
  already mitigates it (e.g. instance/concurrency limits, feature flags,
  guard clauses). Note the mitigation if present.

## Intent vs. Defect

Distinguish deliberate tradeoffs from actual defects. If something looks wrong
but is plausibly intentional, flag it as **"intentional but undocumented"** and
recommend documentation rather than a code change.

## Remediation Requirements

For each recommended fix, include:

- The concrete change (code snippet or config diff where useful)
- **Any side effects or breakage the fix introduces.** For example, if a
  sanitization library is recommended, specify the allowlist configuration
  needed to preserve legitimate existing content, and note whether existing
  content must be audited for regressions.
- Whether a migration or data backfill is required

## Output Format

### 1. Executive Verdict

2–4 sentences: does the architecture achieve its stated goal? What is the single
biggest risk?

### 2. Findings Table

| ID | Finding | Severity | Effort | Change Risk | Blocked By / Blocks | Evidence |

- **Effort** — Low / Medium / High (implementation time)
- **Change Risk** — Low / Medium / High (risk that the fix itself breaks something,
  requires downtime, or needs data migration / credential rotation)
- **Blocked By / Blocks** — Dependencies between findings. Flag cases where fixing
  A first makes B trivial or obsolete, so work is sequenced correctly rather than
  wasted.

### 3. Detailed Findings

Grouped by severity, then by area. Each entry: files + line ranges,
[Confirmed]/[Inferred] label, description, why it matters, remediation with
side effects.

### 4. Recommended Sequencing

Ordered work plan that respects the dependency graph from the findings table.
Group into sprints. For each item state what unblocks it and what it unblocks.

### 5. Coverage Gaps

What you could not audit and why (no access, no runtime environment, requires
production data, etc.).
