import { useEffect, useRef } from "react";

export function useHandleClick(handler: () => void, listenCapturing = true) {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);
      document.addEventListener("contextmenu", handleClick, listenCapturing);

      return function () {
        document.removeEventListener("click", handleClick, listenCapturing);
        document.removeEventListener(
          "contextmenu",
          handleClick,
          listenCapturing
        );
      };
    },
    [handler, listenCapturing]
  );
  return ref;
}
