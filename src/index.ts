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

// create box entity
const box = new pc.Entity("cube");
box.addComponent("render", {
  type: "box",
});
app.root.addChild(box);

// create camera entity
const camera = new pc.Entity("camera");
camera.addComponent("camera", {
  clearColor: new pc.Color(0.5, 0.6, 0.9),
});
app.root.addChild(camera);
camera.setPosition(0, 0, 3);

// create directional light entity
const light = new pc.Entity("light");
light.addComponent("light");
app.root.addChild(light);
light.setEulerAngles(45, 0, 0);

// rotate the box according to the delta time since the last frame
app.on("update", (/** @type {number} */ dt) =>
  box.rotate(10 * dt, 20 * dt, 30 * dt)
);

app.start();

lib.init(pc);
