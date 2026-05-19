export class Bouncer {
  constructor({ x, y, vx, vy, radius }) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
  }

  step(deltaSeconds, width, height) {
    const nextX = this.x + this.vx * deltaSeconds;
    const nextY = this.y + this.vy * deltaSeconds;

    const clampedX = clamp(nextX, this.radius, Math.max(this.radius, width - this.radius));
    const clampedY = clamp(nextY, this.radius, Math.max(this.radius, height - this.radius));

    if (clampedX !== nextX) {
      this.vx *= -1;
    }

    if (clampedY !== nextY) {
      this.vy *= -1;
    }

    this.x = clampedX;
    this.y = clampedY;
  }

  clampToBounds(width, height) {
    this.x = clamp(this.x, this.radius, Math.max(this.radius, width - this.radius));
    this.y = clamp(this.y, this.radius, Math.max(this.radius, height - this.radius));
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
