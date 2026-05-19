import Phaser from "../vendor/phaser.esm.js";
import { BootScene } from "./scenes/BootScene.js";
import { BouncingCirclesScene } from "./scenes/BouncingCirclesScene.js";
import { bindInstallButton, detectLaunchMode, registerServiceWorker } from "./pwa.js";

const launchModeNode = document.querySelector("#launch-mode");
const installButton = document.querySelector("#install-app");
const gameRoot = document.querySelector("#game-root");

bindInstallButton(installButton);
updateLaunchModeLabel();

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: gameRoot,
  backgroundColor: "#08111f",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight
  },
  render: {
    antialias: true,
    pixelArt: false
  },
  scene: [BootScene, BouncingCirclesScene]
});

window.__PWA_BOUNCER__ = {
  game,
  getLaunchMode: detectLaunchMode
};

window.addEventListener("resize", () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});

window.addEventListener("pageshow", () => {
  updateLaunchModeLabel();
});

window.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    updateLaunchModeLabel();
  }
});

registerServiceWorker().then((result) => {
  if (!result.registered && launchModeNode) {
    launchModeNode.dataset.offline = "limited";
  }
});

function updateLaunchModeLabel() {
  if (!launchModeNode) {
    return;
  }

  launchModeNode.textContent = `${detectLaunchMode()} • 64 circles live`;
}
