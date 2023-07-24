import { Leave } from "server/dist/trpc/routes/leaves/get-many";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { useAsyncList } from "ui/hooks/UseAsyncList";
import { useAuthContext } from "../../hooks/UseAuth";
import { client } from "../../main";
import { handleTRPCError } from "../../utils/handle-trpc-error";

export type LeaveList = {
  uid: string;
  empcode: string;
  empname: string;
  leavetype: string;
  fromdate: string;
  todate: string;
  status: string;
  remarks: string;
};

export const leave = {
  uid: "1",
  empcode: "1210",
  empname: "Vishnupriya",
  fromdate: "18/04/2023",
  todate: "20/04/2023",
  leavetype: "Sick Leave",
  Status: "Pending",
  remarks: "Kindly consider",
};

export const leaves = [
  leave,
  { ...leave, uid: "2" },
  { ...leave, uid: "3" },
  { ...leave, uid: "4" },
  { ...leave, uid: "5" },
  { ...leave, uid: "6" },
  { ...leave, uid: "7" },
  { ...leave, uid: "8" },
  { ...leave, uid: "9" },
  { ...leave, uid: "10" },
  { ...leave, uid: "11" },
  { ...leave, uid: "12" },
  { ...leave, uid: "13" },
];
export type LeaveViewPageProps = {};

export const LeaveViewPage = () => {
  const auth = useAuthContext();

  const value = useAsyncList<Leave>({
    load: async ({ states }) => {
      try {
        // const result = await client.leave.getMany.mutate({
        //   sortBy: states.sortState?.sortBy,
        //   sortOrder: states.sortState?.sortOrder,
        //   limit: states.paginationState.limit,
        //   page: states.paginationState.page,
        // });
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
            placeholder="From"
          />
        </Grid.Col>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="To"
          />
        </Grid.Col>
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
      {/* <PageHeader title={<PageHeader.Title>Leaves</PageHeader.Title>} /> */}
      <Card>
        <DataGrid<Leave>
          {...value}
          columns={[
            // {
            //   id: "1",
            //   key: "userId",
            //   label: "Empcode",
            // },
            {
              id: "2",
              key: "",
              label: "Emp Name",
              renderCell: (item) => <>{item.user.name}</>,
            },
            {
              id: "3",
              key: "",
              label: "From Date",
              renderCell: (item) => (
                <>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "numeric",
                    year: "numeric",
                    day: "numeric",
                  }).format(new Date(item.fromDate))}
                </>
              ),
            },
            {
              id: "4",
              key: "todate",
              label: "To Date",
              renderCell: (item) => (
                <>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "numeric",
                    year: "numeric",
                    day: "numeric",
                  }).format(new Date(item.toDate))}
                </>
              ),
            },
            {
              id: "5",
              key: "",
              label: "Category",
              renderCell: (item) => <>{item.leaveType.name}</>,
            },
            {
              id: "6",
              key: "remarks",
              label: "Remarks",
            },
            {
              id: "7",
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
              sortOrder:
                value.states.sortState?.sortBy === "statusId" &&
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
                    value.states.sortState?.sortBy === "statusId" &&
                    value.states.sortState.sortOrder === "asc",
                  onClick: () => {
                    value.dispatchers.sortDispatcher({
                      type: "sort",
                      payload: { sortBy: "statusId", sortOrder: "asc" },
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
          ]}
        />
      </Card>
    </Stack>
  );
};
export default LeaveViewPage;

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
// export type LeaveList = {
//   uid: string;
//   empcode: string;
//   empname: string;
//   leavetype: string;
//   fromdate: string;
//   todate: string;
//   status: string;
//   remarks: string;
// };

// export const leave = {
//   uid: "1",
//   empcode: "1210",
//   empname: "Vishnupriya",
//   fromdate: "18/04/2023",
//   todate: "20/04/2023",
//   leavetype: "Sick Leave",
//   Status: "Pending",
//   remarks: "Kindly consider",
// };

// export const leaves = [
//   leave,
//   { ...leave, uid: "2" },
//   { ...leave, uid: "3" },
//   { ...leave, uid: "4" },
//   { ...leave, uid: "5" },
//   { ...leave, uid: "6" },
//   { ...leave, uid: "7" },
//   { ...leave, uid: "8" },
//   { ...leave, uid: "9" },
//   { ...leave, uid: "10" },
//   { ...leave, uid: "11" },
//   { ...leave, uid: "12" },
//   { ...leave, uid: "13" },
// ];
// export type LeaveViewPageProps = {};

// export const LeaveViewPage = () => {
//   const auth = useAuthContext();

//   const value = useAsyncList<Leave>({
//     load: async ({ states }) => {
//       try {
//         const result = await client.leave.getMany.mutate({
//           sortBy: states.sortState?.sortBy,
//           sortOrder: states.sortState?.sortOrder,
//           limit: states.paginationState.limit,
//           page: states.paginationState.page,
//         });

//         return {
//           totalCount: result.totalCount,
//           // TODO: Fix this temporary any
//           items: result.items as any,
//         };
//       } catch (error) {
//         handleTRPCError(error, auth);

//         return { error: new Error("Something went wrong") };
//       }
//     },
//   });
//   return (
//     <Stack gap="3">
//       <PageHeader title={<PageHeader.Title>Leaves</PageHeader.Title>} />
//       <Card>
//         <DataGrid<Leave>
//           {...value}
//           columns={[
//             // {
//             //   id: "1",
//             //   key: "userId",
//             //   label: "Empcode",
//             // },
//             {
//               id: "2",
//               key: "",
//               label: "Emp Name",
//               renderCell: (item) => <>{item.user.name}</>,
//             },
//             {
//               id: "3",
//               key: "",
//               label: "From Date",
//               renderCell: (item) => (
//                 <>
//                   {new Intl.DateTimeFormat("en-US", {
//                     month: "numeric",
//                     year: "numeric",
//                     day: "numeric",
//                   }).format(new Date(item.fromDate))}
//                 </>
//               ),
//             },
//             {
//               id: "4",
//               key: "todate",
//               label: "To Date",
//               renderCell: (item) => (
//                 <>
//                   {new Intl.DateTimeFormat("en-US", {
//                     month: "numeric",
//                     year: "numeric",
//                     day: "numeric",
//                   }).format(new Date(item.toDate))}
//                 </>
//               ),
//             },
//             {
//               id: "5",
//               key: "",
//               label: "Category",
//               renderCell: (item) => <>{item.leaveType.name}</>,
//             },
//             {
//               id: "6",
//               key: "remarks",
//               label: "Remarks",
//             },
//             {
//               id: "7",
//               key: "",
//               label: "Status",
//               renderCell: (item) => (
//                 <Typography transform="capitalize">
//                   {item.status.name}
//                 </Typography>
//               ),
//             },
//           ]}
//         />
//       </Card>
//     </Stack>
//   );
// };
// export default LeaveViewPage;
