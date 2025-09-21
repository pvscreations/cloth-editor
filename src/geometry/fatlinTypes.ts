import { extend } from "@react-three/fiber";
import { JSX } from "react/jsx-dev-runtime";
import { LineGeometry, LineMaterial, Line2 } from "three-fatline";

extend({
  FatLineGeometry: LineGeometry,
  FatLineMaterial: LineMaterial,
  FatLine: Line2,
});

declare module "@react-three/fiber" {
  interface ThreeElements {
    fatLine: JSX.IntrinsicElements["mesh"];
    fatLineGeometry: JSX.IntrinsicElements["planeGeometry"];
    fatLineMaterial: JSX.IntrinsicElements["material"];
  }
}
