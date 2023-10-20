import React from "react";

type Props = {
  children: React.ReactNode;
};

function PreadWrapper({ children }: Props) {
  return (
    <div className="relative p-2 w-full flex flex-col  gap-2 md:flex-row">
      {children}
    </div>
  );
}

export default PreadWrapper;
