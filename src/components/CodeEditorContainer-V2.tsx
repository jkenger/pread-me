// ignore this file, this is just a backup file for CodeEditorContainer.tsx
// ignore eslint warning for this file
// ignore typescript error for this file

/* eslint-disable */
// @ts-nocheck

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { BsStars } from "react-icons/bs";
import useGenerateTemplate from "./hooks/useGenerateTemplate";
import ReactCodeMirror, { EditorView } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { usePread } from "./Pread";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { BiSolidSend } from "react-icons/bi";

type Props = {};

function CodeEditorContainer({}: Props) {
  const [selectedTemplateOption, setSelectedTemplateOption] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const { readmeContent, handleReadMeContent, setTemplates } = usePread();
  const { fetchTemplates, isLoading } = useGenerateTemplate();
  const [prompOnSelectedText, setPrompOnSelectedText] = useState("");

  function handleSelectedTemplateOption(val) {
    setSelectedTemplateOption(val);
  }

  async function generateTemplate() {
    const { newTemplates: data } = await fetchTemplates({
      selectedTemplateOption,
    });
    setTemplates(data);
    console.log("data", data);
  }
  async function promptRevisition() {
    const { newTemplates: data } = await fetchTemplates({
      selectedTemplateOption,
      revisePrompt: prompOnSelectedText,
      toChange: selectedText,
    });

    const newReadMeContent = readmeContent.replace(
      new RegExp(selectedText, "i"), // search for the selected text from readMeContent
      data.content // replacement, the ai generated text
    );
    console.log(newReadMeContent); // log the new readMeContent

    handleReadMeContent(newReadMeContent); // set the new readMeContent
    // const { newTemplates: data } = await fetchTemplates({
    //   selectedTemplateOption,
    //   isRevision: true,
    //   revisePrompt: prompOnSelectedText,
    //   previousOutput: readmeContent,
    //   toChange: selectedText,
    // });
    // setTemplates(data);
    // console.log("data", data);
  }

  return (
    <div className="w-full h-full space-y-2 md:w-1/2">
      <div className=" flex flex-col space-y-2 items-center justify-start">
        <div
          id="generateCta"
          className=" flex  items-center justify-end w-full gap-2 md:flex-row"
        >
          {/* <Button onClick={handleGenerateReadMe}>Generate Readme</Button> */}
          {/* <TemplateSheet
                open={sheetToggle}
                onOpen={handleSheetToggle}
                templates={templates}
                setReadmeContent={setReadmeContent}
              /> */}
          <div id="generateInput" className="basis">
            <Select
              onValueChange={handleSelectedTemplateOption}
              defaultValue={selectedTemplateOption}
            >
              <SelectTrigger>
                <SelectValue placeholder="Template type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="documentation">Documentation</SelectItem>
                <SelectItem value="profile">Profile</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            className="space-x-2 text-red-400 hover:text-red-600 self-end"
            onClick={generateTemplate}
            disabled={isLoading}
          >
            <BsStars />
            <span className="">
              {isLoading ? "May take a while..." : "Generate AI Template"}
            </span>
          </Button>
        </div>
      </div>
      <div id="code-editor" className="bg-">
        <ContextMenu>
          <ContextMenuTrigger>
            <ReactCodeMirror
              value={readmeContent}
              theme="light"
              className="border rounded-md"
              extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
              onChange={handleReadMeContent}
              onContextMenu={() => {
                if (!isLoading) {
                  const selected = window.getSelection();
                  const selectedText =
                    selected?.anchorNode?.cmView.dom.parentElement.innerText;

                  if (selected?.anchorNode?.textContent) {
                    setSelectedText(selectedText);

                    console.log("selectedText", selectedText);
                  }
                }
              }}
            />
          </ContextMenuTrigger>
          <ContextMenuContent>
            <div className="flex w-full rounded-md border border-input bg-transparent pr-1 pl-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
              <input
                className="text-sm rounded-lg border-0 shadow-0 focus:outline-none"
                placeholder="Prompt..."
                value={prompOnSelectedText}
                onChange={(e) => setPrompOnSelectedText(e.target.value)}
              />
              <Button
                variant="ghost"
                className="mr-0 text-orange-400"
                onClick={promptRevisition}
              >
                <BiSolidSend />
              </Button>
            </div>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </div>
  );
}

export default CodeEditorContainer;
