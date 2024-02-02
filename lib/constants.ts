export enum VALUE_TYPE {
  INTEGER,
  FLOAT,
  MEGABYTES,
  INTL,
}

export const STATS = {
  frame: "FRAME",
  drawCalls: "DRAWCALLS",
  vram: "VRAM",
  scene: "SCENE",
};

export const ATTRIBUTES = {
  "frame.fps": { title: "fps", valueType: VALUE_TYPE.INTEGER },
  "frame.ms": { title: "ms", valueType: VALUE_TYPE.FLOAT },
  "frame.triangles": { title: "triangles", valueType: VALUE_TYPE.INTL },
  "frame.shaders": { title: "shaders", valueType: VALUE_TYPE.INTEGER },
  "frame.materials": { title: "materials", valueType: VALUE_TYPE.INTEGER },
  "drawCalls.total": { title: "total", valueType: VALUE_TYPE.INTEGER },
  "scene.meshInstances": {
    title: "meshInstances",
    valueType: VALUE_TYPE.INTEGER,
  },
};

export const METHODS = {
  vram: {
    totalUsed: { title: "total", valueType: VALUE_TYPE.MEGABYTES },
  },
};
