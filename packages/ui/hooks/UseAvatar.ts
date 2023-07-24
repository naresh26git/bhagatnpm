import React from "react";

export type ACTION =
  | {
      type: "set-image-error";
    }
  | {
      type: "set-alt-error";
    };

export type State = {
  imageError: boolean;
  altError: boolean;
};

export const reducer = (state: State, action: ACTION): State => {
  switch (action.type) {
    case "set-image-error": {
      return { ...state, imageError: true };
    }
    case "set-alt-error": {
      return { ...state, altError: true };
    }
    default: {
      return { ...state };
    }
  }
};

export type AvatarContextValue<InjectedProps extends unknown = unknown> = {
  state: State;
  dispatcher: React.Dispatch<ACTION>;
} & InjectedProps;

export const AvatarContext = React.createContext<AvatarContextValue | null>(
  null
);

export const useAvatarContext = <
  InjectedProps extends unknown = unknown
>(): AvatarContextValue<InjectedProps> => {
  const context = React.useContext(
    AvatarContext as unknown as React.Context<AvatarContextValue<InjectedProps>>
  );

  if (!context)
    throw new Error(
      "Could not find the AvatarContext. Make sure you have a AvatarContext.Provider defined above the current component."
    );

  return context;
};

export type UseAvatarProps = {};

export const useAvatar = <InjectedProps extends unknown = unknown>(
  injectedProps: UseAvatarProps
): AvatarContextValue<InjectedProps> => {
  const [state, dispatcher] = React.useReducer(reducer, {
    imageError: false,
    altError: false,
  });

  return {
    state,
    dispatcher,
    ...injectedProps,
  } as AvatarContextValue<InjectedProps>;
};
