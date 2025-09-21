import gsap from "gsap";
import { JSX, useLayoutEffect, useRef, useState } from "react";
import { Box3, Group, Mesh, Points, Sprite, Vector3 } from "three";

type FadeOutEffectProps = {
  isActive?: boolean;
  object?: React.MutableRefObject<Group | null>;
  duration?: number;
  delay?: number;
  overlay?: {
    color?: string;
    customMesh?: JSX.Element;
  };
  children?: React.ReactNode;
  onComplete?: () => void;
};

const FadeOutEffect: React.FC<FadeOutEffectProps> = ({
  isActive = true,
  object,
  duration = 2,
  delay = 0,
  overlay,
  children,
  onComplete,
}) => {
  const localRef = useRef<Group | null>(null);
  const overlayRef = useRef<Mesh | null>(null);
  const customOverlayRef = useRef<Group | null>(null);
  const ref = children ? localRef : object;
  const [boxSize, setBoxSize] = useState(new Vector3(1, 1, 1));

  useLayoutEffect(() => {
    if (!ref?.current) return;

    const box = new Box3().setFromObject(ref.current);
    const size = new Vector3();
    box.getSize(size);
    setBoxSize(size);
  }, [ref]);

  useLayoutEffect(() => {
    if (!ref?.current || !isActive) return;

    if (overlay) {
      if (overlayRef.current) {
        gsap.to(overlayRef.current.material, {
          opacity: 0, //  Fade out overlay (1 → 0)
          duration,
          delay,
          ease: "power2.out",
          onComplete: () => {
            onComplete?.();
            if (overlayRef.current) {
              overlayRef.current.geometry.dispose();
              const overlayMaterial = overlayRef.current.material;
              if (overlayMaterial instanceof Array) {
                overlayMaterial.forEach((material) => {
                  material.dispose();
                });
              } else {
                overlayMaterial.dispose();
              }
              overlayRef.current.parent?.remove(overlayRef.current);
              overlayRef.current = null; //  Clear ref
            }
          },
        });
      }
      if (customOverlayRef.current) {
        gsap.to(customOverlayRef.current, {
          opacity: 0, //  Fade out custom overlay (1 → 0)
          duration,
          delay,
          ease: "power2.out",
          onComplete: () => {
            onComplete?.();
            if (customOverlayRef.current) {
              customOverlayRef.current.traverse((child) => {
                if (child instanceof Mesh) {
                  child.geometry.dispose();
                  child.material.dispose();
                }
              });
              customOverlayRef.current.parent?.remove(customOverlayRef.current);
              customOverlayRef.current = null;
            }
          },
        });
      }
    }

    ref.current.traverse((child) => {
      if (
        (child instanceof Mesh ||
          child instanceof Sprite ||
          child instanceof Points) &&
        child.material &&
        child.material.opacity !== undefined
      ) {
        gsap.to(child.material, {
          opacity: 0, //  Corrected: Fade out object (1 → 0)
          duration,
          delay,
          ease: "power2.out",
          onComplete: () => {
            onComplete?.();
          },
        });
      }
    });

    return () => {
      if (ref.current) {
        gsap.killTweensOf(ref.current); //  Kills group-level tweens
        ref.current.traverse((child) => {
          if (
            child instanceof Mesh &&
            child.material &&
            child.material.opacity
          ) {
            gsap.killTweensOf(child.material); //  Also kills tweens applied to child materials
          }
        });
      }
      if (overlayRef.current) gsap.killTweensOf(overlayRef.current);
      if (customOverlayRef.current) gsap.killTweensOf(customOverlayRef.current);
    };
  }, [isActive, duration, delay, overlay]);

  return (
    <group ref={localRef}>
      {overlay?.customMesh ? (
        <group ref={customOverlayRef}>{overlay.customMesh}</group>
      ) : overlay?.color ? (
        <mesh ref={overlayRef} position={[0, 0, boxSize.z / 2 + 0.01]}>
          <planeGeometry args={[boxSize.x, boxSize.y]} />
          <meshBasicMaterial
            color={overlay.color}
            transparent
            opacity={1}
          />{" "}
          {/* ✅ Default opacity 1 */}
        </mesh>
      ) : null}

      {children}
    </group>
  );
};

export default FadeOutEffect;
