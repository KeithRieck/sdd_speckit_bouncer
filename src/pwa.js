let deferredInstallPrompt = null;

export function detectLaunchMode() {
  const standaloneMedia = window.matchMedia("(display-mode: standalone)").matches;
  const isIosStandalone = window.navigator.standalone === true;
  const isTwa = document.referrer.startsWith("android-app://");

  if (standaloneMedia || isIosStandalone || isTwa) {
    return "Installed app";
  }

  return "Browser tab";
}

export function bindInstallButton(button) {
  if (!button) {
    return;
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    button.hidden = false;
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    button.hidden = true;
  });

  button.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      return;
    }

    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    button.hidden = true;
  });
}

export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return { registered: false, reason: "unsupported" };
  }

  const url = new URL("../service-worker.js", import.meta.url);
  const scope = new URL("../", import.meta.url);

  try {
    const registration = await navigator.serviceWorker.register(url, {
      scope: scope.pathname
    });

    return { registered: true, registration };
  } catch (error) {
    console.warn("Service worker registration failed.", error);
    return { registered: false, reason: "failed", error };
  }
}
