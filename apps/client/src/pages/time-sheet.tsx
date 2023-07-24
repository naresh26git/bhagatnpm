import { TimeSheet } from "server/dist/trpc/routes/time-sheets/get-many";
import Button from "ui/Button";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { useAsyncList } from "ui/hooks/UseAsyncList";
import AddTimesheetDialog from "../components/AddTimesheetDialog";
import PageHeader from "../components/PageHeader";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";
export type TimeSheetList = {
  uid: string;
  empcode: string;
  empname: string;
  attendancedate: string;
  checkin: string;
  checkout: string;
  status: string;
};

export const timeSheet = {
  uid: "1",
  empcode: "1210",
  empname: "Vignesh S",
  attendancedate: "18/04/2023",
  checkin: "9.00 Am",
  checkout: "5.00 Pm",
  status: "P",
};

export const timeSheets = [
  timeSheet,
  { ...timeSheet, uid: "2" },
  { ...timeSheet, uid: "3" },
  { ...timeSheet, uid: "4" },
  { ...timeSheet, uid: "5" },
  { ...timeSheet, uid: "6" },
  { ...timeSheet, uid: "7" },
  { ...timeSheet, uid: "8" },
  { ...timeSheet, uid: "9" },
  { ...timeSheet, uid: "10" },
  { ...timeSheet, uid: "11" },
  { ...timeSheet, uid: "12" },
  { ...timeSheet, uid: "13" },
];

export type TimeSheetPageProps = {};

export const TimeSheetPage = () => {
  const auth = useAuthContext();

  const value = useAsyncList<TimeSheet>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };

        console.log({ inputParameters });

        const result = await client.timeSheet.getMany.mutate();

        return {
          totalCount: result.totalCount,
          items: result.items as any,
        };
      } catch (error) {
        handleTRPCError(error, auth);

        return {
          error: Error("Something went wrong"),
        };
      }
    },
  });
  return (
    <Stack gap="3">
      {/* <PageHeader
        title={<PageHeader.Title></PageHeader.Title>}
        actions={<CreateHelpdeskDialog />}
      /> */}
      <Grid.Row>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Emp.Name"
          />
        </Grid.Col>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Date"
          />
        </Grid.Col>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Time"
          />
        </Grid.Col>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <Button variant="primary" className="w-100">
            Search
          </Button>
        </Grid.Col>
      </Grid.Row>
      <PageHeader title={<PageHeader.Title>Time Sheet</PageHeader.Title>} />
      {/* <PageHeader actions={<AddTimesheetDialog />} /> */}
      <PageHeader
        title={<PageHeader.Title></PageHeader.Title>}
        actions={<AddTimesheetDialog />}
      />
      <Card>
        <DataGrid<TimeSheet>
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
              renderCell: (item) => (
                <>
                  {item.user.personalInfo
                    ? `${item.user.personalInfo.firstName} ${item.user.personalInfo.lastName}`
                    : ""}
                </>
              ),
            },
            {
              id: "3",
              key: "",
              label: "Date",
              renderCell: (item) => (
                <>
                  {item.inTime
                    ? new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      }).format(new Date(item.inTime))
                    : ""}
                </>
              ),
            },
            {
              id: "4",
              key: "",
              label: "In Time",
              renderCell: (item) => (
                <>
                  {item.inTime
                    ? new Intl.DateTimeFormat("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      }).format(new Date(item.inTime))
                    : ""}
                </>
              ),
            },
            {
              id: "5",
              key: "checkout",
              label: "Out Time",
              renderCell: (item) => (
                <>
                  {item.outTime
                    ? new Intl.DateTimeFormat("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      }).format(new Date(item.outTime))
                    : ""}
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
                    item.status.name === "present"
                      ? "success"
                      : item.status.name === "absent"
                      ? "danger"
                      : "warning"
                  }
                  // className="alert alert-present"
                  // role="alert"
                  // itemType="button"
                  // className="alert alert-success"
                  // role="alert"
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

export default TimeSheetPage;
