import { usePread } from "./Pread";
import Editor from "@monaco-editor/react";

import { IPread } from "./types";
import useMediaQuery from "./hooks/useMediaQuery";

function CodeEditorContainer() {
  const { selectedContentLists, setSelectedContentLists } = usePread();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <div className="w-full  md:max-h-[80vh] space-y-2 md:w-1/2">
      <div className=" flex flex-col space-y-2 items-center justify-start">
        <div
          id="generateCta"
          className=" flex  items-center justify-end w-full gap-2 md:flex-row"
        ></div>
      </div>
      <div id="code-editor" className="md:h-[80vh] overflow-auto border">
        {isDesktop ? (
          <Editor
            value={selectedContentLists.find((item) => item.isActive)?.content}
            theme="vs-dark"
            className="border rounded-md"
            language="markdown"
            options={{
              wordWrap: "on",
            }}
            onChange={(e) => {
              setSelectedContentLists(
                (prev: IPread[]) =>
                  prev.map((item: IPread) =>
                    item.isActive ? { ...item, content: e } : item
                  ) as IPread[]
              );
            }}
          />
        ) : (
          <textarea
            onChange={(e) => {
              setSelectedContentLists(
                (prev: IPread[]) =>
                  prev.map((item: IPread) =>
                    item.isActive ? { ...item, content: e } : item
                  ) as IPread[]
              );
            }}
            value={selectedContentLists.find((item) => item.isActive)?.content}
            className={`full-screen rounded-sm border bg-gray-800 text-white w-full h-[400px] p-6 resize-none `}
          />
        )}
      </div>
    </div>
  );
}

export default CodeEditorContainer;
