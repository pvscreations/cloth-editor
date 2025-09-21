import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./Interface";
import { Leva } from "leva";
import * as THREE from "three";
import "./style.css";
import { AnalyticsTagManager } from "./analytics/Analytics";
import { Analytics } from "@vercel/analytics/react";
//for basic analytics
new AnalyticsTagManager();
const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(
  <>
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas
        shadows
        gl={{
          antialias: true,
          // outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.LinearToneMapping,
          stencil: true,
        }}
      >
        <Experience />
      </Canvas>
      {/* <Interface /> */}
    </KeyboardControls>
    <Leva collapsed />
    <Analytics />
  </>
);
