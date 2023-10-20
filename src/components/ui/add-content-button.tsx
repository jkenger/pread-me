import { useState } from "react";
import { IconContext } from "react-icons";
import { IoIosAdd } from "react-icons/io";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  closeDialog,
} from "./dialog";
import { Input } from "./input";
import { usePread } from "../Pread";
import { IPread, PreadType } from "../types";

function AddContentButton() {
  const [value, setValue] = useState("");
  const [inputError] = useState("");

  const { createNewCustomSection } = usePread();

  function handleOnClick(newSection: IPread) {
    createNewCustomSection(newSection);
  }

  const submit = () => {
    const id = crypto.randomUUID() as unknown as number;
    const newSection: IPread = {
      id: id,
      name: value,
      type: PreadType.CUSTOM,
      originalContent: `## ${value}`,
      content: `## ${value}`,
      isActive: 1,
    };
    if (value === "") {
      newSection.name = "Untitled";
      newSection.content = "## Untitled";
      newSection.originalContent = "## Untitled";
      handleOnClick(newSection);
      closeDialog();
    }
    if (value !== "") {
      setValue("");
      handleOnClick(newSection);
      closeDialog();
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <div className="flex items-center text-orange-600">
          <IconContext.Provider
            value={{
              className: "text-orange-600 hover:cursor-pointer text-xl",
            }}
          >
            <IoIosAdd />
          </IconContext.Provider>
          <span className="capitalize">add custom</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-orange-400">
            New Custom Section
          </DialogTitle>
          <DialogDescription>
            Create your new custom section according to your preference. This
            will allow you to edit the content of the section.
          </DialogDescription>
          <Input
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                // 👇️ your logic here
                submit();
              }
            }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Title of your new section"
            className={`${!inputError ? "border-none" : "border-red-500"} `}
          />
          <DialogDescription className="text-red-500">
            {inputError}
          </DialogDescription>
          <DialogFooter>
            <Button variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="default" onClick={submit}>
              Create
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddContentButton;
