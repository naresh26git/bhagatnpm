import {
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Box from "./Box";
import Button from "./Button";
import Checkbox, { CheckboxIndeterminateHandle } from "./Checkbox";
import Menu, { MenuProps } from "./Menu";
import {
  AsyncListContext,
  AsyncListContextValue,
  ListItem,
  PaginationState,
  SelectionState,
  computeIsNextDisabled,
  computeIsPreviousDisabled,
  useAsyncListContext,
} from "./hooks/UseAsyncList";

export type WithId = {
  id: string | number;
};

export type WithUid = {
  uid: string | number;
};

export type ColumnDefinition<ListItemType extends object = {}> = WithId &
  Partial<Pick<MenuProps, "options">> & {
    key: string;
    label: React.ReactNode;
    sortOrder?: undefined | "asc" | "desc";
    renderCell?: (item: ListItem<ListItemType>) => JSX.Element;
  };

export type DataGridProps<ListItemType extends object = {}> =
  AsyncListContextValue & {
    columns: ColumnDefinition<ListItemType>[];
    allowSelection?: boolean;
    defaultSelection?: WithUid["uid"][];
    onSelection?: (selectionState: SelectionState) => void;
    onRowClick?: (item: ListItemType) => void;
  };

export const DataGrid = <ListItemType extends object = {}>(
  props: DataGridProps<ListItemType>
) => {
  React.useEffect(() => {
    if (props.onSelection) props.onSelection(props.states.selectionState);
  }, [props.states.selectionState]);

  return (
    <AsyncListContext.Provider value={props}>
      <Table />
    </AsyncListContext.Provider>
  );
};

export const Table = () => {
  const props = useAsyncListContext<DataGridProps>();

  const domProps = { ...props } as Partial<DataGridProps>;
  delete domProps.states;
  delete domProps.dispatchers;
  delete domProps.allowSelection;
  delete domProps.columns;
  delete domProps.defaultSelection;
  delete domProps.onRowClick;
  delete domProps.onSelection;

  return (
    <Box as="div" className="overflow-auto">
      <Box
        as="table"
        className="table table-striped table-hover mb-0"
        {...domProps}
      >
        <TableHeader />
        <TableBody />
        <TablePagination />
      </Box>
    </Box>
  );
};

export const SelectAllRowsCell = () => {
  const checkboxRef = React.useRef<CheckboxIndeterminateHandle>(null);

  const props = useAsyncListContext<DataGridProps>();

  const isAllRowsSelected = props.states.selectionState === "all";
  const isNoneRowsSelected = props.states.selectionState === undefined;

  React.useEffect(() => {
    if (checkboxRef.current && (isAllRowsSelected || isNoneRowsSelected)) {
      checkboxRef.current.indeterminateOff();
      return;
    }

    if (checkboxRef.current) {
      checkboxRef.current.indeterminateOn();
      return;
    }
  }, [props.states.selectionState]);

  return props.allowSelection ? (
    <Box as="th" scope="col" style={{ maxWidth: "fit-content" }}>
      <Checkbox
        ref={checkboxRef}
        name="selectAllRows"
        checked={isAllRowsSelected}
        onClick={() => {
          if (isAllRowsSelected)
            return props.dispatchers.selectionDispatcher({ type: "none" });
          return props.dispatchers.selectionDispatcher({ type: "all" });
        }}
      />
    </Box>
  ) : null;
};

const getColumnLabelWithSortIndicator = ({
  label,
  sortOrder,
}: Pick<ColumnDefinition, "label" | "sortOrder">) => {
  return (
    <Box as="span" className="text-nowrap">
      {label} {sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : ""}
    </Box>
  );
};

export const TableHeader = () => {
  const props = useAsyncListContext<DataGridProps>();

  const { columns } = props;
  return (
    <Box as="thead">
      <Box as="tr" tabIndex={0}>
        <SelectAllRowsCell />
        {columns.map(({ id, label, options, sortOrder: sort }) => (
          <Box as="th" key={id} scope="col" tabIndex={0}>
            {options?.length ? (
              <>
                <Box
                  as="div"
                  className="d-flex gap-2 justify-content-between align-items-end"
                >
                  {getColumnLabelWithSortIndicator({ label, sortOrder: sort })}
                  <Menu
                    dropdown={<Menu.Dropdown />}
                    trigger={<Menu.Trigger size="sm" />}
                    {...{ options, name: label }}
                  />
                </Box>
              </>
            ) : (
              <Box
                as="div"
                className="d-flex gap-2 justify-content-between align-items-end"
              >
                {label}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const computeIsRowSelected = (
  selectionState: SelectionState,
  rowUid: WithUid["uid"]
) => {
  return selectionState instanceof Set && selectionState.has(rowUid);
};

export type SelectRowCellProps = {
  uid: WithUid["uid"];
};

export const SelectRowCell = ({ uid }: SelectRowCellProps) => {
  const props = useAsyncListContext<DataGridProps>();

  const isAllRowsSelected = computeIsAllRowsSelected(
    props.states.selectionState
  );
  const isRowSelected = computeIsRowSelected(props.states.selectionState, uid);

  return props.allowSelection ? (
    <Box as="td" scope="row" style={{ maxWidth: "fit-content" }}>
      <Checkbox
        name="selectRow"
        checked={isAllRowsSelected || isRowSelected}
        style={{ marginRight: 8 }}
        onClick={() => {
          props.dispatchers.selectionDispatcher({
            type: "item",
            payload: { items: props.states.listState.items, uid },
          });
        }}
      />
    </Box>
  ) : null;
};

const getTableBodyClasses = (
  props: AsyncListContextValue & DataGridProps,
  uid: WithUid["uid"]
) => {
  const isAllRowsSelected = computeIsAllRowsSelected(
    props.states.selectionState
  );
  const isRowSelected = computeIsRowSelected(props.states.selectionState, uid);

  return `${isAllRowsSelected || isRowSelected ? "table-info" : ""}`;
};

export const TableBody = () => {
  const props = useAsyncListContext<DataGridProps>();

  return (
    <Box as="tbody">
      {props.states.listState.items.map((item, itemIndex) => (
        <Box
          as="tr"
          key={item.uid}
          className={getTableBodyClasses(props, item.uid)}
          tabIndex={0}
          onClick={() => props.onRowClick?.(item)}
        >
          <SelectRowCell
            {...{
              uid: item.uid,
            }}
          />
          {props.columns.map((column) => (
            <Box
              as="td"
              key={column.id}
              scope={!props.allowSelection && itemIndex === 0 ? "row" : ""}
              tabIndex={0}
            >
              {column.renderCell ? column.renderCell(item) : item[column.key]}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export const computeIsAllRowsSelected = (selectionState: SelectionState) => {
  return selectionState === "all";
};

export const computeIsNoneRowsSelected = (selectionState: SelectionState) => {
  return selectionState === undefined;
};

export const computeIsSomeRowsSelected = (selectionState: SelectionState) => {
  return selectionState instanceof Set;
};

export const computeIsMultipleRowsSelected = (
  selectionState: SelectionState,
  noOfRows: number
) => {
  if (computeIsAllRowsSelected(selectionState) && noOfRows > 1) return true;
  return selectionState instanceof Set && selectionState.size > 1;
};

const computeNumberOfRowsSelectedText = (
  props: AsyncListContextValue<DataGridProps>
) => {
  const isNoneRowsSelected = computeIsNoneRowsSelected(
    props.states.selectionState
  );
  const isAllRowsSelected = computeIsAllRowsSelected(
    props.states.selectionState
  );

  return isNoneRowsSelected
    ? ""
    : `${
        isAllRowsSelected
          ? props.states.listState.items.length
          : (props.states.selectionState as Set<string>).size
      } row${
        computeIsMultipleRowsSelected(
          props.states.selectionState,
          props.states.listState.items.length
        )
          ? "s"
          : ""
      } selected`;
};

const computeNumberOfColumns = (props: DataGridProps) => {
  return props.columns.length + (props.allowSelection ? 1 : 0);
};

export const TablePagination = () => {
  const props = useAsyncListContext<DataGridProps>();

  return (
    <Box as="tfoot">
      <Box as="tr" tabIndex={0}>
        <Box
          as="td"
          colSpan={computeNumberOfColumns(props)}
          scope="row"
          tabIndex={0}
          className="border-bottom-0"
        >
          <Pagination
            {...{
              title: computeNumberOfRowsSelectedText(props),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

const getRowStart = (paginationState: PaginationState) => {
  return paginationState.page * paginationState.limit + 1;
};

const getRowEnd = (paginationState: PaginationState) => {
  return Math.min(
    paginationState.totalCount,
    paginationState.page * paginationState.limit + paginationState.limit
  );
};

const computeCurrentPageInfo = (paginationState: PaginationState) => {
  const rowStart = getRowStart(paginationState);
  const rowEnd = getRowEnd(paginationState);

  return `${rowStart} - ${rowEnd} of ${paginationState.totalCount}`;
};

export type PaginationProps = {
  title: React.ReactNode;
};

export const Pagination = ({ title }: PaginationProps) => {
  const props = useAsyncListContext<DataGridProps>();

  const currentPageInfo = computeCurrentPageInfo(props.states.paginationState);
  const isPreviousDisabled = computeIsPreviousDisabled(
    props.states.paginationState
  );
  const isNextDisabled = computeIsNextDisabled(props.states.paginationState);

  return (
    <Box
      as="div"
      className={`d-flex gap-2 ${
        title ? "justify-content-between" : "justify-content-end"
      } align-items-center`}
    >
      {title}
      <Box as="div" className="d-flex gap-2 align-items-center">
        {currentPageInfo}
        <Button
          disabled={isPreviousDisabled}
          onClick={
            !isPreviousDisabled
              ? () => {
                  props.dispatchers.paginationDispatcher({ type: "previous" });
                }
              : undefined
          }
          tabIndex={0}
          size="sm"
        >
          <FontAwesomeIcon icon={faBackwardStep} />
        </Button>
        <Button
          disabled={isNextDisabled}
          onClick={
            !isNextDisabled
              ? () => {
                  props.dispatchers.paginationDispatcher({ type: "next" });
                }
              : undefined
          }
          tabIndex={0}
          size="sm"
        >
          <FontAwesomeIcon icon={faForwardStep} />
        </Button>
      </Box>
    </Box>
  );
};

export default DataGrid;
