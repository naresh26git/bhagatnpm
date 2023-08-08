import React from "react";

export type CalendarProps = JSX.IntrinsicElements["table"] & any;

export const Calendar = (props: CalendarProps) => {
  const { state, dispatcher, ...restOfProps } = props;

  React.useEffect(() => {
    if (state.isMouseDown) return;

    if (!state.startSlot && !state.endSlot) return;

    const start = Math.min(
      state.startSlot?.date.getTime(),
      state.endSlot?.date.getTime()
    );
    const end = Math.max(
      state.endSlot?.date.getTime(),
      state.startSlot?.date.getTime()
    );
    alert(`${new Date(start)} to ${new Date(end)} slot selected.`);
    dispatcher({ type: "set-start-slot", payload: undefined });
    dispatcher({ type: "set-end-slot", payload: undefined });
  }, [state.isMouseDown]);

  React.useEffect(() => {
    document.onmouseup = () => {
      dispatcher({ type: "mouse-down", payload: false });
    };

    return () => {
      document.onmouseup = () => {};
    };
  }, []);

  return (
    <CalendarContext.Provider value={props}>
      <table
        {...restOfProps}
        className="table table-hover"
        style={{ height: "100%", width: "100%", position: "relative" }}
      >
        <TableHead />
        <TableBody />
      </table>
    </CalendarContext.Provider>
  );
};

export const getColumns = (props: CalendarProps) => {
  switch (props.state.view) {
    case "day": {
      const date = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
      }).format(props.state.date);
      const day = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      }).format(props.state.date);

      return [
        {
          date,
          day,
        },
      ];
    }
    case "week": {
      const curr = new Date(new Date(props.state.date).setHours(0, 0, 0, 0));
      const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
      // const last = first + 6; // last day is the first day + 6

      const firstDayOfWeek = new Date(curr.setDate(first));
      // const lastDayOfWeek = new Date(curr.setDate(last));

      const dates = new Array(7).fill(undefined).map((_, index) => {
        const computedDate = new Date(
          new Date().setDate(firstDayOfWeek.getDate() + index)
        );

        const date = new Intl.DateTimeFormat("en-US", {
          day: "numeric",
        }).format(computedDate);
        const day = new Intl.DateTimeFormat("en-US", {
          weekday: "long",
        }).format(computedDate);

        return {
          date,
          day,
        };
      });

      return dates;
    }
    default: {
      throw new Error(`"${props.state.view}" view not supported`);
    }
  }
};

export const TableHead = () => {
  const props = useCalendarContext();
  const columns = getColumns(props);

  return (
    <thead>
      <tr>
        <th
          style={{
            zIndex: 1,
            width: "10%",
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            boxShadow: "0 1px 0px rgba(0, 0, 0, 0.4)",
            userSelect: "none",
          }}
        >
          <div>Timings</div>
        </th>
        {columns?.map((day) => (
          <th
            key={day.date}
            style={{
              zIndex: 1,
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              boxShadow: "0 1px 0px rgba(0, 0, 0, 0.4)",
              userSelect: "none",
            }}
          >
            <div>
              <div>{day.date}</div>
              <div>{day.day}</div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export const TableBody = () => {
  const props = useCalendarContext();
  const columns = getColumns(props);
  const rows = new Array(24 * 2).fill(undefined);

  return (
    <tbody>
      {rows.map((_, rowIndex) => {
        const halfHourlyTime = new Date(
          new Date().setHours(0, 30 * rowIndex, 0, 0)
        );

        return (
          <tr key={halfHourlyTime.toString()}>
            {rowIndex % 2 === 0 ? (
              <td style={{ width: "10%", userSelect: "none" }} rowSpan={2}>
                {new Intl.DateTimeFormat("en-US", {
                  hour: "numeric",
                }).format(halfHourlyTime)}
              </td>
            ) : null}
            {columns?.map((day, columnIndex) => (
              <SlotCell
                key={halfHourlyTime.toString()}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                date={halfHourlyTime}
                uid={new Intl.DateTimeFormat("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                }).format(halfHourlyTime)}
              />
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export type SlotCellProps = Slot & {
  uid: string;
};

export const SlotCell = (props: SlotCellProps) => {
  const { state, dispatcher } = useCalendarContext();
  const ref = React.useRef<HTMLTableCellElement>(null);

  return (
    <td
      ref={ref}
      id="slot"
      style={{
        cursor: "cell",
        height: 30,
        width: "100%",
        padding: 0,
        backgroundColor:
          props.columnIndex === state.startSlot?.columnIndex &&
          props.columnIndex === state.endSlot?.columnIndex &&
          props.rowIndex >=
            Math.min(state.startSlot?.rowIndex, state.endSlot?.rowIndex) &&
          props.rowIndex <=
            Math.max(state.endSlot?.rowIndex, state.startSlot?.rowIndex)
            ? "lightblue"
            : "unset",
      }}
      onMouseDown={() => {
        dispatcher({ type: "mouse-down", payload: true });
        dispatcher({ type: "set-start-slot", payload: undefined });
        dispatcher({ type: "set-end-slot", payload: undefined });
        dispatcher({
          type: "set-start-slot",
          payload: props,
        });
        return false;
      }}
      onMouseOver={() => {
        if (state.startSlot?.columnIndex !== props.columnIndex) return;
        if (!state.isMouseDown) return;
        dispatcher({ type: "set-end-slot", payload: undefined });
        dispatcher({
          type: "set-end-slot",
          payload: props,
        });
      }}
    ></td>
  );
};

export default Calendar;

export const CalendarContext = React.createContext<any | null>(null);

export const useCalendarContext = () => {
  const context = React.useContext(CalendarContext);

  if (!context)
    throw new Error(
      "Could not find the CalendarContext. Make sure you have a CalendarContext.Provider defined above the current component."
    );

  return context;
};

export type ACTIONS =
  | {
      type: "mouse-down";
      payload: State["isMouseDown"];
    }
  | {
      type: "set-start-slot";
      payload: State["startSlot"];
    }
  | {
      type: "set-end-slot";
      payload: State["endSlot"];
    };

export type Slot = {
  columnIndex: number;
  rowIndex: number;
  date: Date;
};

export type State = {
  view: "day" | "week";
  date: Date;
  isMouseDown: boolean;
  startSlot: undefined | Slot;
  endSlot: undefined | Slot;
};

export const reducer = (state: State, action: ACTIONS): State => {
  switch (action.type) {
    case "mouse-down": {
      return { ...state, isMouseDown: action.payload };
    }

    case "set-start-slot": {
      return { ...state, startSlot: action.payload };
    }

    case "set-end-slot": {
      return { ...state, endSlot: action.payload };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export const useCalendar = (): any => {
  const [state, dispatcher] = React.useReducer(reducer, {
    view: "week",
    date: new Date(),
    isMouseDown: false,
    startSlot: undefined,
    endSlot: undefined,
  });

  return { state, dispatcher };
};
