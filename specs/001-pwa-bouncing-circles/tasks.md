# Tasks: PWA Bouncing Circles Demo

**Input**: Design documents from `/specs/001-pwa-bouncing-circles/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL unless the
feature specification, constitution check, or user request requires them.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Constitution Alignment**: Generated tasks MUST preserve feature traceability,
use exact file paths, and keep each user story independently deliverable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths below use the static web app structure defined in `plan.md`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create the Phaser PWA project scaffold in package.json, index.html, styles.css, src/, public/icons/, and service-worker.js
- [X] T002 [P] Add npm scripts and Phaser dependency configuration in package.json
- [X] T003 [P] Create placeholder PWA metadata and icon assets in public/manifest.webmanifest, public/icons/icon-192.png, and public/icons/icon-512.png

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Create the application bootstrap and root DOM mount in index.html and src/main.js
- [X] T005 [P] Implement the Phaser game configuration and resize-aware scene bootstrapping in src/main.js
- [X] T006 [P] Implement shared simulation primitives for circle creation, velocity, bounds correction, and 64-entity state management in src/simulation.js
- [X] T007 [P] Implement PWA registration helpers and launch-context detection in src/pwa.js
- [X] T008 Create app-wide styling for a full-page single-screen presentation in styles.css
- [X] T009 Configure offline app-shell caching and root-route navigation handling in service-worker.js and public/manifest.webmanifest

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Watch the Bouncing Demo (Priority: P1) 🎯 MVP

**Goal**: Deliver the full-page Phaser demo that immediately shows 64 bouncing circles

**Independent Test**: Open the app in a browser and verify that 64 circles are visible, moving, and staying within the page bounds without user setup

### Implementation for User Story 1

- [X] T010 [P] [US1] Create the Phaser Circle sprite/entity implementation with 50px radius behavior in src/entities/CircleSprite.js
- [X] T011 [P] [US1] Create the main demo scene that instantiates exactly 64 circles in src/scenes/BouncingCirclesScene.js
- [X] T012 [US1] Wire the demo scene into the Phaser bootstrap in src/main.js
- [X] T013 [US1] Implement per-frame bouncing updates and edge reversal logic in src/simulation.js and src/scenes/BouncingCirclesScene.js
- [X] T014 [US1] Tune visuals for full-page presentation, circle visibility, and background contrast in styles.css and src/scenes/BouncingCirclesScene.js
- [X] T015 [US1] Validate the MVP flow against the User Story 1 steps and record any required quickstart adjustments in specs/001-pwa-bouncing-circles/quickstart.md

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Install the Demo as an App (Priority: P2)

**Goal**: Make the demo installable and relaunchable as a standalone app

**Independent Test**: Install the app in a supported browser and confirm it reopens directly into the demo experience

### Implementation for User Story 2

- [X] T016 [P] [US2] Finalize installable app metadata, launch mode, theme, and icon references in public/manifest.webmanifest
- [X] T017 [P] [US2] Implement service worker asset pre-caching and offline shell recovery for index.html, styles.css, src/main.js, src/pwa.js, and service-worker.js
- [X] T018 [US2] Connect installed-app launch handling and service worker registration in src/pwa.js and src/main.js
- [X] T019 [US2] Ensure the root launch path restores the demo immediately for both browser and installed contexts in index.html, src/main.js, and service-worker.js
- [X] T020 [US2] Validate install and offline launch behavior, then update the verification notes in specs/001-pwa-bouncing-circles/quickstart.md

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Keep the Demo Stable Across Screen Changes (Priority: P3)

**Goal**: Preserve a reliable 64-circle demo across resize, refresh, and relaunch scenarios

**Independent Test**: Resize, rotate, refresh, and relaunch the app and confirm the demo remains full-page with 64 active circles

### Implementation for User Story 3

- [X] T021 [P] [US3] Implement viewport resize handling and scene rescaling logic in src/main.js and src/scenes/BouncingCirclesScene.js
- [X] T022 [US3] Clamp and rebalance circle positions after viewport changes in src/simulation.js
- [X] T023 [US3] Ensure refresh and relaunch always recreate a valid 64-circle simulation state in src/main.js, src/scenes/BouncingCirclesScene.js, and src/pwa.js
- [X] T024 [US3] Handle unsupported installation contexts and background/foreground recovery gracefully in src/pwa.js and service-worker.js
- [X] T025 [US3] Re-run the resize and relaunch scenarios and update the operational guidance in specs/001-pwa-bouncing-circles/quickstart.md and specs/001-pwa-bouncing-circles/contracts/app-behavior.md

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T026 [P] Document the final local run workflow and project structure in README.md
- [X] T027 [P] Optimize asset references and cache versioning consistency across public/manifest.webmanifest, service-worker.js, and src/pwa.js
- [X] T028 Run the full quickstart validation flow and capture any final corrections in specs/001-pwa-bouncing-circles/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel if capacity allows
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends functionally on the demo bootstrap from US1 for end-to-end validation
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends functionally on the active demo loop from US1 and benefits from the PWA launch flow from US2

### Within Each User Story

- Exact file paths MUST be included in every task description
- Shared entities before scene integration
- Scene integration before behavior tuning
- PWA shell before install/relaunch validation
- Story complete before moving to the next priority when working sequentially

### Parallel Opportunities

- T002 and T003 can run in parallel after T001
- T005, T006, and T007 can run in parallel after T004
- T010 and T011 can run in parallel before T012
- T016 and T017 can run in parallel before T018
- T021 can run in parallel with early validation prep, but T022-T025 depend on active resize behavior
- T026 and T027 can run in parallel during polish

---

## Parallel Example: User Story 1

```bash
Task: "Create the Phaser Circle sprite/entity implementation in src/entities/CircleSprite.js"
Task: "Create the main demo scene that instantiates exactly 64 circles in src/scenes/BouncingCirclesScene.js"
```

## Parallel Example: User Story 2

```bash
Task: "Finalize installable app metadata in public/manifest.webmanifest"
Task: "Implement service worker asset pre-caching in service-worker.js"
```

## Parallel Example: User Story 3

```bash
Task: "Implement viewport resize handling in src/main.js and src/scenes/BouncingCirclesScene.js"
Task: "Prepare final quickstart and contract updates in specs/001-pwa-bouncing-circles/quickstart.md and specs/001-pwa-bouncing-circles/contracts/app-behavior.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Confirm the 64-circle full-page demo works independently
5. Demo the MVP if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Validate browser demo
3. Add User Story 2 → Validate install and offline launch
4. Add User Story 3 → Validate resize, refresh, and relaunch resilience
5. Finish polish and documentation

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Integrate story outcomes through the shared Phaser bootstrap and PWA shell

---

## Notes

- All tasks follow the required checkbox + task ID + optional markers + file path format
- User Story 1 is the suggested MVP scope
- The current plan and data model specify Phaser-based implementation details, so these tasks follow that latest design direction
