import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { useControls } from "leva";
import { BlendFunction } from "postprocessing";
import { postprocessingConfig } from "../config/levaConfig";

export const PostProcessingEffects = () => {
  const {vignetteOffset, vignetteDarkness} = useControls("Vignette",postprocessingConfig);
  return (
    <EffectComposer stencilBuffer>
      <Vignette
        offset={vignetteOffset} // vignette offset
        darkness={vignetteDarkness} // vignette darkness
        // eskil={false} // Eskil's vignette technique
        blendFunction={BlendFunction.NORMAL} // blend mode
      />
    </EffectComposer>
  );
};
