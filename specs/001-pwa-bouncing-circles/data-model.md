# Data Model: PWA Bouncing Circles Demo

## Circle

**Purpose**: Represents one visible moving object in the animation.

**Fields**:

- `id`: Stable identifier from 1 to 64
- `x`: Current horizontal position within the demo surface
- `y`: Current vertical position within the demo surface
- `vx`: Horizontal velocity component
- `vy`: Vertical velocity component
- `radius`: Render radius used for collision against viewport edges
- `color`: Visual style token for rendering

**Validation Rules**:

- Exactly 64 circle records MUST exist while the simulation is active.
- `radius` MUST be 50 pixels.
- Initial and corrected positions MUST keep the entire circle inside the demo
  surface bounds.
- Velocity MUST be non-zero on at least one axis so circles visibly move.
- Circle objects must extend the Phaser Sprite class, either directly or transitively.

**Relationships**:

- Each `Circle` belongs to one `SimulationState`.

## Demo Surface

**Purpose**: Represents the active visible area in which circles are rendered
and bounded.

**Fields**:

- `width`: Current renderable width
- `height`: Current renderable height
- `pixelRatio`: Display density factor used for crisp drawing
- `backgroundStyle`: Visual treatment applied behind the animation

**Validation Rules**:

- `width` and `height` MUST reflect the current visible viewport available to
  the demo.
- Bound recalculations MUST happen whenever the viewport meaningfully changes.

**Relationships**:

- One `Demo Surface` contains one `SimulationState`.

## SimulationState

**Purpose**: Coordinates the animation lifecycle for the current app session.

**Fields**:

- `circles`: Collection of 64 `Circle` entities
- `isRunning`: Whether the animation loop is active
- `lastFrameTime`: Timestamp from the prior animation frame
- `launchMode`: Browser or installed-app entry context

**Validation Rules**:

- `circles.length` MUST always equal 64 during normal operation.
- `isRunning` MUST become true once the demo is ready to animate.
- A refresh, relaunch, or resize MUST result in a valid running state rather
  than a blank or broken screen.

**Relationships**:

- `SimulationState` owns all `Circle` records and runs within one `Demo Surface`.

## PWA Shell

**Purpose**: Captures the installable app metadata and offline shell behavior.

**Fields**:

- `name`: User-facing application name
- `startPath`: Entry path used on launch
- `displayMode`: Launch presentation mode
- `iconSet`: Required install icons
- `cachedAssets`: Static assets required to relaunch the app shell offline

**Validation Rules**:

- The shell MUST point launches back to the demo entry experience.
- Cached assets MUST include the minimum files required to render the first
  working screen.

**Relationships**:

- `PWA Shell` bootstraps one `SimulationState` on launch.
