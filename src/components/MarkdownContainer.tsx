import Markdown from "react-markdown";
import { usePread } from "./Pread";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function MarkdownContainer() {
  const { markdown } = usePread();
  return (
    <div
      className=" w-full md:h-[80vh] md:max-h-[80vh] rounded-md md:w-1/2"
      id="markdown"
    >
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        className="markdown-body w-full h-full overflow-auto space-y-2 border p-4 "
      >
        {markdown}
      </Markdown>
    </div>
  );
}

export default MarkdownContainer;
