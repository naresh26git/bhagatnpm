import Dialog from "ui/Dialog";
import { useDialog } from "ui/hooks/UseDialog";

export const TestDialog = () => {
  const value = useDialog();

  return (
    <>
      <Dialog.Trigger {...value} variant="primary">
        Add Contact
      </Dialog.Trigger>

      <Dialog {...value}>
        <Dialog.Header title="Add Address" />
        <Dialog.Body>Hello world!</Dialog.Body>
      </Dialog>
    </>
  );
};

export default Dialog;
