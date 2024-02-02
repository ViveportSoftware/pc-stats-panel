import * as pc from "playcanvas";

import { UI } from "./ui";

export const init = (app: pc.Application) => {
  if (!app) {
    console.warn("app is undefined");
    return;
  }

  if (!app.stats) {
    console.warn("app.stats is undefined");
    return;
  }

  const ui = new UI(app);

  ui.init(app);

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

  app.on("update", () => {
    ui.update(app.stats);
  });
};
