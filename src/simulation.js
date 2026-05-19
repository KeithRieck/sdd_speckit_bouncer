const CIRCLE_COUNT = 64;
const CIRCLE_RADIUS = 50;
const PALETTE = [
  0xffb703,
  0xfb8500,
  0x8ecae6,
  0x219ebc,
  0xffafcc,
  0xbde0fe,
  0xcaffbf,
  0xffcad4
];

export function createCircleConfigs(width, height) {
  const safeWidth = Math.max(width, CIRCLE_RADIUS * 2 + 1);
  const safeHeight = Math.max(height, CIRCLE_RADIUS * 2 + 1);
  const columns = Math.ceil(Math.sqrt(CIRCLE_COUNT));
  const rows = Math.ceil(CIRCLE_COUNT / columns);
  const horizontalGap = safeWidth / (columns + 1);
  const verticalGap = safeHeight / (rows + 1);

  return Array.from({ length: CIRCLE_COUNT }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const jitter = (index % 4) * 6;
    const directionX = index % 2 === 0 ? 1 : -1;
    const directionY = index % 3 === 0 ? -1 : 1;

    return {
      id: index + 1,
      radius: CIRCLE_RADIUS,
      x: clamp(horizontalGap * (column + 1) + jitter, CIRCLE_RADIUS, safeWidth - CIRCLE_RADIUS),
      y: clamp(verticalGap * (row + 1) - jitter, CIRCLE_RADIUS, safeHeight - CIRCLE_RADIUS),
      vx: directionX * (110 + (index % 5) * 12),
      vy: directionY * (95 + (index % 7) * 10),
      color: PALETTE[index % PALETTE.length]
    };
  });
}

export function resizeCircleSet(circles, width, height) {
  circles.forEach((circle) => circle.clampToBounds(width, height));
}

export function getCircleCount() {
  return CIRCLE_COUNT;
}

export function getCircleRadius() {
  return CIRCLE_RADIUS;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
