import { Leave } from "server/dist/trpc/routes/leaves/get-many";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { useAsyncList } from "ui/hooks/UseAsyncList";
import { useAuthContext } from "../../hooks/UseAuth";
import { client } from "../../main";
import { handleTRPCError } from "../../utils/handle-trpc-error";

export type LeaveItem = {
  uid: string;
  empcode: string;
  leavetype: string;
  availableunits: string;
  balanceunits: string;
  underapproval: string;
};

export const leaveBalance = {
  uid: "1",
  empcode: "1210",
  leavetype: "Sick Leave",
  availableunits: "50",
  balanceunits: "40",
  underapproval: "Pending",
};

export const leaveBalances = [
  leaveBalance,
  { ...leaveBalance, uid: "2" },
  { ...leaveBalance, uid: "3" },
  { ...leaveBalance, uid: "4" },
  { ...leaveBalance, uid: "5" },
  { ...leaveBalance, uid: "6" },
  { ...leaveBalance, uid: "7" },
  { ...leaveBalance, uid: "8" },
  { ...leaveBalance, uid: "9" },
  { ...leaveBalance, uid: "10" },
  { ...leaveBalance, uid: "11" },
  { ...leaveBalance, uid: "12" },
  { ...leaveBalance, uid: "13" },
];

export type LeaveBalancePageProps = {};

export const LeaveBalancePage = () => {
  const auth = useAuthContext();

  const value = useAsyncList<Leave>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };

        console.log({ inputParameters });

        const result = await client.leave.getMany.mutate(inputParameters);

        console.log({ result });

        return {
          totalCount: result.totalCount,
          items: result.items as any,
        };
      } catch (error) {
        console.log(error);

        handleTRPCError(error, auth);

        return { error: new Error("Something went wrong") };
      }
    },
  });
  return (
    <Stack gap="3">
      {/* <Grid.Row>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Leave Type"
          />
        </Grid.Col>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <Button variant="primary" className="w-100">
            Search
          </Button>
        </Grid.Col>
      </Grid.Row> */}
      {/* <PageHeader title={<PageHeader.Title>Balance</PageHeader.Title>} /> */}
      <Card>
        <DataGrid<Leave>
          {...value}
          columns={[
            // {
            //   id: "1",
            //   key: "userId",
            //   label: "ID",
            //   sortOrder:
            //     value.states.sortState?.sortBy === "userId" &&
            //     value.states.sortState.sortOrder
            //       ? value.states.sortState.sortOrder
            //       : undefined,
            //   options: [
            //     {
            //       id: "1",
            //       as: "button",
            //       icon: "↑",
            //       label: "Sort by ASC",
            //       disabled:
            //         value.states.sortState?.sortBy === "userId" &&
            //         value.states.sortState.sortOrder === "asc",
            //       onClick: () => {
            //         value.dispatchers.sortDispatcher({
            //           type: "sort",
            //           payload: { sortBy: "userId", sortOrder: "asc" },
            //         });
            //       },
            //     },
            //     {
            //       id: "2",
            //       as: "button",
            //       icon: "↓",
            //       label: "Sort by DESC",
            //       disabled:
            //         value.states.sortState?.sortBy === "userId" &&
            //         value.states.sortState.sortOrder === "desc",
            //       onClick: () => {
            //         value.dispatchers.sortDispatcher({
            //           type: "sort",
            //           payload: { sortBy: "userId", sortOrder: "desc" },
            //         });
            //       },
            //     },
            //   ],
            // },
            {
              id: "2",
              key: "",
              label: "Emp Name",
              renderCell: (item) => (
                <>
                  {item.user.personalInfo
                    ? `${item.user.personalInfo.firstName} ${item.user.personalInfo.lastName}`
                    : ""}
                </>
              ),
              sortOrder:
                value.states.sortState?.sortBy === "status" &&
                value.states.sortState.sortOrder
                  ? value.states.sortState.sortOrder
                  : undefined,
              options: [
                {
                  id: "1",
                  as: "button",
                  icon: "↑",
                  label: "Sort by ASC",
                  disabled:
                    value.states.sortState?.sortBy === "status" &&
                    value.states.sortState.sortOrder === "asc",
                  onClick: () => {
                    value.dispatchers.sortDispatcher({
                      type: "sort",
                      payload: { sortBy: "status", sortOrder: "asc" },
                    });
                  },
                },
                {
                  id: "2",
                  as: "button",
                  icon: "↓",
                  label: "Sort by DESC",
                  disabled:
                    value.states.sortState?.sortBy === "status" &&
                    value.states.sortState.sortOrder === "desc",
                  onClick: () => {
                    value.dispatchers.sortDispatcher({
                      type: "sort",
                      payload: { sortBy: "status", sortOrder: "desc" },
                    });
                  },
                },
              ],
            },
            {
              id: "3",
              key: "",
              label: "Leave Type",
              renderCell: (item) => <>{item.leaveType.name}</>,
            },
            {
              id: "4",
              key: "",
              label: "Available Units",
              renderCell: (item) => <>{item.leaveType.daysAlloted}</>,
            },
            {
              id: "5",
              key: "",
              label: "Balance Units",
              renderCell: (item) => (
                <>
                  {Number(item.leaveType.daysAlloted) - Number(item.noOfDays)}
                </>
              ),
            },
            {
              id: "6",
              key: "",
              label: "Status",
              renderCell: (item) => (
                <Typography
                  transform="capitalize"
                  color={
                    item.status.name === "accepted"
                      ? "success"
                      : item.status.name === "rejected"
                      ? "danger"
                      : "warning"
                  }
                >
                  {item.status.name}
                </Typography>
              ),
            },
          ]}
        />
      </Card>
    </Stack>
  );
};

