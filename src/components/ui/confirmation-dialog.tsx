import { Button } from "./button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
type Props = {
  title: string;
  description: string;
  onOk: () => void;
  onOkText?: string;
};

function ConfirmationDialog({
  title,
  description,
  onOk,
  onOkText = "submit",
}: Props) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={onOk} className="capitalize bg-orange-400">
          {onOkText}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default ConfirmationDialog;
