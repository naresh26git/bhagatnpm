import React from "react";
import { toast } from "react-toastify";
import {
  InputParameters,
  PayRoll,
} from "server/dist/trpc/routes/pay-rolls/get-many";
import { InputParameters as ImportPaySlipComponentsInputParameters } from "server/dist/trpc/routes/pay-rolls/import";
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
import PayRollDetailsDialog from "../components/PayRollDetailsDialog";
import PrintButton from "../components/PrintButton";
import ShowIf from "../components/ShowIf";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

export const PayRollPage = () => {
  const auth = useAuthContext();

  const value = useAsyncList<PayRoll, InputParameters["sortBy"]>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };
        const result = await client.payRoll.getMany.mutate(inputParameters);

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
      const data = await client.payRoll.getMany.mutate({
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

      const payRolls = data.items.map((item) => ({
        "Emp Code": item.user.id,
        "Emp Name":
          item.user.personalInfo?.firstName && item.user.personalInfo.lastName
            ? `${item.user.personalInfo?.firstName} ${item.user.personalInfo?.lastName}`
            : item.user.name,
        Department: item.user.personalInfo?.department.name,
        Designation: item.user.personalInfo?.designation.name,
        "Financial Year": `FY ${new Intl.DateTimeFormat("en-US", {
          year: "2-digit",
        }).format(new Date().setFullYear(item.year, item.month, 1))}`,
        Period: `${new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "2-digit",
        }).format(new Date().setFullYear(item.year, item.month, 1))}`,
        "Gross Pay": Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(
          item.paySlipComponents.reduce(
            (acc, paySlipComponent) => acc + Number(paySlipComponent.amount),
            0
          )
        ),
        Status: item.status.name,
      }));

      const worksheet = XLSX.utils.json_to_sheet(payRolls);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "pay-roll");
      XLSX.writeFile(workbook, "pay-roll.xlsx", { compression: true });

      toast.success("Data successfully exported!");
    } catch (error) {
      console.log({ error });
      toast.error("An error occurred!");
    }
  };

  const importPaySlipComponents = async (file: File) => {
    const fileContentsAsBuffer = await file.arrayBuffer();

    const workbook = XLSX.read(fileContentsAsBuffer, { type: "buffer" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(worksheet);

    await client.payRoll.import.mutate(
      rawData.map((row: any) => ({
        ...row,
        amount: Number(row?.amount),
      })) as ImportPaySlipComponentsInputParameters
    );
  };

  const handleExportFormatExport = async () => {
    try {
      const paySlipComponents = [
        {
          userId: 1,
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          status: "success",
          component: "Basic or HRA or Deduction",
          amount: 10000,
        },
      ];

      const worksheet = XLSX.utils.json_to_sheet(paySlipComponents);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "pay-slip-components");
      XLSX.writeFile(workbook, "pay-slip-components.xlsx", {
        compression: true,
      });

      toast.success("Export format successfully exported!");
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files) return;

      const [file] = event.target.files;

      if (!file) return;

      await importPaySlipComponents(file);

      toast.success("File imported successfully!");

      await value.refresh();
    } catch (error) {
      toast.error("An error occurred!");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <Stack gap="3">
      <Grid.Row>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Emp.Code"
          />
        </Grid.Col>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Emp.Name"
          />
        </Grid.Col>

        <Grid.Row>
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
            <Button variant="primary" className="w-100">
              Search
            </Button>
          </Grid.Col>
        </Grid.Row>
      </Grid.Row>

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
                    <label className="btn btn-primary" htmlFor="customFile">
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
                    label: "Export format",
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
                id="customFile"
                onChange={onFileChange}
              />
            </ShowIf.Admin>

            <PrintButton />
          </Stack>
        }
      />
      <Card id="section-to-print">
        <DataGrid<PayRoll>
          {...(value as AsyncListContextValue<PayRoll>)}
          columns={[
            {
              id: "1",
              key: "",
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
              label: "Financial Year",
              renderCell: (item) => (
                <>
                  FY{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "2-digit",
                  }).format(new Date().setFullYear(item.year, item.month, 1))}
                </>
              ),
              ...value.sort("year"),
            },
            {
              id: "4",
              key: "",
              label: "Period",
              renderCell: (item) => (
                <>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    year: "2-digit",
                  }).format(new Date().setFullYear(item.year, item.month, 1))}
                </>
              ),
              ...value.sort("month"),
            },
            {
              id: "5",
              key: "",
              label: "Gross Pay",
              renderCell: (item) => (
                <>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "INR",
                  }).format(
                    Number(
                      item.paySlipComponents.reduce((acc, curr) => {
                        return acc + Number(curr.amount);
                      }, 0)
                    )
                  )}
                </>
              ),
            },
            {
              id: "6",
              key: "",
              label: "Status",
              renderCell: (item) => (
                <Typography transform="capitalize">
                  {item.status.name}
                </Typography>
              ),
              ...value.sort("statusId"),
            },
            {
              id: "7",
              key: "",
              label: "Action",
              renderCell: (item) => (
                <PayRollDetailsDialog payRollDetails={item} />
              ),
            },
          ]}
        />
      </Card>
    </Stack>
  );
};
export default PayRollPage;
