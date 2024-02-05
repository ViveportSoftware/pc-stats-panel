import { UI } from "./ui";

const init = (pc: any) => {
  if (!pc) {
    console.warn("pc is undefined");
    return;
  }
  const app = pc.app;
  if (!app) {
    console.warn("app is undefined");
    return;
  }

  if (!app.stats) {
    console.warn("app.stats is undefined");
    return;
  }

  const ui = new UI(pc, app);

  ui.init();

  app.on("update", () => {
    ui.update(app.stats);
  });
};

export { init };
