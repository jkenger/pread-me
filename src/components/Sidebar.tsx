import SelectionContainer from "./SelectionContainer";
import SelectionButtons from "./ui/selection-buttons";
import DraggableButtons from "./ui/draggable-buttons";
import { LiaQuestionCircleSolid } from "react-icons/lia";
import { usePread } from "./Pread";
import PreadToolTip from "./ui/pread-tooltip";
import SideBarHeading from "./ui/sidebar-heading";
import AddContentButton from "./ui/add-content-button";
import { IPread } from "./types";

function Sidebar() {
  const {
    templates,
    sections,
    handleResetContentList,
    handleFilterSelection,
    isDesktop,
  } = usePread();

  // Drag and Drop fn
  const { selectedContentLists, setSelectedContentLists } = usePread();

  function handleOnSelectedContent(item: IPread) {
    const id = item.id;
    const type = item.type;
    const notActiveNewLists = selectedContentLists.map((i) => ({
      ...i,
      isActive: 0,
    }));
    setSelectedContentLists(notActiveNewLists);
    setSelectedContentLists((prev) => [...prev, { ...item, isActive: 1 }]);
    // remove selected item from templates
    handleFilterSelection({ type, id });
  }

  return (
    <>
      <div
        className={`${
          isDesktop ? "w-96" : "w-full"
        } p-4 space-y-4 md:max-h-[80vh] overflow-auto`}
      >
        <SelectionContainer>
          <SideBarHeading>
            <div className="flex items-center gap-1">
              <h1 className="text-orange-400">Contents</h1>
              <PreadToolTip tip="Select, drag and drop to reorder">
                <LiaQuestionCircleSolid />
              </PreadToolTip>
            </div>
            <AddContentButton />
          </SideBarHeading>

          <div className="space-y-1 mt-2 text-center" id="templateSelection">
            {selectedContentLists.length === 0 && (
              <p className=" mt-2">Select template or section below</p>
            )}

            <DraggableButtons
              items={selectedContentLists}
              setItems={setSelectedContentLists}
              onSet={handleResetContentList}
            />
          </div>
        </SelectionContainer>

        <SelectionContainer>
          <SideBarHeading>
            <div className="flex items-center gap-1">
              <h1 className="text-orange-400">Templates</h1>
              <PreadToolTip tip="Select to add templates">
                <LiaQuestionCircleSolid />
              </PreadToolTip>
            </div>
          </SideBarHeading>

          <div className="space-y-1 mt-2 text-center" id="templateSelection">
            {!templates.length && (
              <p className=" mt-2">No template available</p>
            )}
            {templates && (
              <>
                {templates.map((item) => (
                  <SelectionButtons
                    key={item.id}
                    onSelectedContent={() => handleOnSelectedContent(item)}
                  >
                    {item.name}
                  </SelectionButtons>
                ))}
              </>
            )}
          </div>
        </SelectionContainer>
        <SelectionContainer>
          <SideBarHeading>
            <div className="flex items-center gap-1">
              <h1 className="text-orange-400">Sections</h1>
              <PreadToolTip tip="Select to add sections">
                <LiaQuestionCircleSolid />
              </PreadToolTip>
            </div>
          </SideBarHeading>
          <div className="space-y-1 mt-2 text-center" id="templateSelection">
            {!sections.length && <p className=" mt-2">No section available</p>}
            {sections && (
              <>
                {sections.map((item) => (
                  <SelectionButtons
                    key={item.id}
                    onSelectedContent={() => handleOnSelectedContent(item)}
                  >
                    {item.name}
                  </SelectionButtons>
                ))}
              </>
            )}
          </div>
        </SelectionContainer>
      </div>
    </>
  );
}

export default Sidebar;
