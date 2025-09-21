import { Canvas } from "@react-three/fiber";
import { Analytics } from "@vercel/analytics/react";
import { Leva } from "leva";
import ReactDOM from "react-dom/client";
import * as THREE from "three";
import { AnalyticsTagManager } from "./analytics/Analytics";
import Experience from "./Experience";
import "./style.css";
//for basic analytics
new AnalyticsTagManager();
const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(
  <>
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
    <Leva />
    <Analytics />
  </>
);
