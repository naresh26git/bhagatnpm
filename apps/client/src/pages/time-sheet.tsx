import {
  InputParameters,
  TimeSheet,
} from "server/dist/trpc/routes/time-sheets/get-many";
import Badge from "ui/Badge";
import Button from "ui/Button";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { AsyncListContextValue, useAsyncList } from "ui/hooks/UseAsyncList";

import PageHeader from "../components/PageHeader";
import TimesheetDialog from "../components/TimesheetDialog";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

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

  const value = useAsyncList<TimeSheet, InputParameters["sortBy"]>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };

        const result = await client.timeSheet.getMany.mutate(inputParameters);

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
      <PageHeader title={<PageHeader.Title></PageHeader.Title>} />
      {/* <PageHeader actions={<TimesheetDialog />} /> */}
      <PageHeader
        title={<PageHeader.Title></PageHeader.Title>}
        actions={<TimesheetDialog />}
      />
      <Card>
        <DataGrid<TimeSheet>
          {...(value as AsyncListContextValue<TimeSheet>)}
          columns={[
            {
              id: "1",
              key: "userId",
              label: "Emp code",
              renderCell: (item) => <>{item.user.id}</>,
            },
            {
              id: "2",
              key: "",
              label: "Name",
              renderCell: (item) => (
                <>
                  {item.user.personalInfo
                    ? `${item.user.personalInfo.firstName} ${item.user.personalInfo.lastName}`
                    : ""}
                </>
              ),
              ...value.sort("userId"),
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
              ...value.sort("inTime"),
            },
            {
              id: "4",
              key: "",
              label: "Check-in",
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
              ...value.sort("inTime"),
            },
            {
              id: "5",
              key: "",
              label: "Check-out",
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
              ...value.sort("outTime"),
            },
            {
              id: "6",
              key: "",
              label: "Status",
              renderCell: (item) => (
                <Badge
                  textBackground={
                    item.status.name === "present"
                      ? "success"
                      : item.status.name === "absent"
                      ? "danger"
                      : "warning"
                  }
                >
                  <Typography transform="capitalize" as="span">
                    {item.status.name}
                  </Typography>
                </Badge>
              ),
              ...value.sort("statusId"),
            },
          ]}
        />
      </Card>
    </Stack>
  );
};

export default TimeSheetPage;
