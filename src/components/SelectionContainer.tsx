import React from "react";

type Props = { children: React.ReactNode };

function SelectionContainer({ children }: Props) {
  return (
    <div className="flex flex-col text-sm " id="templateContainer">
      {children}
    </div>
  );
}

export default SelectionContainer;
