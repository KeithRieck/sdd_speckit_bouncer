export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.on("progress", (value) => {
      this.registry.set("loadingProgress", value);
    });
  }

  create() {
    this.scene.start("BouncingCirclesScene");
  }
}
