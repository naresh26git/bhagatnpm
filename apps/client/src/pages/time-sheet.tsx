import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  InputParameters,
  TimeSheet,
} from "server/dist/trpc/routes/time-sheets/get-many";
import { InputParameters as ImportTimeSheetInputParameters } from "server/dist/trpc/routes/time-sheets/import";
import Badge from "ui/Badge";
import Button from "ui/Button";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Grid from "ui/Grid";
import Menu from "ui/Menu";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { AsyncListContextValue, useAsyncList } from "ui/hooks/UseAsyncList";
import XLSX from "xlsx";
import PageHeader from "../components/PageHeader";
import PrintButton from "../components/PrintButton";
import { ShowIf } from "../components/ShowIf";
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
  const [status, setStatus] = useState<"in" | "out">(); // Initial status is "out"

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

  const handleExport = async () => {
    try {
      const data = await client.timeSheet.getMany.mutate({
        fromDate: new Date(
          new Date(
            new Date().setFullYear(
              new Date().getFullYear(),
              new Date().getMonth(),
              1
            )
          ).setHours(0, 0, 0, 0)
        ),
        toDate: new Date(
          new Date(
            new Date().setFullYear(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              1
            )
          ).setHours(0, 0, 0, 0)
        ),
      });
      const timeSheets = data.items.map((item) => ({
        "Emp Code": item.user.id,
        "Emp Name":
          item.user.personalInfo?.firstName && item.user.personalInfo.lastName
            ? `${item.user.personalInfo?.firstName} ${item.user.personalInfo?.lastName}`
            : item.user.name,
        Date: item.inTime
          ? new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }).format(new Date(item.inTime))
          : "",
        "Check-in": item.inTime
          ? new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(item.inTime))
          : "",
        "Check-out": item.outTime
          ? new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(item.outTime))
          : "",
        Status: item.status.name,
      }));

      const worksheet = XLSX.utils.json_to_sheet(timeSheets);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "time-sheet");
      XLSX.writeFile(workbook, "time-sheet.xlsx", { compression: true });

      toast.success("Data successfully exported!");
    } catch (error) {
      toast.error("An error occurred!");
      console.log({ error });
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const timeSheet = await client.timeSheet.getByDate.mutate();

        if (timeSheet.inTime && timeSheet.outTime === null) {
          return setStatus("in");
        }
      } catch (error) {
        setStatus("out");

        handleTRPCError(error, auth);
      }
    })();
  }, []);

  const attendanceIn = async () => {
    try {
      await client.timeSheet.set.mutate({
        inTime: new Date(),
      });
      setStatus("in");
      value.refresh();
    } catch (error) {
      console.error("Error during check-in", error);
    }
  };

  const attendanceOut = async () => {
    try {
      await client.timeSheet.set.mutate({
        outTime: new Date(),
      });
      setStatus(undefined);
      value.refresh();
    } catch (error) {
      console.error("Error during check-out", error);
    }
  };

  const handleExportFormatExport = async () => {
    try {
      const timeSheet = [
        {
          userId: 5,
          inTime: new Intl.DateTimeFormat("en-US", {
            month: "numeric",
            year: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }).format(new Date().setHours(9, 0, 0, 0)),
          outTime: new Intl.DateTimeFormat("en-US", {
            month: "numeric",
            year: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }).format(new Date().setHours(18, 0, 0, 0)),
          status: "present",
        },
      ];

      const worksheet = XLSX.utils.json_to_sheet(timeSheet);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "time-sheet");
      XLSX.writeFile(workbook, "time-sheet.xlsx", {
        compression: true,
      });

      toast.success("Export format successfully exported!");
    } catch (error) {
      console.log({ error });
      toast.error("An error occurred!");
    }
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files) return;

      const [file] = event.target.files;

      if (!file) return;

      await importTimeSheet(file);

      toast.success("File imported successfully!");

      await value.refresh();
    } catch (error) {
      toast.error("An error occurred!");
    } finally {
      event.target.value = "";
    }
  };

  const importTimeSheet = async (file: File) => {
    const fileContentsAsBuffer = await file.arrayBuffer();

    const workbook = XLSX.read(fileContentsAsBuffer, { type: "buffer" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(worksheet);

    await client.timeSheet.import.mutate(
      rawData.map((row: any) => ({
        ...row,
      })) as ImportTimeSheetInputParameters
    );
  };

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

      <ShowIf.Employee>
        <PageHeader
          title={<PageHeader.Title></PageHeader.Title>}
          actions={
            <Stack orientation="horizontal" gap="3">
              {status === "out" && (
                <Button variant="primary" onClick={attendanceIn}>
                  Check In
                </Button>
              )}
              {status === "in" && (
                <Button variant="primary" onClick={attendanceOut}>
                  Check Out
                </Button>
              )}
              <Button variant="primary" onClick={handleExport}>
                Export
              </Button>
              <PrintButton />
            </Stack>
          }
        />
      </ShowIf.Employee>
      <ShowIf.Admin>
        <PageHeader
          title={<PageHeader.Title />}
          actions={
            <Stack orientation="horizontal" gap="3">
              <Button variant="primary" onClick={handleExport}>
                Export
              </Button>

              <ShowIf.Admin>
                <Menu
                  isSplitButton
                  trigger={
                    <>
                      <label
                        className="btn btn-primary"
                        htmlFor="importTimeSheetFile"
                      >
                        Import
                      </label>
                      <Menu.Trigger variant="primary">
                        <span className="visually-hidden">Toggle Dropdown</span>
                      </Menu.Trigger>
                    </>
                  }
                  dropdown={<Menu.Dropdown />}
                  options={[
                    {
                      label: "Import format",
                      onClick: handleExportFormatExport,
                    },
                  ]}
                />

                <input
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  style={{
                    display: "none",
                  }}
                  id="importTimeSheetFile"
                  onChange={onFileChange}
                />
              </ShowIf.Admin>

              <PrintButton />
            </Stack>
          }
        />
      </ShowIf.Admin>

      <Card id="section-to-print">
        <DataGrid<TimeSheet>
          {...(value as AsyncListContextValue<TimeSheet>)}
          columns={[
            {
              id: "1",
              key: "userId",
              label: "Emp Code",
              renderCell: (item) => <>{item.user.id}</>,
            },
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
