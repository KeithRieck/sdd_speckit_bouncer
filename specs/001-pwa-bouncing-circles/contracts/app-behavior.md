# App Behavior Contract: PWA Bouncing Circles Demo

## Purpose

Define the user-visible contract for the single-screen PWA experience, including
launch behavior, animation guarantees, and install/offline expectations.

## Entry Contract

- The root path `/` MUST launch directly into the bouncing circles demo.
- The first visible screen MUST devote the full page to the graphics
  demonstration rather than a menu or intermediary landing page.

## Animation Contract

- The running demo MUST contain exactly 64 circles.
- Circles MUST move automatically after launch without requiring input.
- Circles MUST remain within the visible demo bounds and reverse direction when
  reaching an edge.

## Resize and Relaunch Contract

- Viewport changes MUST keep the demo usable and retain 64 active circles.
- Refreshing or relaunching MUST restore a working animation state on the first
  screen.
- A fresh simulation state after relaunch is acceptable as long as the demo is
  immediately functional.

## Installability Contract

- Supported browsers MUST be able to recognize the experience as installable.
- Launching from an installed surface MUST return the user directly to the demo.
- Browsers without install support MUST still provide the same core animation
  experience through the normal page visit flow.

## Offline Shell Contract

- After the initial successful load, the app shell SHOULD reopen without network
  access when supported by the browser.
- If some installation capability is unavailable, the app MUST fail gracefully
  by preserving the browser-based demo rather than showing a broken screen.
