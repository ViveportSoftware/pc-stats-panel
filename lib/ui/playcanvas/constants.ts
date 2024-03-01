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
  "drawCalls.shadow": { title: "shadow", type: VALUE_TYPE.INTEGER },
  "drawCalls.total": { title: "total", type: VALUE_TYPE.INTEGER },
  "vram.tex": { title: "texture total", type: VALUE_TYPE.MEGABYTES },
  "vram.texAsset": { title: "texture asset", type: VALUE_TYPE.MEGABYTES },
  "vram.texLightmap": { title: "texture lightmap", type: VALUE_TYPE.MEGABYTES },
  "vram.texShadow": { title: "texture shadow", type: VALUE_TYPE.MEGABYTES },
  "vram.ib": { title: "index buffer", type: VALUE_TYPE.MEGABYTES },
  "vram.vb": { title: "vertex buffer", type: VALUE_TYPE.MEGABYTES },
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
