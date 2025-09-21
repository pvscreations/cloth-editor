// Leva configuration for cloth model properties
import { EEditorType } from "../constants/editor";

export const modelConfig = {
  modelColor: {
    value: "#ff0000", // default red
  },
};
// Leva configuration for player properties
export const editorConfig = {
  editorType: {
    value: EEditorType.POLYGON,
    options: [EEditorType.POINT, EEditorType.LINE, EEditorType.POLYGON],
  },
  offset: { value: 0.03, min: 0, max: 0.1, step: 0.01 },
};

// Leva configuration for lights properties
export const lightsConfig = {
  directionalIntensity: { value: 4.5, min: 0, max: 10, step: 0.1 },
  ambientIntensity: { value: 1.5, min: 0, max: 5, step: 0.1 },
  directionalPositionX: { value: 4, min: -10, max: 10, step: 0.1 },
  directionalPositionY: { value: 4, min: -10, max: 10, step: 0.1 },
  directionalPositionZ: { value: 1, min: -10, max: 10, step: 0.1 },
};

export const postprocessingConfig = {
  vignetteOffset: { value: 0.5, min: 0, max: 1, step: 0.01 },
  vignetteDarkness: { value: 0.5, min: 0, max: 3, step: 0.01 },
};

export const debuggerConfig = {
  enableOrbitControls: { value: true },
  showMonitors: { value: false },
};
