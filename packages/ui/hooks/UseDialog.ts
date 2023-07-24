import React from "react";

export type DialogContextValue = {
  id: string;
  labelId: string;
};

export const DialogContext = React.createContext<DialogContextValue | null>(
  null
);

export const useDialogContext = () => {
  const context = React.useContext(DialogContext);

  if (!context) throw new Error("");

  return context;
};

const _idDialogPrefix = "dialog";
const _idDialogLabelSuffix = "label";
export const useDialog = (): DialogContextValue => {
  const id = React.useId();

  return {
    id: `${_idDialogPrefix}-${id}`,
    labelId: `${_idDialogPrefix}-${id}-${_idDialogLabelSuffix}`,
  };
};
