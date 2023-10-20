import React, { cloneElement, useContext, useState } from "react";
import useMousePosition from "../hooks/useMousePosition";
import { createPortal } from "react-dom";

import { useHandleClick } from "../hooks/useHandleClick";

const DropdownMenuContext = React.createContext({});

type Props = {
  children: React.ReactNode;
};

type TDropdownMenuContext = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  coords: { x: number; y: number };
  setCoords: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  handleSetIsOpen: () => void;
};

function DropdownMenu({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  function handleSetIsOpen() {
    setIsOpen((prev) => !prev);
  }

  const value = {
    isOpen,
    setIsOpen,
    coords,
    setCoords,
    handleSetIsOpen,
  };

  return (
    <DropdownMenuContext.Provider value={value}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({ children }: Props) {
  const { setCoords, isOpen, setIsOpen } = useDropdownContext();

  const { current: mousePosition } = useMousePosition();
  return cloneElement(children as React.ReactElement, {
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      // children?.props?.onClick();
      if (!isOpen) {
        setCoords({ x: mousePosition.x, y: mousePosition.y });

        setIsOpen(true);
      }
    },
    onContextMenu: () => {
      setIsOpen(false);
    },
  });
}

function DropdownMenuContent({ children }: Props) {
  const { isOpen, coords, handleSetIsOpen } = useDropdownContext();

  const ref = useHandleClick(handleSetIsOpen);

  if (isOpen)
    return createPortal(
      <div
        ref={ref as unknown as React.LegacyRef<HTMLDivElement>}
        className={`absolute z-50 bg-white border border-gray-200 rounded-md shadow-lg text-sm`}
        style={{
          top: coords.y + 5,
          left: coords.x + 5,
        }}
        onClick={handleSetIsOpen}
      >
        {children}
      </div>,
      document.querySelector("#root") as HTMLElement
    );
}

function DropdownMenuItem({ children }: Props) {
  return <div className="z-50">{children}</div>;
}

export function useDropdownContext(): TDropdownMenuContext {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("useContextMenu must be used within ContextMenuProvider");
  }
  return context as TDropdownMenuContext;
}

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;

export default DropdownMenu;
