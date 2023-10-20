import React from "react";
import { IPread } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { usePread } from "../Pread";
import { IconContext } from "react-icons";
import PreadToolTip from "./pread-tooltip";
import { Button } from "./button";
import { MdDragIndicator } from "react-icons/md";
import DropdownMenu from "./dropdown-menu";
import AiGenerating from "./ai-generating";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  DeleteContent,
  GenerateContent,
  ResetContent,
} from "./draggable-buttons";
type Props = {
  id: number;
  item: IPread;
  setGeneratedNewItems: React.Dispatch<React.SetStateAction<number[]>>;
  setItems: React.Dispatch<React.SetStateAction<IPread[]>>;
  index: number;
  itemsGenerating: number[];
  generatedNewItems: number[];
  handleGenerateItem: (item: IPread) => void;
  handleResetItem: () => void;
  handleDeleteItem: () => void;
};

function SortableItem({
  id,
  item,
  generatedNewItems,
  itemsGenerating,
  setGeneratedNewItems,
  handleGenerateItem,
  handleResetItem,
  handleDeleteItem,
  setItems,
  index,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const { isDesktop } = usePread();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={`relative flex items-center gap-2 `}
      ref={setNodeRef}
      onClick={() => {
        console.log("clicked");
        setGeneratedNewItems((prev) => prev.filter((i) => i !== item.id));
        setItems((prev) =>
          prev
            .map((item) => ({ ...item, isActive: 0 }))
            .map((item, i) => (i === index ? { ...item, isActive: 1 } : item))
        );
      }}
      style={style}
      {...attributes}
    >
      {generatedNewItems.includes(item.id) && (
        <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2 ">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-300"></span>
        </span>
      )}
      <Button
        data-isactive={`${item.isActive}`}
        variant="ghost"
        className={`${
          item.isActive === 1
            ? "border border-orange-400 hover:bg-background"
            : ""
        } capitalize z-50 w-full h-8 rounded-lg flex justify-between items-center `}
      >
        <div className="flex text-start gap-2 items-center justify-start">
          <PreadToolTip tip="drag to order list">
            <div
              className={`hover:cursor-grab active:cursor-grabbing `}
              {...listeners}
            >
              <IconContext.Provider
                value={{
                  className: `${
                    item.isActive ? "text-orange-400" : "text-foreground"
                  } text-lg`,
                }}
              >
                <MdDragIndicator />
              </IconContext.Provider>
            </div>{" "}
          </PreadToolTip>
          <span>{item.name}</span>
        </div>
        {isDesktop && (
          <DropdownMenu>
            <DropdownMenu.Trigger>
              <div className="flex items-center">
                {itemsGenerating.includes(item.id) ? (
                  <AiGenerating />
                ) : (
                  <IconContext.Provider
                    value={{
                      size: "1.1rem",
                      className: `hover:text-orange-400 `,
                    }}
                  >
                    <BiDotsHorizontalRounded />
                  </IconContext.Provider>
                )}
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>
                <GenerateContent
                  onGenerateItem={() => {
                    handleGenerateItem(item);
                  }}
                />
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <ResetContent onResetItem={handleResetItem} />
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <DeleteContent onDeleteItem={handleDeleteItem} />
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        )}
        {!isDesktop && (
          <div className="flex">
            {!itemsGenerating.includes(item.id) && (
              <GenerateContent
                onGenerateItem={() => {
                  handleGenerateItem(item);
                }}
              />
            )}
            <ResetContent onResetItem={handleResetItem} />
            <DeleteContent onDeleteItem={handleDeleteItem} />
          </div>
        )}
      </Button>
    </div>
  );
}

export default SortableItem;
