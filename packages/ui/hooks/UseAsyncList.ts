import React from "react";
import { WithUid } from "../DataGrid";

export type LIST_ACTIONS<ListItemType extends object = {}> =
  | { type: "loading" }
  | { type: "error"; payload: Required<Pick<ListState<ListItemType>, "error">> }
  | {
      type: "success";
      payload: Omit<ListState<ListItemType>, "isLoading" | "error">;
    };

export type ListItem<ListItemType extends object = {}> = WithUid &
  ListItemType & { [Key: string]: React.ReactNode };

export type ListState<ListItemType extends object = {}> = {
  isLoading: boolean;
  error?: Error;
  totalCount: number;
  items: ListItem<ListItemType>[];
};

export const listReducer = <ListItemType extends object = {}>(
  state: ListState<ListItemType>,
  action: LIST_ACTIONS<ListItemType>
): ListState<ListItemType> => {
  switch (action.type) {
    case "loading": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "error": {
      return {
        ...action.payload,
        isLoading: false,
        totalCount: 0,
        items: [],
      };
    }
    case "success": {
      return {
        ...action.payload,
        isLoading: false,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export type PAGINATION_ACTION =
  | { type: "previous" }
  | { type: "next" }
  | { type: "update"; payload: PaginationState };

export type PaginationState = {
  totalCount: number;
  limit: number;
  page: number;
};

export const computeIsNextDisabled = (paginationState: PaginationState) => {
  return (
    (paginationState.page + 1) * paginationState.limit >=
    paginationState.totalCount
  );
};

export const computeIsPreviousDisabled = (paginationState: PaginationState) => {
  return paginationState.page * paginationState.limit <= 0;
};

export const paginationReducer = (
  state: PaginationState,
  action: PAGINATION_ACTION
): PaginationState => {
  switch (action.type) {
    case "next": {
      if (!computeIsNextDisabled(state))
        return { ...state, page: state.page + 1 };
      return { ...state };
    }
    case "previous": {
      if (!computeIsPreviousDisabled(state))
        return { ...state, page: state.page - 1 };
      return { ...state };
    }
    case "update": {
      return { ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export type SELECTION_ACTION =
  | {
      type: "all" | "none";
    }
  | {
      type: "item";
      payload: { items: WithUid[]; uid: WithUid["uid"] };
    };

export type NoneSelected = undefined;
export type SomeSelected = Set<WithUid["uid"]>;
export type AllSelected = "all";
export type SelectionState = NoneSelected | SomeSelected | AllSelected;

export const normalizeSelectionNextState = (
  selectionState: SomeSelected,
  noOfItems: number
): SelectionState => {
  switch (selectionState.size) {
    case 0: {
      return undefined;
    }
    case noOfItems: {
      return "all";
    }
    default: {
      return selectionState;
    }
  }
};

export const selectionReducer = (
  state: SelectionState,
  action: SELECTION_ACTION
): SelectionState => {
  switch (action.type) {
    case "none": {
      return undefined;
    }
    case "item": {
      if (!state) {
        return new Set([action.payload.uid]);
      }

      if (state === "all") {
        const intermediateNextState = new Set([
          ...action.payload.items
            .map((item) => item.uid)
            .filter((uid) => uid !== action.payload.uid),
        ]);

        return normalizeSelectionNextState(
          intermediateNextState,
          action.payload.items.length
        );
      }

      if (!state.has(action.payload.uid)) {
        const intermediateNextState = new Set([...state, action.payload.uid]);

        // console.log({ state, action, intermediateNextState });

        return normalizeSelectionNextState(
          intermediateNextState,
          action.payload.items.length
        );
      }

      const intermediateNextState = new Set(
        [...state].filter((uid) => uid !== action.payload.uid)
      );

      return normalizeSelectionNextState(
        intermediateNextState,
        action.payload.items.length
      );
    }
    case "all": {
      return "all";
    }
    default: {
      if (!state) return undefined;
      if (state === "all") return "all";
      return { ...state };
    }
  }
};

export type SORT_ACTION = {
  type: "sort";
  payload: Sorted;
};

export type Unsorted = undefined;
export type Sorted = {
  sortBy: string;
  sortOrder: "asc" | "desc";
};
export type SortState = Unsorted | Sorted;

export const sortReducer = (
  state: SortState,
  action: SORT_ACTION
): SortState => {
  switch (action.type) {
    case "sort": {
      return { ...action.payload };
    }
    default: {
      if (!state) return undefined;

      return { ...state };
    }
  }
};

export type AsyncListContextValue<
  InjectedProps extends unknown = unknown,
  ListItemType extends object = {}
> = InjectedProps & {
  states: {
    listState: ListState<ListItemType>;
    paginationState: PaginationState;
    selectionState: SelectionState;
    sortState: SortState;
  };
  dispatchers: {
    listDispatcher: React.Dispatch<LIST_ACTIONS<ListItemType>>;
    paginationDispatcher: React.Dispatch<PAGINATION_ACTION>;
    selectionDispatcher: React.Dispatch<SELECTION_ACTION>;
    sortDispatcher: React.Dispatch<SORT_ACTION>;
  };
};

export const AsyncListContext =
  React.createContext<AsyncListContextValue | null>(null);

export const useAsyncListContext = <
  InjectedProps extends unknown = unknown,
  ListItemType extends object = {}
>() => {
  const context = React.useContext(
    AsyncListContext as unknown as React.Context<
      AsyncListContextValue<InjectedProps, ListItemType>
    >
  );

  if (!context)
    throw new Error(
      "Could not find the AsyncListContext. Make sure you have a AsyncListContext.Provider defined above the current component."
    );

  return context;
};

let initialLoad = true;

const _defaultListState = {
  totalCount: 0,
  items: [],
  isLoading: false,
} satisfies ListState;
const _defaultPaginationState = {
  totalCount: 0,
  page: 0,
  limit: 5,
} satisfies PaginationState;

export type UseAsyncListProps<
  InjectedProps extends unknown = unknown,
  ListItemType extends object = {}
> = {
  load: (
    context: AsyncListContextValue<InjectedProps, ListItemType>
  ) => Promise<
    | Omit<ListState<ListItemType>, "isLoading" | "error">
    | Required<Pick<ListState<ListItemType>, "error">>
  >;
  defaultListState?: ListState<ListItemType>;
  defaultPaginationState?: PaginationState;
};

export const useAsyncList = <
  InjectedProps extends unknown = unknown,
  ListItemType extends object = {}
>({
  load,
  defaultListState = _defaultListState,
  defaultPaginationState = _defaultPaginationState,
  ...injectedProps
}: UseAsyncListProps<InjectedProps, ListItemType>): AsyncListContextValue<
  InjectedProps,
  ListItemType
> => {
  const [listState, listDispatcher] = React.useReducer(
    listReducer<ListItemType>,
    defaultListState
  );
  const [paginationState, paginationDispatcher] = React.useReducer(
    paginationReducer,
    defaultPaginationState
  );
  const [selectionState, selectionDispatcher] = React.useReducer(
    selectionReducer,
    undefined
  );
  const [sortState, sortDispatcher] = React.useReducer(sortReducer, undefined);

  const context = {
    states: {
      listState,
      paginationState,
      selectionState,
      sortState,
    },
    dispatchers: {
      listDispatcher,
      paginationDispatcher,
      selectionDispatcher,
      sortDispatcher,
    },
    ...injectedProps,
  } as AsyncListContextValue<InjectedProps, ListItemType>;

  const getListItems = React.useCallback(async () => {
    listDispatcher({ type: "loading" });
    const response = await load(context);

    if (response && "error" in response) {
      listDispatcher({ type: "error", payload: response });
    }

    if (response && "totalCount" in response && "items" in response) {
      listDispatcher({ type: "success", payload: response });
    }
  }, [
    sortState?.sortBy,
    sortState?.sortOrder,
    paginationState.page,
    paginationState.limit,
  ]);

  React.useEffect(() => {
    if (initialLoad) return;
    selectionDispatcher({ type: "none" });
  }, [sortState, paginationState]);

  React.useEffect(() => {
    if (initialLoad) return;
    paginationDispatcher({
      type: "update",
      payload: { ...paginationState, page: 0 },
    });
  }, [sortState]);

  React.useEffect(() => {
    if (initialLoad) return;
    paginationDispatcher({
      type: "update",
      payload: { ...paginationState, totalCount: listState.totalCount },
    });
  }, [listState.totalCount]);

  React.useEffect(() => {
    if (initialLoad) return;
    // console.log({ fetchingOnPaginationChanges: true });
    getListItems();
  }, [paginationState.page, paginationState.limit]);

  React.useEffect(() => {
    if (initialLoad) return;
    if (paginationState.page !== 0) return;
    // console.log({ fetchingOnSortingChanges: true });
    getListItems();
  }, [sortState?.sortBy, sortState?.sortOrder]);

  React.useEffect(() => {
    if (initialLoad) {
      // console.log({ fetchingOnInitialLoad: true });
      initialLoad = false;
      getListItems();
    }
  }, []);

  // React.useEffect(() => {
  //   console.log({ selectionState });
  // }, [selectionState]);

  return context;
};

export {
  _defaultListState as defaultListState,
  _defaultPaginationState as defaultPaginationState,
};
// import React from "react";

// import { WithUid } from "../DataGrid";

// export type LIST_ACTIONS<ListItemType extends object = {}> =
//   | { type: "loading" }
//   | { type: "error"; payload: Required<Pick<ListState<ListItemType>, "error">> }
//   | {
//       type: "success";
//       payload: Omit<ListState<ListItemType>, "isLoading" | "error">;
//     };

// export type ListItem<ListItemType extends object = {}> = WithUid &
//   ListItemType & { [Key: string]: React.ReactNode };

// export type ListState<ListItemType extends object = {}> = {
//   isLoading: boolean;
//   error?: Error;
//   totalCount: number;
//   items: ListItem<ListItemType>[];
// };

// export const listReducer = <ListItemType extends object = {}>(
//   state: ListState<ListItemType>,
//   action: LIST_ACTIONS<ListItemType>
// ): ListState<ListItemType> => {
//   switch (action.type) {
//     case "loading": {
//       return {
//         ...state,
//         isLoading: true,
//       };
//     }
//     case "error": {
//       return {
//         ...action.payload,
//         isLoading: false,
//         totalCount: 0,
//         items: [],
//       };
//     }
//     case "success": {
//       return {
//         ...action.payload,
//         isLoading: false,
//       };
//     }
//     default: {
//       return { ...state };
//     }
//   }
// };

// export type PAGINATION_ACTION =
//   | { type: "previous" }
//   | { type: "next" }
//   | { type: "update"; payload: PaginationState };

// export type PaginationState = {
//   totalCount: number;
//   limit: number;
//   page: number;
// };

// export const computeIsNextDisabled = (paginationState: PaginationState) => {
//   return (
//     (paginationState.page + 1) * paginationState.limit >=
//     paginationState.totalCount
//   );
// };

// export const computeIsPreviousDisabled = (paginationState: PaginationState) => {
//   return paginationState.page * paginationState.limit <= 0;
// };

// export const paginationReducer = (
//   state: PaginationState,
//   action: PAGINATION_ACTION
// ): PaginationState => {
//   switch (action.type) {
//     case "next": {
//       if (!computeIsNextDisabled(state))
//         return { ...state, page: state.page + 1 };
//       return { ...state };
//     }
//     case "previous": {
//       if (!computeIsPreviousDisabled(state))
//         return { ...state, page: state.page - 1 };
//       return { ...state };
//     }
//     case "update": {
//       return { ...action.payload };
//     }
//     default: {
//       return { ...state };
//     }
//   }
// };

// export type SELECTION_ACTION =
//   | {
//       type: "all" | "none";
//     }
//   | {
//       type: "item";
//       payload: { items: WithUid[]; uid: WithUid["uid"] };
//     };

// export type NoneSelected = undefined;
// export type SomeSelected = Set<WithUid["uid"]>;
// export type AllSelected = "all";
// export type SelectionState = NoneSelected | SomeSelected | AllSelected;

// export const normalizeSelectionNextState = (
//   selectionState: SomeSelected,
//   noOfItems: number
// ): SelectionState => {
//   switch (selectionState.size) {
//     case 0: {
//       return undefined;
//     }
//     case noOfItems: {
//       return "all";
//     }
//     default: {
//       return selectionState;
//     }
//   }
// };

// export const selectionReducer = (
//   state: SelectionState,
//   action: SELECTION_ACTION
// ): SelectionState => {
//   switch (action.type) {
//     case "none": {
//       return undefined;
//     }
//     case "item": {
//       if (!state) {
//         return new Set([action.payload.uid]);
//       }

//       if (state === "all") {
//         const intermediateNextState = new Set([
//           ...action.payload.items
//             .map((item) => item.uid)
//             .filter((uid) => uid !== action.payload.uid),
//         ]);

//         return normalizeSelectionNextState(
//           intermediateNextState,
//           action.payload.items.length
//         );
//       }

//       if (!state.has(action.payload.uid)) {
//         const intermediateNextState = new Set([...state, action.payload.uid]);

//         // console.log({ state, action, intermediateNextState });

//         return normalizeSelectionNextState(
//           intermediateNextState,
//           action.payload.items.length
//         );
//       }

//       const intermediateNextState = new Set(
//         [...state].filter((uid) => uid !== action.payload.uid)
//       );

//       return normalizeSelectionNextState(
//         intermediateNextState,
//         action.payload.items.length
//       );
//     }
//     case "all": {
//       return "all";
//     }
//     default: {
//       if (!state) return undefined;
//       if (state === "all") return "all";
//       return { ...state };
//     }
//   }
// };

// export type SORT_ACTION = {
//   type: "sort";
//   payload: Sorted;
// };

// export type Unsorted = undefined;
// export type Sorted = {
//   sortBy: string;
//   sortOrder: "asc" | "desc";
// };
// export type SortState = Unsorted | Sorted;

// export const sortReducer = (
//   state: SortState,
//   action: SORT_ACTION
// ): SortState => {
//   switch (action.type) {
//     case "sort": {
//       return { ...action.payload };
//     }
//     default: {
//       if (!state) return undefined;

//       return { ...state };
//     }
//   }
// };

// export type AsyncListContextValue<
//   InjectedProps extends unknown = unknown,
//   ListItemType extends object = {}
// > = InjectedProps & {
//   states: {
//     listState: ListState<ListItemType>;
//     paginationState: PaginationState;
//     selectionState: SelectionState;
//     sortState: SortState;
//   };
//   dispatchers: {
//     listDispatcher: React.Dispatch<LIST_ACTIONS<ListItemType>>;
//     paginationDispatcher: React.Dispatch<PAGINATION_ACTION>;
//     selectionDispatcher: React.Dispatch<SELECTION_ACTION>;
//     sortDispatcher: React.Dispatch<SORT_ACTION>;
//   };
// };

// export const AsyncListContext =
//   React.createContext<AsyncListContextValue | null>(null);

// export const useAsyncListContext = <
//   InjectedProps extends unknown = unknown,
//   ListItemType extends object = {}
// >() => {
//   const context = React.useContext(
//     AsyncListContext as unknown as React.Context<
//       AsyncListContextValue<InjectedProps, ListItemType>
//     >
//   );

//   if (!context)
//     throw new Error(
//       "Could not find the AsyncListContext. Make sure you have a AsyncListContext.Provider defined above the current component."
//     );

//   return context;
// };

// let initialLoad = true;

// const _defaultListState = {
//   totalCount: 0,
//   items: [],
//   isLoading: false,
// } satisfies ListState;
// const _defaultPaginationState = {
//   totalCount: 0,
//   page: 0,
//   limit: 5,
// } satisfies PaginationState;

// export type UseAsyncListProps<
//   InjectedProps extends unknown = unknown,
//   ListItemType extends object = {}
// > = {
//   load: (
//     context: AsyncListContextValue<InjectedProps, ListItemType>
//   ) => Promise<
//     | Omit<ListState<ListItemType>, "isLoading" | "error">
//     | Required<Pick<ListState<ListItemType>, "error">>
//   >;
//   defaultListState?: ListState<ListItemType>;
//   defaultPaginationState?: PaginationState;
// };

// export const useAsyncList = <
//   InjectedProps extends unknown = unknown,
//   ListItemType extends object = {}
// >({
//   load,
//   defaultListState = _defaultListState,
//   defaultPaginationState = _defaultPaginationState,
//   ...injectedProps
// }: UseAsyncListProps<InjectedProps, ListItemType>): AsyncListContextValue<
//   InjectedProps,
//   ListItemType
// > => {
//   const [listState, listDispatcher] = React.useReducer(
//     listReducer<ListItemType>,
//     defaultListState
//   );
//   const [paginationState, paginationDispatcher] = React.useReducer(
//     paginationReducer,
//     defaultPaginationState
//   );
//   const [selectionState, selectionDispatcher] = React.useReducer(
//     selectionReducer,
//     undefined
//   );
//   const [sortState, sortDispatcher] = React.useReducer(sortReducer, undefined);

//   const context = {
//     states: {
//       listState,
//       paginationState,
//       selectionState,
//       sortState,
//     },
//     dispatchers: {
//       listDispatcher,
//       paginationDispatcher,
//       selectionDispatcher,
//       sortDispatcher,
//     },
//     ...injectedProps,
//   } as AsyncListContextValue<InjectedProps, ListItemType>;

//   const getListItems = React.useCallback(async () => {
//     listDispatcher({ type: "loading" });
//     const response = await load(context);

//     if (response && "error" in response) {
//       listDispatcher({ type: "error", payload: response });
//     }

//     if (response && "totalCount" in response && "items" in response) {
//       listDispatcher({ type: "success", payload: response });
//     }
//   }, [
//     sortState?.sortBy,
//     sortState?.sortOrder,
//     paginationState.page,
//     paginationState.limit,
//   ]);

//   React.useEffect(() => {
//     if (initialLoad) return;
//     selectionDispatcher({ type: "none" });
//   }, [sortState, paginationState]);

//   React.useEffect(() => {
//     if (initialLoad) return;
//     paginationDispatcher({
//       type: "update",
//       payload: { ...paginationState, page: 0 },
//     });
//   }, [sortState]);

//   React.useEffect(() => {
//     if (initialLoad) return;
//     paginationDispatcher({
//       type: "update",
//       payload: { ...paginationState, totalCount: listState.totalCount },
//     });
//   }, [listState.totalCount]);

//   React.useEffect(() => {
//     if (initialLoad) return;
//     // console.log({ fetchingOnPaginationChanges: true });
//     getListItems();
//   }, [paginationState.page, paginationState.limit]);

//   React.useEffect(() => {
//     if (initialLoad) return;
//     if (paginationState.page !== 0) return;
//     // console.log({ fetchingOnSortingChanges: true });
//     getListItems();
//   }, [sortState?.sortBy, sortState?.sortOrder]);

//   React.useEffect(() => {
//     if (initialLoad) {
//       // console.log({ fetchingOnInitialLoad: true });
//       initialLoad = false;
//       getListItems();
//     }
//   }, []);

//   // React.useEffect(() => {
//   //   console.log({ selectionState });
//   // }, [selectionState]);

//   return context;
// };

// export {
//   _defaultListState as defaultListState,
//   _defaultPaginationState as defaultPaginationState,
// };
