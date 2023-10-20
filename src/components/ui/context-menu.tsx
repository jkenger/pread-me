import React, { cloneElement, useContext, useState } from "react";
import useMousePosition from "../hooks/useMousePosition";
import { createPortal } from "react-dom";

import { useHandleClick } from "../hooks/useHandleClick";

const ContextMenuContext = React.createContext({});

type Props = {
  children: React.ReactNode;
};

type TContextMenuContext = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  coords: { x: number; y: number };
  setCoords: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  handleSetIsOpen: () => void;
};

function ContextMenu({ children }: Props) {
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
    <ContextMenuContext.Provider value={value}>
      {children}
    </ContextMenuContext.Provider>
  );
}

function ContextMenuTrigger({ children }: Props) {
  const { setCoords, isOpen, setIsOpen } = useContextMenu();

  // if (isOpen) setIsMenuOpen(true)
  // else setIsMenuOpen(false);

  const { current: mousePosition } = useMousePosition();
  if (React.isValidElement(children)) {
    return cloneElement(children as React.ReactElement, {
      onClick: () => {
        children?.props.onClick();

        setIsOpen(false);
      },
      onContextMenu: (e: MouseEvent) => {
        e.preventDefault();
        children?.props.onClick();

        if (isOpen) {
          setCoords({ x: mousePosition.x, y: mousePosition.y });
        }

        if (!isOpen) {
          setCoords({ x: mousePosition.x, y: mousePosition.y });

          setIsOpen(true);
        }
      },
    });
  }
}

function ContextMenuContent({ children }: Props) {
  const { isOpen, coords, handleSetIsOpen } = useContextMenu();

  const ref = useHandleClick(handleSetIsOpen);

  if (isOpen)
    return createPortal(
      <div
        ref={ref as unknown as React.RefObject<HTMLDivElement>}
        className={`absolute z-50 bg-white border border-gray-200 rounded-md shadow-lg`}
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

function ContextMenuItem({ children }: Props) {
  return <div className="z-50">{children}</div>;
}

export function useContextMenu(): TContextMenuContext {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error("useContextMenu must be used within ContextMenuProvider");
  }
  return context as TContextMenuContext;
}

ContextMenu.Trigger = ContextMenuTrigger;
ContextMenu.Content = ContextMenuContent;
ContextMenu.Item = ContextMenuItem;

export default ContextMenu;
