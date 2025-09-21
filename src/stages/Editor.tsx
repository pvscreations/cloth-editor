import {
  Line,
  OrbitControls,
  Point,
  PointMaterial,
  Points,
} from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, useState } from "react";
import * as THREE from "three";
import { ClothModel } from "../components/ClothModel";
import { debuggerConfig, editorConfig } from "../config/levaConfig";
import { EEditorType } from "../constants/editor";
import "../geometry/fatlinTypes";
import Lights from "../Lights";
export const Editor = () => {
  const editorConfiguration = useControls("Editor Type", editorConfig);
  const debuggingConfiguration = useControls("Debugging", debuggerConfig);
  const annotationControls = useControls("Annotation", {
    annotationColor: {
      value: "#000000",
      label: "Annotation Color",
    },
  });
  const modelRef = useRef<THREE.Scene>(null);
  //load model and mapping texture

  //looking at camera
  useFrame((state) => {
    if (modelRef.current) {
      //   modelRef.current.lookAt(state.camera.position);
    }
    // state.camera.position.set(0, 2, 5);
    // state.camera.lookAt(0, 0, 0);
  });

  const [points, setPoints] = useState<THREE.Vector3[]>([]);

  const [lines, setLines] = useState<THREE.Vector3[][]>([[]]);
  const [polygon, setPolygon] = useState<THREE.Vector3[][]>([[]]);

  const pointerUpHandler = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const intersection = e.intersections[0];
    const normal = intersection.face?.normal || new THREE.Vector3(0, 0, 1);
    const newPoint = intersection.point
      .clone()
      .add(normal.clone().multiplyScalar(editorConfiguration.offset));
    switch (editorConfiguration.editorType) {
      case EEditorType.POINT:
        setPoints((prevPoints) => [...prevPoints, newPoint]);
        break;
      case EEditorType.LINE:
        setLines((prevLines) => {
          let updatedLines = [...prevLines];
          const currentLine = [...updatedLines[updatedLines.length - 1]];
          if (currentLine.length == 0 || currentLine.length % 2 != 0) {
            currentLine.push(newPoint);
            updatedLines[updatedLines.length - 1] = currentLine;
          } else if (currentLine.length % 2 == 0) {
            updatedLines = [...updatedLines, []];
          }
          return updatedLines;
        });
        break;
      case EEditorType.POLYGON:
        setPolygon((prevPolygon) => {
          const updatedPolygon = [...prevPolygon];
          const currentPoly = [
            ...updatedPolygon[updatedPolygon.length - 1],
            newPoint,
          ];
          updatedPolygon[updatedPolygon.length - 1] = currentPoly;
          return updatedPolygon;
        });
        break;
    }
  };

  const pointerMoveHandler = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const intersection = e.intersections[0];

    const normal = intersection.face?.normal || new THREE.Vector3(0, 0, 1);
    const newPoint = intersection.point
      .clone()
      .add(normal.clone().multiplyScalar(editorConfiguration.offset));

    switch (editorConfiguration.editorType) {
      case EEditorType.LINE:
        setLines((prevLines) => {
          if (prevLines[prevLines.length - 1].length === 0) return prevLines;
          const updatedLines = [...prevLines];
          const currentLine = [...updatedLines[updatedLines.length - 1]];
          if (currentLine.length % 2 === 0) {
            currentLine[1] = newPoint;
          } else {
            currentLine.push(newPoint);
          }
          updatedLines[updatedLines.length - 1] = currentLine;
          return updatedLines;
        });
        break;
      case EEditorType.POLYGON:
        if (polygon.length > 0) {
          setPolygon((prevPolygon) => {
            const updatedPolygon = [...prevPolygon];
            const currentPoly = [...updatedPolygon[updatedPolygon.length - 1]];
            if (currentPoly.length % 2 === 0) {
              currentPoly.push(newPoint);
            } else {
              currentPoly[currentPoly.length - 1] = newPoint;
            }
            updatedPolygon[updatedPolygon.length - 1] = currentPoly;
            return updatedPolygon;
          });
        }
    }
  };

  const doubleClickHandler = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    switch (editorConfiguration.editorType) {
      case EEditorType.POLYGON:
        setPolygon((prevPolygon) => {
          const updatedPolygon = [...prevPolygon, []];
          const currentPoly = [...updatedPolygon[updatedPolygon.length - 2]];
          currentPoly.push(currentPoly[0]); // Close the polygon by connecting to the first point
          updatedPolygon[updatedPolygon.length - 2] = currentPoly;
          return updatedPolygon;
        });
        break;
    }
  };

  return (
    <>
      {/* <PostProcessingEffects /> */}
      {/* <Blender /> */}
      {/* <fatLine>
        <fatLineGeometry attach="geometry" points={points} />
        <fatLineMaterial color={"red"} linewidth={0.01} />
      </fatLine> */}

      {/* <fatLine ref={fatLineRef}>
        <fatLineMaterial color={"red"} linewidth={0.01} />
      </fatLine> */}

      {/** lines */}
      {lines.map((line, index) =>
        line.length >= 2 ? (
          <Line
            key={index}
            points={line}
            color={annotationControls.annotationColor}
          />
        ) : null
      )}
      {/** points */}
      {points.length > 0 && (
        <Points>
          {points.map((point, index) => (
            <Point key={index} position={point} />
          ))}
          <PointMaterial
            color={annotationControls.annotationColor}
            size={0.1}
            sizeAttenuation={true}
            // colorWrite={false}
            transparent={true}
            depthWrite={false}
          />
        </Points>
      )}
      {/** polygon */}
      {polygon.map((poly, index) =>
        poly.length >= 2 ? (
          <Line
            key={index}
            points={poly}
            color={annotationControls.annotationColor}
          />
        ) : null
      )}
      {debuggingConfiguration.enableOrbitControls && (
        <OrbitControls makeDefault />
      )}
      <group
        onPointerUp={pointerUpHandler}
        onPointerMove={pointerMoveHandler}
        onDoubleClick={doubleClickHandler}
      >
        <ClothModel ref={modelRef} />
      </group>

      <Lights />
    </>
  );
};
