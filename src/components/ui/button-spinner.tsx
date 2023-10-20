import { IconContext } from "react-icons";
import { CgSpinner } from "react-icons/cg";

function ButtonSpinner() {
  return (
    <IconContext.Provider
      value={{
        size: "1.1rem",
        className: "animate-spin h-5 w-5 text-xs text-orange-400",
      }}
    >
      <CgSpinner />
    </IconContext.Provider>
  );
}

export default ButtonSpinner;
