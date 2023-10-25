import { downloadtoMd } from "@/lib/readme";
import { AiOutlineFileMarkdown } from "react-icons/ai";
import { usePread } from "./Pread";
import { BsSquareHalf } from "react-icons/bs";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";

function TopNav() {
  const { markdown, isDesktop } = usePread();
  return (
    <nav className="p-4 w-full flex justify-between items-center border ">
      {!isDesktop && (
        <div className="">
          <Sheet>
            <SheetTrigger>
              <div className="text-lg hover:cursor-pointer">
                <BsSquareHalf />
              </div>
            </SheetTrigger>
            <SheetContent side="left">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>
      )}

      <div className="hover:cursor-pointer -mt-1">
        <h1 className="text-3xl font-semibold">
          pread.<span className="text-orange-400">me</span>
        </h1>
      </div>
      <div>
        <div
          className="text-lg hover:cursor-pointer flex items-center justify-center gap-1"
          onClick={() => downloadtoMd(markdown)}
        >
          <AiOutlineFileMarkdown />
          <span className="text-xs border px-2 py-1 rounded-lg bg-red-400 text-white">
            Download
          </span>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
