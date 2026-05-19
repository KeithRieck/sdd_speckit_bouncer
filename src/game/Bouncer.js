export class Bouncer extends Phaser.GameObjects.Sprite {
  constructor(scene, config, textureKey) {
    super(scene, config.x, config.y, textureKey);
    this.id = config.id;
    this.radius = config.radius;
    this.vx = config.vx;
    this.vy = config.vy;
    scene.add.existing(this);
  }

  updateMotion(deltaSeconds, width, height) {
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

    this.setPosition(clampedX, clampedY);
  }

  clampToBounds(width, height) {
    const clampedX = clamp(this.x, this.radius, Math.max(this.radius, width - this.radius));
    const clampedY = clamp(this.y, this.radius, Math.max(this.radius, height - this.radius));
    this.setPosition(clampedX, clampedY);
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
