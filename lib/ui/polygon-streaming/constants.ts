import { VALUE_TYPE, INPUT_TYPE } from "../base/constants";

export const STREAM_CONTROLLER_ATTR = {
  camera: {
    title: "camera",
    type: VALUE_TYPE.ENTITY,
    input: INPUT_TYPE.NONE,
  },
  cameraType: {
    title: "cameraType",
    type: VALUE_TYPE.STRING,
    input: INPUT_TYPE.SELECT,
    options: ["nonPlayer", "player"],
  },
  occlusionCulling: {
    title: "occlusionCulling",
    type: VALUE_TYPE.BOOLEAN,
    input: INPUT_TYPE.CHECKBOX,
  },
  occlusionGeometry: {
    title: "occlusionGeometry",
    type: VALUE_TYPE.STRING,
    input: INPUT_TYPE.SELECT,
    options: ["boundingBox", "mesh"],
  },
  occlusionQueryFrequency: {
    title: "occlusionQueryFrequency",
    type: VALUE_TYPE.INTEGER,
    input: INPUT_TYPE.TEXT,
  },
  triangleBudget: {
    title: "triangleBudget",
    type: VALUE_TYPE.INTL,
    input: INPUT_TYPE.TEXT,
  },
  mobileTriangleBudget: {
    title: "mobileTriangleBudget",
    type: VALUE_TYPE.INTL,
    input: INPUT_TYPE.TEXT,
  },
  minimumDistance: {
    title: "minimumDistance",
    type: VALUE_TYPE.FLOAT,
    input: INPUT_TYPE.TEXT,
  },
  distanceFactor: {
    title: "distanceFactor",
    type: VALUE_TYPE.FLOAT,
    input: INPUT_TYPE.TEXT,
  },
  distanceType: {
    title: "distanceType",
    type: VALUE_TYPE.STRING,
    input: INPUT_TYPE.SELECT,
    options: ["boundingBoxCenter", "boundingBox"],
  },
  maximumQuality: {
    title: "maximumQuality",
    type: VALUE_TYPE.INTL,
    input: INPUT_TYPE.TEXT,
  },
  closeUpDistance: {
    title: "closeUpDistance",
    type: VALUE_TYPE.FLOAT,
    input: INPUT_TYPE.TEXT,
  },
  closeUpDistanceFactor: {
    title: "closeUpDistanceFactor",
    type: VALUE_TYPE.FLOAT,
    input: INPUT_TYPE.TEXT,
  },
};

export const STREAMABLE_MODEL_ATTR = {
  path: {
    title: "path",
    type: VALUE_TYPE.STRING,
  },
  qualityPriority: {
    title: "qualityPriority",
    type: VALUE_TYPE.FLOAT,
    input: INPUT_TYPE.TEXT,
  },
  useAlpha: {
    title: "useAlpha",
    type: VALUE_TYPE.BOOLEAN,
    input: INPUT_TYPE.CHECKBOX,
  },
  useMetalRoughness: {
    title: "useMetalRoughness",
    type: VALUE_TYPE.BOOLEAN,
    input: INPUT_TYPE.CHECKBOX,
  },
  castShadows: {
    title: "castShadows",
    type: VALUE_TYPE.BOOLEAN,
    input: INPUT_TYPE.CHECKBOX,
  },
  castLightmapShadows: {
    title: "castLightmapShadows",
    type: VALUE_TYPE.BOOLEAN,
    input: INPUT_TYPE.CHECKBOX,
  },
  receiveShadows: {
    title: "receiveShadows",
    type: VALUE_TYPE.BOOLEAN,
    input: INPUT_TYPE.CHECKBOX,
  },
  doubleSidedMaterials: {
    title: "doubleSidedMaterials",
    type: VALUE_TYPE.BOOLEAN,
    input: INPUT_TYPE.CHECKBOX,
  },
  initialTrianglePercent: {
    title: "initialTrianglePercent",
    type: VALUE_TYPE.FLOAT,
    input: INPUT_TYPE.TEXT,
  },
};
