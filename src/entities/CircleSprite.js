import { Bouncer } from "../game/Bouncer.js";

const TEXTURE_KEY = "circle-sprite-texture";

export class CircleSprite extends Phaser.GameObjects.Sprite {
  constructor(scene, config) {
    ensureTexture(scene, config.radius);
    super(scene, config.x, config.y, TEXTURE_KEY);

    this.motion = new Bouncer(config);
    this.id = config.id;
    this.radius = config.radius;

    this.setDisplaySize(config.radius * 2, config.radius * 2);
    this.setTint(config.color);
    this.setAlpha(0.94);
    scene.add.existing(this);
  }

  updateMotion(deltaSeconds, width, height) {
    this.motion.step(deltaSeconds, width, height);
    this.setPosition(this.motion.x, this.motion.y);
  }

  clampToBounds(width, height) {
    this.motion.clampToBounds(width, height);
    this.setPosition(this.motion.x, this.motion.y);
  }
}

function ensureTexture(scene, radius) {
  if (scene.textures.exists(TEXTURE_KEY)) {
    return;
  }

  const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
  graphics.fillStyle(0xffffff, 1);
  graphics.fillCircle(radius, radius, radius);
  graphics.lineStyle(6, 0xffffff, 0.24);
  graphics.strokeCircle(radius, radius, radius - 3);
  graphics.generateTexture(TEXTURE_KEY, radius * 2, radius * 2);
  graphics.destroy();
}
