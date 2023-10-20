import React from "react";
import { Button } from "./button";

type Props = {
  children: React.ReactNode;
  onSelectedContent?: () => void;
  position?: string;
};

function SelectionButtons({
  children,
  onSelectedContent,
  position = "start",
}: Props) {
  const pos: { [key: string]: string } = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  };
  return (
    <Button
      variant="ghost"
      onClick={onSelectedContent}
      className={` capitalize z-25 w-full text-start border-muted h-8 rounded-lg gap-2 items-center ${pos[position]}`}
    >
      {children}
    </Button>
  );
}

export default SelectionButtons;
