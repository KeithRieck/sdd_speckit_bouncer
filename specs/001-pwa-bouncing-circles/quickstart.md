# Quickstart: PWA Bouncing Circles Demo

## Prerequisites

- A modern browser with JavaScript enabled
- A local static file server started from the repository root

## Run Locally

1. Start a static server from `/Volumes/SSD/Documents/sdd_speckit_bouncer`.
   Example: `python3 -m http.server 8000`
2. Open `http://localhost:8000/` in a modern browser.
3. Confirm the first screen is the bouncing circles demo.

## Validate User Story 1

1. Load the page.
2. Verify a full-page animation appears within 2 seconds.
3. Verify exactly 64 circles are visible and moving.
4. Observe the demo for at least 60 seconds and confirm circles remain within
   the visible area.

## Validate User Story 2

1. Open the app in a browser that supports Progressive Web App installation.
2. Install the app using the browser’s install flow.
3. Launch the installed app from the home screen or app launcher.
4. Confirm the demo opens directly into the animated scene.
5. Disable network access after the initial install and confirm the app shell
   still opens into a usable first screen.

## Validate User Story 3

1. Resize the browser window or rotate a device-sized viewport.
2. Confirm the demo remains full-page and all 64 circles stay active.
3. Refresh the page and confirm the demo returns to a working 64-circle state.
4. Close and relaunch the installed app and confirm the first screen is still
   usable and animated.

## Notes

- Exact motion paths do not need to persist across refresh or relaunch.
- Installation behavior may vary by browser, but unsupported browsers must still
  show the browser-based demo successfully.
