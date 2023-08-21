import { toast } from "react-toastify";
import {
  Identification,
  InputParameters,
} from "server/dist/trpc/routes/identification/get-many";
import { InputParameters as ImportIdentificationInputParameters } from "server/dist/trpc/routes/identification/import";
import Button from "ui/Button";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Menu from "ui/Menu";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { AsyncListContextValue, useAsyncList } from "ui/hooks/UseAsyncList";
import XLSX from "xlsx";
import IdentificationDialog from "../../components/IdentificationDialog";
import PageHeader from "../../components/PageHeader";
import PrintButton from "../../components/PrintButton";
import ShowIf from "../../components/ShowIf";
import { useAuthContext } from "../../hooks/UseAuth";
import { client } from "../../main";
import { handleTRPCError } from "../../utils/handle-trpc-error";

const Identifications = () => {
  const auth = useAuthContext();

  const value = useAsyncList<Identification, InputParameters["sortBy"]>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };

        const identification = await client.identification.getMany.mutate(
          inputParameters
        );

        return {
          items: identification.items as any,
          totalCount: identification.totalCount,
        };
      } catch (error) {
        handleTRPCError(error, auth);

        return {
          error: Error("Something went wrong"),
        };
      }
    },
  });

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files) return;

      const [file] = event.target.files;

      if (!file) return;

      await importIdentification(file);
      toast.success("File imported successfully!");
    } catch (error) {
      toast.error("An error occurred!");
    } finally {
      event.target.value = "";
    }
  };

  const importIdentification = (file: File) => {
    const fileContentsAsBuffer = file.arrayBuffer();

    const workbook = XLSX.read(fileContentsAsBuffer, { type: "buffer" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(worksheet);

    client.identification.import.mutate(
      rawData.map((row: any) => ({
        ...row,
      })) as ImportIdentificationInputParameters
    );

    console.log({ successfullyImported: true });
  };

  const handleExport = async () => {
    try {
      const data = await client.identification.getMany.mutate({
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

      const identifications = data.items.map((item) => ({
        "Emp Code": item.user.id,
        "Emp Name":
          item.user.personalInfo?.firstName && item.user.personalInfo.lastName
            ? `${item.user.personalInfo?.firstName} ${item.user.personalInfo?.lastName}`
            : item.user.name,
        "Identification Type": item.type.name,
        "Identification Number": item.number,
      }));

      const worksheet = XLSX.utils.json_to_sheet(identifications);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "identifications");
      XLSX.writeFile(workbook, "identifications.xlsx", { compression: true });

      toast.success("Data successfully exported!");
    } catch (error) {
      toast.error("An error occurred!");
      console.log({ error });
    }
  };

  const handleExportFormatExport = async () => {
    try {
      const identification = [
        {
          userId: 1,
          type: "Aadhaar",
          number: "10020200301203",
        },
      ];

      const worksheet = XLSX.utils.json_to_sheet(identification);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "identifications");
      XLSX.writeFile(workbook, "identifications.xlsx", {
        compression: true,
      });

      toast.success("Export format successfully exported!");
    } catch (error) {
      console.log({ error });
      toast.error("An error occurred!");
    }
  };
  return (
    <>
      <Stack gap="3">
        <ShowIf.Employee>
          <PageHeader
            title={<PageHeader.Title />}
            actions={
              <Stack orientation="horizontal" gap="3">
                <IdentificationDialog
                  asyncList={value as AsyncListContextValue}
                />
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
                  id="customFile"
                  onChange={onFileChange}
                />
                <PrintButton />
              </Stack>
            }
          />
        </ShowIf.Admin>
        <Card className="d-print-block">
          <DataGrid<Identification>
            {...(value as AsyncListContextValue<Identification>)}
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
                  <Typography transform="capitalize">
                    {item.user.personalInfo?.firstName}{" "}
                    {item.user.personalInfo?.lastName}
                  </Typography>
                ),
                ...value.sort("userId"),
              },
              {
                id: "3",
                key: "",
                label: "Identification Type",
                renderCell: (item) => (
                  <Typography transform="capitalize">
                    {item.type.name}
                  </Typography>
                ),
                ...value.sort("typeId"),
              },
              {
                id: "4",
                key: "",
                label: "Identification Number",
                renderCell: (item) => (
                  <Typography transform="capitalize">{item.number}</Typography>
                ),
                ...value.sort("number"),
              },
            ]}
          />
        </Card>
      </Stack>
    </>
  );
};

export default Identifications;
