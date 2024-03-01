import bootstrapCSSUrl from "bootstrap/dist/css/bootstrap.min.css?url";
import bootstrapJSUrl from "bootstrap/dist/js/bootstrap.min.js?url";

import { PlayCanvas } from "./playcanvas";
import { PolygonStreaming } from "./polygon-streaming";

class UI {
  pc: any;
  app: any;

  pcs: PlayCanvas;
  pss: PolygonStreaming;

  constructor(pc: any, app: any) {
    this.pc = pc;
    this.app = app;
    this.pcs = new PlayCanvas(pc, app);
    this.pss = new PolygonStreaming(pc, app);
  }

  init() {
    this.injectBootstrap();

    this.pcs.init();
    this.pss.init();

    document.addEventListener("keypress", async (e) => {
      console.error(e);
      if (e.key == "/") {
        this.pcs.show();
      }

      if (e.key == "\\") {
        this.pss.show();
      }
    });
  }

  injectBootstrap() {
    const bootstrapCSS = document.createElement("link");
    bootstrapCSS.href = bootstrapCSSUrl;
    bootstrapCSS.rel = "stylesheet";
    document.body.appendChild(bootstrapCSS);

    const bootstrapJS = document.createElement("script");
    bootstrapJS.src = bootstrapJSUrl;
    document.body.appendChild(bootstrapJS);

    const customCSS = document.createElement("style");
    customCSS.innerHTML = `
      .list-group {
          --bs-list-group-item-padding-x: 0.5rem;
          --bs-list-group-item-padding-y: 0.2rem;
      }
      `;
    document.body.appendChild(customCSS);
  }

  update() {
    this.pcs.update();
  }
}

export { UI };
