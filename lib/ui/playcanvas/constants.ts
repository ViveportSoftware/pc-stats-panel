import { VALUE_TYPE } from "../base/constants";

export const STATS = {
  frame: "FRAME",
  drawCalls: "DRAWCALLS",
  vram: "VRAM",
  scene: "SCENE",
};

export const ATTRIBUTES = {
  "frame.fps": { title: "fps", type: VALUE_TYPE.INTEGER },
  "frame.ms": { title: "ms", type: VALUE_TYPE.FLOAT },
  "frame.triangles": { title: "triangles", type: VALUE_TYPE.INTL },
  "frame.shaders": { title: "shaders", type: VALUE_TYPE.INTEGER },
  "frame.materials": { title: "materials", type: VALUE_TYPE.INTEGER },
  "drawCalls.total": { title: "total", type: VALUE_TYPE.INTEGER },
  "scene.meshInstances": {
    title: "meshInstances",
    type: VALUE_TYPE.INTEGER,
  },
};

export const METHODS = {
  vram: {
    totalUsed: { title: "total", type: VALUE_TYPE.MEGABYTES },
  },
};
