import React, { useState } from "react";
import { BiReset, BiTrash } from "react-icons/bi";
import useGenerateTemplate from "../hooks/useGenerateTemplate";
import { toast } from "./use-toast";
import { BsStars } from "react-icons/bs";
import { IPread, PreadType } from "../types";
import { usePread } from "../Pread";

// DND Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// Draggable
import SortableItem from "./sortable-item";

type Props = {
  items: IPread[];
  setItems: React.Dispatch<React.SetStateAction<IPread[]>>;
  onSet: (
    fn: (prev: IPread[]) => IPread[], // (prev: IPread[]) => [...prev, currentActive]
    type?: PreadType
  ) => void;
};

function DraggableButtons({ items, setItems, onSet }: Props) {
  // Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const currentActive = items.find((item) => item.isActive === 1) as IPread;

  // State to identify what items are generating from the AI API
  const [itemsGenerating, setItemsGenerating] = useState<number[]>([]); // [1, 2, 3]
  // State to indicate if items are a new generated itens
  const [generatedNewItems, setGeneratedNewItems] = useState<number[]>([]); // [1, 2, 3

  // Hook for generating templates
  const { fetchTemplates } = useGenerateTemplate();

  // DnD SortItems
  function handleSortItems(e: DragEndEvent) {
    const { active, over } = e;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // Deletes the item
  function handleDeleteItem() {
    setItems((prev) => prev.filter((item) => item.id !== currentActive?.id));

    // onSet resets the templates and sections list
    onSet((prev) => [...prev, currentActive], currentActive?.type);
  }

  // Resets the item
  function handleResetItem() {
    const originalContent = currentActive?.originalContent;
    const currentActiveId = currentActive?.id;

    const newItem = items.map((item) =>
      item.id === currentActiveId ? { ...item, content: originalContent } : item
    );
    setItems(newItem);
  }

  // Generates the item
  async function handleGenerateItem({ id }: { id: number }) {
    // if item is already generating, add it to the list of items generating
    setItemsGenerating((prev) => [...prev, id]);

    // fetchTemplates returns an object with the new templates, and the status of the request
    const { newTemplates, isError, error } = await fetchTemplates(
      currentActive.content
    );

    // if there is an error, toast the error message
    if (isError) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    // if there is no error, and the request is successful, set the new templates
    setItems((items) => [
      ...items.map((item) =>
        item.id === id ? { ...item, content: newTemplates?.[0].content } : item
      ),
    ]);
    // remove the item from the list of items generating
    setItemsGenerating((prev) => prev.filter((item) => item !== id));
    // add the item to the list of generated new items
    setGeneratedNewItems((prev) => [...prev, id]);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleSortItems}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item, index) => (
          <SortableItem
            id={item.id}
            item={item}
            setItems={setItems}
            setGeneratedNewItems={setGeneratedNewItems}
            index={index}
            itemsGenerating={itemsGenerating}
            generatedNewItems={generatedNewItems}
            handleGenerateItem={handleGenerateItem}
            handleResetItem={handleResetItem}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}

// ResetContent Button
type TResetContent = {
  onResetItem: () => void;
};

export function ResetContent({ onResetItem }: TResetContent) {
  const { isDesktop } = usePread();
  return (
    <div
      onClick={onResetItem}
      className={`flex items-center justify-start text-xs gap-2 hover:cursor-pointer p-2 ${
        isDesktop ? " w-48 hover:bg-secondary " : ""
      } `}
    >
      <BiReset /> {isDesktop && <span>Reset</span>}
    </div>
  );
}

// DeleteContent Button
type TDeleteContent = {
  onDeleteItem: () => void;
};

export function DeleteContent({ onDeleteItem }: TDeleteContent) {
  const { isDesktop } = usePread();
  return (
    <div
      className={`flex items-center justify-start text-xs gap-2 hover:cursor-pointer p-2  ${
        isDesktop ? " w-48 hover:bg-secondary " : ""
      }`}
      onClick={onDeleteItem}
    >
      <BiTrash /> {isDesktop && <span>Delete</span>}
    </div>
  );
}

// GenerateContent Button
type TGenerateContent = {
  onGenerateItem: () => void;
};

export function GenerateContent({ onGenerateItem }: TGenerateContent) {
  const { isDesktop } = usePread();
  return (
    <div
      className={`flex items-center justify-start text-xs gap-2 hover:cursor-pointer p-2 text-orange-400 font-bold  ${
        isDesktop ? " w-48 hover:bg-secondary" : ""
      }`}
      onClick={onGenerateItem}
    >
      <BsStars /> {isDesktop && <span>Generate</span>}
    </div>
  );
}

export default DraggableButtons;
