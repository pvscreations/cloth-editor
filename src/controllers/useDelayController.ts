import { useRef } from "react";
import gsap from "gsap";

export default function useDelayController() {
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const delay = (callback: () => void, delay: number) => {
    kill(); // Ensure any previous delay is cleared
    tweenRef.current = gsap.delayedCall(delay, () => {
      callback();
      kill();
    });
  };

  const kill = () => {
    if (tweenRef.current) {
      tweenRef.current.kill();
      tweenRef.current = null;
    }
  };

  return { delay, kill };
}
