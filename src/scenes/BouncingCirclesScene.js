import { CircleSprite } from "../entities/CircleSprite.js";
import { createCircleConfigs, getCircleCount, resizeCircleSet } from "../simulation.js";

export class BouncingCirclesScene extends Phaser.Scene {
  constructor() {
    super("BouncingCirclesScene");
    this.circles = [];
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor("#08111f");
    this.drawBackground(width, height);
    this.createCircles(width, height);
    document.body.dataset.circleCount = String(this.circles.length);
    this.events.emit("circles-ready", getCircleCount());

    this.scale.on("resize", this.handleResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off("resize", this.handleResize, this);
    });
  }

  update(_time, delta) {
    const deltaSeconds = delta / 1000;
    const { width, height } = this.scale;

    this.circles.forEach((circle) => circle.updateMotion(deltaSeconds, width, height));
  }

  createCircles(width, height) {
    createCircleConfigs(width, height).forEach((config) => {
      this.circles.push(new CircleSprite(this, config));
    });
  }

  drawBackground(width, height) {
    if (!this.background) {
      this.background = this.add.graphics();
    }

    this.background.clear();
    this.background.fillGradientStyle(0x102542, 0x102542, 0x0b132b, 0x08111f, 1);
    this.background.fillRect(0, 0, width, height);

    this.background.lineStyle(1, 0xffffff, 0.05);
    for (let x = 0; x < width; x += 48) {
      this.background.lineBetween(x, 0, x, height);
    }
    for (let y = 0; y < height; y += 48) {
      this.background.lineBetween(0, y, width, y);
    }
  }

  handleResize(gameSize) {
    const { width, height } = gameSize;
    this.cameras.resize(width, height);
    this.drawBackground(width, height);
    resizeCircleSet(this.circles, width, height);
    document.body.dataset.circleCount = String(this.circles.length);
  }
}
