import * as pc from "playcanvas";
import * as lib from "../lib/";

const canvas = document.getElementsByTagName("canvas")[0];

const app = new pc.Application(canvas, {
  mouse: new pc.Mouse(canvas),
  keyboard: new pc.Keyboard(window as any),
  touch: new pc.TouchDevice(window as any),
});

app.graphicsDevice.maxPixelRatio = Math.min(window.devicePixelRatio, 2);

// fill the available space at full resolution
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);

// ensure canvas is resized when window changes size
window.addEventListener("resize", () => app.resizeCanvas());

app.start();

lib.init(app);