export default LeaveBalancePage;

// import { Leave } from "server/dist/trpc/routes/leaves/get-many";
// import Card from "ui/Card";
// import DataGrid from "ui/DataGrid";
// import Stack from "ui/Stack";
// import Typography from "ui/Typography";
// import { useAsyncList } from "ui/hooks/UseAsyncList";
// import PageHeader from "../../components/PageHeader";
// import { useAuthContext } from "../../hooks/UseAuth";
// import { client } from "../../main";
// import { handleTRPCError } from "../../utils/handle-trpc-error";
// export type LeaveItem = {
//   uid: string;
//   empcode: string;
//   leavetype: string;
//   availableunits: string;
//   balanceunits: string;
//   underapproval: string;
// };

// export const leaveBalance = {
//   uid: "1",
//   empcode: "1210",
//   leavetype: "Sick Leave",
//   availableunits: "50",
//   balanceunits: "40",
//   underapproval: "Pending",
// };

// export const leaveBalances = [
//   leaveBalance,
//   { ...leaveBalance, uid: "2" },
//   { ...leaveBalance, uid: "3" },
//   { ...leaveBalance, uid: "4" },
//   { ...leaveBalance, uid: "5" },
//   { ...leaveBalance, uid: "6" },
//   { ...leaveBalance, uid: "7" },
//   { ...leaveBalance, uid: "8" },
//   { ...leaveBalance, uid: "9" },
//   { ...leaveBalance, uid: "10" },
//   { ...leaveBalance, uid: "11" },
//   { ...leaveBalance, uid: "12" },
//   { ...leaveBalance, uid: "13" },
// ];

// export type LeaveBalancePageProps = {};

// export const LeaveBalancePage = () => {
//   const auth = useAuthContext();

//   const value = useAsyncList<Leave>({
//     load: async ({ states }) => {
//       try {
//         const inputParameters = {
//           sortBy: states.sortState?.sortBy,
//           sortOrder: states.sortState?.sortOrder,
//           limit: states.paginationState.limit,
//           page: states.paginationState.page,
//         };

//         console.log({ inputParameters });

//         const result = await client.leave.getMany.mutate(inputParameters);

//         return {
//           totalCount: result.totalCount,
//           // TODO: Fix this temporary any
//           items: result.items as any,
//         };
//       } catch (error) {
//         console.log(error);

//         handleTRPCError(error, auth);

