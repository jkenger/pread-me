import React from "react";
import { Tooltip, TooltipContent } from "./tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

type Props = {
  tip: string;
  children: React.ReactNode;
};

function PreadToolTip({ tip, children }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger className="w-4 h-4 text-orange-400">
        {children}
      </TooltipTrigger>
      <TooltipContent
        sideOffset={5}
        side="bottom"
        align="center"
        className="bg-orange-400"
      >
        {tip}
      </TooltipContent>
    </Tooltip>
  );
}

export default PreadToolTip;
