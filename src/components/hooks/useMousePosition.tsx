import { useEffect, useRef } from "react";

const useMousePosition = () => {
  const mousePosition = useRef({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      mousePosition.current.x = ev.clientX;
      mousePosition.current.y = ev.clientY;
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return mousePosition;
};
export default useMousePosition;
