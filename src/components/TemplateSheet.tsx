import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { FiMaximize } from "react-icons/fi";
import { IPread } from "./types";

type TTemplateSheet = {
  open: boolean;
  onOpen: (open: boolean) => void;
  templates: IPread[];
  setReadmeContent: React.Dispatch<React.SetStateAction<string>>;
};

function TemplateSheet({
  open,
  onOpen,
  templates,
  setReadmeContent,
}: TTemplateSheet) {
  return (
    <Sheet onOpenChange={onOpen} open={open}>
      <SheetTrigger>
        <Button variant="outline">Select Templates</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-lg">Templates</SheetTitle>
          <SheetDescription>Select 3 of 3 Templates</SheetDescription>
        </SheetHeader>

        {templates.length > 0 && (
          <div className="flex flex-col gap-4 mt-2 rounded-lg ">
            {templates.map((template: IPread) => (
              <div className="flex flex-col gap-1">
                <Button variant="ghost" className="self-end p-2 h-8 text-lg">
                  <FiMaximize />
                </Button>
                <div
                  onClick={() => {
                    setReadmeContent(template.content);
                    onOpen(false);
                  }}
                >
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    className="markdown-body w-full h-64 overflow-auto space-y-2 border p-4 hover:border-primary hover:bg-muted  cursor-pointer"
                  >
                    {template.content}
                  </Markdown>
                </div>
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default TemplateSheet;
