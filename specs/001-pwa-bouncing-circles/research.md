# Research: PWA Bouncing Circles Demo

## Decision 1: Use a single full-page Canvas 2D surface for rendering

**Decision**: Render the animation on one full-page Canvas 2D surface that owns
all 64 circles and redraws the frame on each animation tick.

**Rationale**: A single canvas keeps per-frame work centralized, avoids DOM
layout churn from managing dozens of independently moving elements, and maps
cleanly to the requirement that circles stay inside a single visible demo
surface.

**Alternatives considered**:

- **Animated DOM elements**: Easier to inspect visually, but introduces more
  layout and style recalculation overhead for 64 continuously moving objects.
- **SVG scene graph**: Expressive for vector graphics, but less direct for a
  high-frequency bouncing simulation than a canvas redraw loop.

## Decision 2: Ship as a zero-backend static PWA

**Decision**: Implement the app as static assets only, with a web manifest and
service worker providing installability and offline shell availability.

**Rationale**: The feature requires a presentational demo, not server-driven
data. A static PWA is the simplest architecture that satisfies install, relaunch,
and static hosting needs.

**Alternatives considered**:

- **Backend-served application**: Adds operational complexity without creating
  user-facing value for this feature.
- **Bundler-based SPA framework**: Could work, but is unnecessary for a single
  screen demo and conflicts with the goal of minimal project complexity.

## Decision 3: Recompute bounds on resize while preserving circle count

**Decision**: Maintain simulation state for exactly 64 circles and recompute
their valid movement bounds whenever the viewport changes, clamping positions
back inside the visible surface as needed.

**Rationale**: This keeps the user-visible entity count stable while making
screen changes recoverable without restarting into a broken layout.

**Alternatives considered**:

- **Restart the entire simulation on resize**: Simpler to implement, but causes
  visible disruption and weakens the “stable across screen changes” user story.
- **Allow temporary off-screen positions**: Reduces correction logic, but
  violates the requirement that circles remain visible inside the demo area.

## Decision 4: Treat offline support as app-shell continuity, not state replay

**Decision**: Cache the app shell needed to launch the demo offline, but do not
persist or restore in-flight circle positions across refreshes or relaunches.

**Rationale**: The specification requires a working demo state after relaunch,
not exact motion continuity. Recreating a fresh 64-circle simulation is enough
to satisfy the user outcome while keeping state management simple.

**Alternatives considered**:

- **Persist full simulation snapshots**: Unnecessary complexity for a purely
  visual demonstration.
- **No offline caching**: Would weaken installability expectations and degrade
  the app-like launch experience.
