// Leva configuration for player properties
export const playerConfig = {
	impulseStrength: { value: 0.6, min: 0.1, max: 2, step: 0.01 },
	torqueStrength: { value: 0.2, min: 0.05, max: 1, step: 0.01 },
	jumpStrength: { value: 0.5, min: 0.1, max: 2, step: 0.01 },
	cameraOffsetZ: { value: 2.25, min: 1, max: 5, step: 0.01 },
	cameraOffsetY: { value: 0.65, min: 0.1, max: 2, step: 0.01 },
	restitution: { value: 0.2, min: 0, max: 1, step: 0.01 },
	friction: { value: 1, min: 0, max: 5, step: 0.01 },
	linearDamping: { value: 0.5, min: 0, max: 2, step: 0.01 },
	angularDamping: { value: 0.5, min: 0, max: 2, step: 0.01 },
	position: {
		value: { x: 0, y: 1, z: 0 },
		x: { min: -10, max: 10, step: 0.01 },
		y: { min: -10, max: 10, step: 0.01 },
		z: { min: -10, max: 10, step: 0.01 },
	},
};

// Leva configuration for lights properties
export const lightsConfig = {
	directionalIntensity: { value: 4.5, min: 0, max: 10, step: 0.1 },
	ambientIntensity: { value: 1.5, min: 0, max: 5, step: 0.1 },
	directionalPositionX: { value: 4, min: -10, max: 10, step: 0.1 },
	directionalPositionY: { value: 4, min: -10, max: 10, step: 0.1 },
	directionalPositionZ: { value: 1, min: -10, max: 10, step: 0.1 },
};


export const levelConfig = {
	// blocksCount: { value: 10, min: 1, max: 20, step: 1 },
	blockTypes: {
		value: ['BlockSpinner', 'BlockAxe', 'BlockLimbo','BlockLimboRing','BlockSpinnerRing','BlockAxeRing','BlockSpinnerWindow','BlockAxeWindow','BlockLimboWindow'],
		options: ['BlockSpinner', 'BlockAxe', 'BlockLimbo','BlockLimboRing','BlockSpinnerRing','BlockAxeRing','BlockSpinnerRing','BlockAxeWindow','BlockLimboWindow','BlockSpinnerWindow'],
		multiple: true,
	},
};

export const postprocessingConfig = {
  vignetteOffset: { value: 0.5, min: 0, max: 1, step: 0.01 },
  vignetteDarkness: { value: 0.5, min: 0, max: 3, step: 0.01 },
};