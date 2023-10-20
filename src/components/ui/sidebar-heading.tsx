import React from "react";

type Props = {
  children: React.ReactNode;
};

function SideBarHeading({ children }: Props) {
  return (
    <div className="inline-flex items-center justify-between gap-1 ">
      {children}
    </div>
  );
}

export default SideBarHeading;