//         return { error: new Error("Something went wrong") };
//       }
//     },
//   });
//   return (
//     <Stack gap="3">
//       <PageHeader title={<PageHeader.Title>Balance</PageHeader.Title>} />
//       <Card>
//         <DataGrid<Leave>
//           {...value}
//           columns={[
//             // {
//             //   id: "1",
//             //   key: "userId",
//             //   label: "ID",
//             //   sortOrder:
//             //     value.states.sortState?.sortBy === "userId" &&
//             //     value.states.sortState.sortOrder
//             //       ? value.states.sortState.sortOrder
//             //       : undefined,
//             //   options: [
//             //     {
//             //       id: "1",
//             //       as: "button",
//             //       icon: "↑",
//             //       label: "Sort by ASC",
//             //       disabled:
//             //         value.states.sortState?.sortBy === "userId" &&
//             //         value.states.sortState.sortOrder === "asc",
//             //       onClick: () => {
//             //         value.dispatchers.sortDispatcher({
//             //           type: "sort",
//             //           payload: { sortBy: "userId", sortOrder: "asc" },
//             //         });
//             //       },
//             //     },
//             //     {
//             //       id: "2",
//             //       as: "button",
//             //       icon: "↓",
//             //       label: "Sort by DESC",
//             //       disabled:
//             //         value.states.sortState?.sortBy === "userId" &&
//             //         value.states.sortState.sortOrder === "desc",
//             //       onClick: () => {
//             //         value.dispatchers.sortDispatcher({
//             //           type: "sort",
//             //           payload: { sortBy: "userId", sortOrder: "desc" },
//             //         });
//             //       },
//             //     },
//             //   ],
//             // },
//             {
//               id: "2",
//               key: "",
//               label: "Emp Name",
//               renderCell: (item) => (
//                 <>
//                   {item.user.personalInfo
//                     ? `${item.user.personalInfo.firstName} ${item.user.personalInfo.lastName}`
//                     : ""}
//                 </>
//               ),
//             },
//             {
//               id: "3",
//               key: "",
//               label: "Leave Type",
//               renderCell: (item) => <>{item.leaveType.name}</>,
//             },
//             {
//               id: "4",
//               key: "",
//               label: "Available Units",
//               renderCell: (item) => <>{item.leaveType.daysAlloted}</>,
//             },
//             {
//               id: "5",
//               key: "",
//               label: "Balance Units",
//               renderCell: (item) => (
//                 <>
//                   {Number(item.leaveType.daysAlloted) - Number(item.noOfDays)}
//                 </>
//               ),
//             },
//             {
//               id: "6",
//               key: "",
//               label: "Status",
//               renderCell: (item) => (
//                 <Typography transform="capitalize">
//                   {item.status.name}
//                 </Typography>
//               ),
//               // sortOrder:
//               //   value.states.sortState?.sortBy === "status" &&
//               //   value.states.sortState.sortOrder
//               // ? value.states.sortState.sortOrder
//               //     : undefined,
//               // options: [
//               //   {
//               //     id: "1",
//               //     as: "button",
//               //     icon: "↑",
//               //     label: "Sort by ASC",
//               //     disabled:
//               //       value.states.sortState?.sortBy === "status" &&
//               //       value.states.sortState.sortOrder === "asc",
//               //     onClick: () => {
//               //       value.dispatchers.sortDispatcher({
//               //         type: "sort",
//               //         payload: { sortBy: "status", sortOrder: "asc" },
//               //       });
//               //     },
//               //   },
//               //   {
//               //     id: "2",
//               //     as: "button",
//               //     icon: "↓",
//               //     label: "Sort by DESC",
//               //     disabled:
//               //       value.states.sortState?.sortBy === "status" &&
//               //       value.states.sortState.sortOrder === "desc",
//               //     onClick: () => {
//               //       value.dispatchers.sortDispatcher({
//               //         type: "sort",
//               //         payload: { sortBy: "status", sortOrder: "desc" },
//               //       });
//               //     },
//               //   },
//               // ],
//             },
//           ]}
//         />
//       </Card>
//     </Stack>
//   );
// };

// export default LeaveBalancePage;
