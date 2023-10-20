import ReactCodeMirror, { EditorView } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { usePread } from "./Pread";

import { IPread } from "./types";

function CodeEditorContainer() {
  const { selectedContentLists, setSelectedContentLists } = usePread();
  return (
    <div className="w-full  md:max-h-[80vh] space-y-2 md:w-1/2">
      <div className=" flex flex-col space-y-2 items-center justify-start">
        <div
          id="generateCta"
          className=" flex  items-center justify-end w-full gap-2 md:flex-row"
        ></div>
      </div>
      <div id="code-editor" className="md:h-[80vh] overflow-auto border">
        <ReactCodeMirror
          value={selectedContentLists.find((item) => item.isActive)?.content}
          theme="light"
          className="border rounded-md"
          extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
          onChange={(e) => {
            setSelectedContentLists((prev: IPread[]) =>
              prev.map((item: IPread) =>
                item.isActive ? { ...item, content: e } : item
              )
            );
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorContainer;
