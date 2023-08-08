import {
  InputParameters,
  Leave,
} from "server/dist/trpc/routes/leaves/get-many";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { AsyncListContextValue, useAsyncList } from "ui/hooks/UseAsyncList";
import LeaveStatusDialog from "../../components/LeaveStatusDialog";
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

  const value = useAsyncList<Leave, InputParameters["sortBy"]>({
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

        const result = await client.leave.getMany.mutate(inputParameters);

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
  const columns = [
    {
      id: "1",
      key: "",
      label: "Empcode",
      renderCell: (item: Leave) => <>{item.user.id}</>,
    },
    {
      id: "2",
      key: "",
      label: "Emp Name",
      renderCell: (item: Leave) => (
        <>
          {item.user.personalInfo?.firstName} {item.user.personalInfo?.lastName}
        </>
      ),
    },
    {
      id: "3",
      key: "",
      label: "Requested On",
      renderCell: (item: Leave) => (
        <>
          {" "}
          {new Intl.DateTimeFormat("en-US", {
            month: "numeric",
            year: "numeric",
            day: "numeric",
          }).format(new Date(item.createdAt))}
        </>
      ),
      ...value.sort("createdAt"),
    },
    {
      id: "4",
      key: "",
      label: "Leave Type",
      renderCell: (item: Leave) => <>{item.leaveType.name}</>,
    },

    {
      id: "5",
      key: "",
      label: "From",
      renderCell: (item: Leave) => (
        <>
          {new Intl.DateTimeFormat("en-US", {
            month: "numeric",
            year: "numeric",
            day: "numeric",
          }).format(new Date(item.fromDate))}
        </>
      ),
      ...value.sort("fromDate"),
    },
    {
      id: "6",
      key: "",
      label: "To",
      renderCell: (item: Leave) => (
        <>
          {new Intl.DateTimeFormat("en-US", {
            month: "numeric",
            year: "numeric",
            day: "numeric",
          }).format(new Date(item.toDate))}
        </>
      ),
      ...value.sort("toDate"),
    },
    {
      id: "7",
      key: "noOfDays",
      label: "Days",
      renderCell: (item: Leave) => <>{item.noOfDays}</>,
      ...value.sort("noOfDays"),
    },
    {
      id: "8",
      key: "remarks",
      label: "Remarks",
      ...value.sort("remarks"),
    },
    {
      id: "8",
      key: "",
      label: "Status",
      renderCell: (item: Leave) => (
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
    {
      id: "9",
      key: "",
      label: "Action",
      renderCell: (item: Leave) => (
        <>
          <LeaveStatusDialog
            variant={
              auth.state.user?.role.name === "admin" ? "admin" : "employee"
            }
            leaveId={item.id}
          />
        </>
      ),
    },
  ];
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
          {...(value as AsyncListContextValue<Leave>)}
          columns={columns.filter((column) => {
            if (column.label !== "Action") return true;
            if (auth.state.user?.role.name === "admin") return true;

            return false;
          })}
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
