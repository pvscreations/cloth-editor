import { MutableRefObject, useEffect, useRef } from "react";
import { Group, Object3D } from "three";
import gsap from "gsap";

type PulseEffectProps = {
  isActive?: boolean;
  object?: MutableRefObject<Object3D>;
  randomness?: number;
  x?: boolean;
  y?: boolean;
  z?: boolean;
  scaleFactor?: number;
  scaleX?: number;
  scaleY?: number;
  scaleZ?: number;
  transitionTime?: number;
  children?: React.ReactNode;
};

const PulseEffect: React.FC<PulseEffectProps> = ({
  isActive = true,
  object,
  randomness = 0.5,
  x,
  y,
  z,
  scaleFactor = 0.95,
  scaleX,
  scaleY,
  scaleZ,
  transitionTime = 0.7,
  children,
}) => {
  const localRef = useRef<Group | null>(null);
  const ref = children ? localRef : object;

  const isAxisExplicit = x !== undefined || y !== undefined || z !== undefined;
  const xPulse = isAxisExplicit ? !!x : true;
  const yPulse = isAxisExplicit ? !!y : true;
  const zPulse = isAxisExplicit ? !!z : true;
  const xScaleFactor = scaleX ?? scaleFactor;
  const yScaleFactor = scaleY ?? scaleFactor;
  const zScaleFactor = scaleZ ?? scaleFactor;

  useEffect(() => {
    if (!ref || !ref.current || !isActive) return;

    const target = ref.current;
    const delay = randomness * Math.random();

    gsap.to(target.scale, {
      x: xPulse ? xScaleFactor : target.scale.x,
      y: yPulse ? yScaleFactor : target.scale.y,
      z: zPulse ? zScaleFactor : target.scale.z,
      duration: transitionTime,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut",
      delay,
    });

    return () => {
      gsap.killTweensOf(target.scale);
    };
  }, [
    isActive,
    xPulse,
    yPulse,
    zPulse,
    randomness,
    xScaleFactor,
    yScaleFactor,
    zScaleFactor,
    transitionTime,
  ]);

  return children ? <group ref={localRef}>{children}</group> : null;
};

export default PulseEffect;
