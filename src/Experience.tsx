import { Perf } from "r3f-perf";
import { JSX } from "react";
import { ExperienceProps } from "./types";
import { Index } from "./stages/Index";
import { useControls } from "leva";
import { debuggerConfig } from "./config/levaConfig";
export default function Experience({}: ExperienceProps): JSX.Element {
  const debuggingConfiguration = useControls("Debugging", debuggerConfig);
  return (
    <>
      <color args={["#bdedfc"]} attach="background" />
      {debuggingConfiguration.showMonitors && <Perf position="top-left" />}
      <Index />
    </>
  );
}
