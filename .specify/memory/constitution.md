<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Modified principles:
  - Template Principle 1 -> I. Repo-Local Source of Truth
  - Template Principle 2 -> II. Traceable Feature Identity
  - Template Principle 3 -> III. Constitution-Gated Planning
  - Template Principle 4 -> IV. Template-Driven Automation
  - Template Principle 5 -> V. Independent, Testable Delivery Slices
- Added sections:
  - Operational Constraints
  - Workflow Enforcement
- Removed sections:
  - None
- Templates requiring updates:
  - ✅ updated /.specify/templates/plan-template.md
  - ✅ updated /.specify/templates/spec-template.md
  - ✅ updated /.specify/templates/tasks-template.md
  - ✅ reviewed /.specify/extensions/git/commands/speckit.git.commit.md
  - ✅ reviewed /.specify/extensions/git/commands/speckit.git.feature.md
  - ✅ reviewed /.specify/extensions/git/commands/speckit.git.initialize.md
  - ✅ reviewed /.specify/extensions/git/commands/speckit.git.remote.md
  - ✅ reviewed /.specify/extensions/git/commands/speckit.git.validate.md
- Follow-up TODOs:
  - None
-->
# sdd_speckit_bouncer Constitution

## Core Principles

### I. Repo-Local Source of Truth
All Spec Kit automation MUST resolve project context from the repository that
contains `.specify`. Scripts, templates, and generated artifacts MUST prefer
repo-local configuration over parent Git state, and filesystem operations MUST
use absolute paths during execution. This keeps nested repositories, worktrees,
and editor integrations deterministic.

Rationale: this repository already includes shell logic that prioritizes
`.specify` over parent Git metadata, so the constitution must preserve that
behavior as a non-negotiable invariant.

### II. Traceable Feature Identity
Every feature workflow MUST maintain a traceable link between user intent,
feature directory, and branch context. Spec directories MAY differ from branch
names, but the resolved feature directory MUST be persisted in
`.specify/feature.json`, and branch naming MUST either follow the supported
sequential or timestamp formats or use an explicit user override. Downstream
commands MUST consume the recorded feature directory instead of guessing.

Rationale: this project supports both branch-driven and directory-driven
workflows, and traceability prevents plan/task generation from targeting the
wrong feature.

### III. Constitution-Gated Planning
Every implementation plan MUST document technical context, surface unknowns,
and pass a constitution check before research begins and again after design is
produced. Unresolved high-impact clarifications, unjustified governance
violations, or missing core artifacts MUST stop the workflow with an explicit
error instead of allowing partial planning output.

Rationale: the plan phase is where drift becomes expensive. Mandatory gates keep
the repository's automation honest and make governance operational.

### IV. Template-Driven Automation
Commands and hooks MUST reuse the checked-in templates, scripts, and extension
files before inventing ad hoc replacements. Automation MUST degrade gracefully
when Git, configuration, or optional integrations are unavailable, and it MUST
not require network access to complete core repository workflows.

Rationale: this repository exists to make Spec Kit behavior predictable inside a
local coding agent environment, so local assets and graceful fallback are part
of the contract.

### V. Independent, Testable Delivery Slices
Specifications MUST describe independently testable user stories ordered by
priority. Task generation MUST organize work by story, include exact file
paths, and preserve a path to validating each story on its own. When a spec or
user request requires tests, the workflow MUST express them before
implementation for the affected slice.

Rationale: independent slices keep implementation incremental and make the
generated work usable by humans and coding agents without hidden coupling.

## Operational Constraints

- Core workflow assets MUST live under `.specify/` or repo-local companion
  directories such as `.agents/skills/`.
- Bash-first automation MUST remain compatible with the bundled PowerShell
  counterparts where both are supplied.
- Templates and scripts MUST avoid hard-coding assumptions about remote
  services, default branches, or parent repositories unless an extension
  explicitly owns that behavior.
- Generated documentation MUST use repository-relative references for human
  readability and absolute paths only where execution requires them.

## Workflow Enforcement

- Constitution amendments MUST include a sync review of
  `.specify/templates/plan-template.md`,
  `.specify/templates/spec-template.md`,
  `.specify/templates/tasks-template.md`, and any command guidance that
  operationalizes the changed rule.
- Planning workflows MUST update `AGENTS.md` between the `SPECKIT` markers so
  the active plan remains discoverable from repository guidance.
- Before and after hooks defined in `.specify/extensions.yml` MUST be surfaced
  exactly as configured; commands with non-empty hook conditions MAY defer
  execution to the hook runner but MUST NOT silently reinterpret the condition.
- When Git is present, workflow helpers MUST preserve branch validation and
  commit behavior without overriding unrelated user changes.

## Governance

This constitution supersedes conflicting local workflow habits for Spec Kit
artifacts in this repository. Amendments MUST document the affected principles,
update dependent templates in the same change when required, and include a sync
impact report at the top of this file. Compliance review is required during
constitution updates, plan generation, and task generation by checking that repo
root resolution, feature traceability, gating, template reuse, and independent
story delivery are all preserved.

Versioning policy follows semantic versioning for governance:
- MAJOR for backward-incompatible principle removals or redefinitions.
- MINOR for new principles, mandatory sections, or materially expanded rules.
- PATCH for clarifications and editorial refinements.

**Version**: 1.0.0 | **Ratified**: 2026-05-18 | **Last Amended**: 2026-05-18
