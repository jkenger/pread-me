import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { Toaster } from "@/components/ui/toaster";
import TopNav from "@/components/TopNav";

import CodeEditorContainer from "./CodeEditorContainer";
import MarkdownContainer from "./MarkdownContainer";
import PreadWrapper from "./PreadWrapper";

import Sidebar from "./Sidebar";
import { Contents } from "./app/Content";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { IPread, PreadType } from "./types";
import useMediaQuery from "./hooks/useMediaQuery";

type TUsePread = {
  selectedContentLists: IPread[];
  setSelectedContentLists: React.Dispatch<React.SetStateAction<IPread[]>>;
  createNewCustomSection: (newSection: IPread) => void;
  // MARKDOWN
  markdown: string;
  contents: IPread[];
  templates: IPread[];
  handleFilterSelection: (fn: THandleFilterSelection) => void;
  sections: IPread[];
  handleResetContentList: (
    fn?: (prev: IPread[]) => IPread[],
    type?: PreadType
  ) => void;

  generatedContents: IPread[];
  setGeneratedContents: React.Dispatch<React.SetStateAction<IPread[]>>;

  isDesktop: boolean;
};

type THandleFilterSelection = {
  id: number;
  type: PreadType;
};

const PreadContext = createContext({});

function Pread() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Initialize Content
  const Content = useMemo(() => new Contents(), []);

  // Contents
  // consumed by Sidebar.tsx
  // Store initial contents
  const contents = Content.getContents();
  // Store CHATGPT generated contents
  const [generatedContents, setGeneratedContents] = useState([]); // ["", "", ""]

  const [selectedContentLists, setSelectedContentLists] = useLocalStorageState(
    [],
    "pread"
  );

  const [templates, setTemplates] = useState(
    // remove ids from selectedContentLists
    Content.getContentByType(PreadType.TEMPLATES).filter(
      (item: IPread) =>
        !selectedContentLists.find((i: IPread) => i.id === item.id)
    )
  );

  const [sections, setSections] = useState(
    Content.getContentByType(PreadType.SECTIONS).filter(
      (item: IPread) =>
        !selectedContentLists.find((i: IPread) => i.id === item.id)
    )
  );

  // function that will remove the given id form the state list
  function handleFilterSelection({ type, id }: THandleFilterSelection) {
    if (type === PreadType.TEMPLATES) {
      const newTemplates = templates.filter((item: IPread) => item.id !== id);
      setTemplates(newTemplates);
    }
    if (type === PreadType.SECTIONS) {
      const newSections = sections.filter((item: IPread) => item.id !== id);
      setSections(newSections);
    }
  }

  // MarkDown States and Effects
  const [markdown, setMarkdown] = useState<string>("");
  const tempContent = selectedContentLists
    .map((item: IPread) => item.content)
    .join("\n\n");
  useEffect(() => {
    setMarkdown(tempContent);
  }, [selectedContentLists]);

  function createNewCustomSection(newSection: IPread) {
    // Reset active lists
    const notActiveNewLists = selectedContentLists.map((i: IPread) => ({
      ...i,
      isActive: 0,
    }));
    setSelectedContentLists(notActiveNewLists);
    // Add new section and set new active list
    setSelectedContentLists((prev: IPread[]) => [...prev, newSection]);
  }

  const value = {
    // SIDEBAR STATES
    selectedContentLists,
    setSelectedContentLists,
    createNewCustomSection,
    markdown,
    contents,
    templates,

    // SIDEBAR FUNCTIONS
    handleFilterSelection,
    sections,

    // CODEEDITOR
    handleResetContentList,

    // CHATGPT
    generatedContents,
    setGeneratedContents,

    // MEDIA QUERY
    isDesktop,
  };

  // Reset Templates and Sections List when item from selected contents is deleted
  function handleResetContentList(
    fn?: (prev: IPread[]) => IPread[],
    type?: PreadType
  ) {
    if (type === PreadType.TEMPLATES) {
      setTemplates(fn || []);
    }
    if (type === PreadType.SECTIONS) {
      setSections(fn || []);
    }
  }

  return (
    <PreadContext.Provider value={value}>
      <Toaster />
      <TopNav />
      <PreadWrapper>
        {isDesktop && <Sidebar />}
        <CodeEditorContainer />
        <MarkdownContainer />
      </PreadWrapper>
    </PreadContext.Provider>
  );
}

export function usePread() {
  const context = useContext(PreadContext);
  if (context === undefined) {
    throw new Error("usePread must be used within a PreadProvider");
  }
  return context as TUsePread;
}

export default Pread;
