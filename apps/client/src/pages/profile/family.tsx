import { toast } from "react-toastify";
import {
  FamilyDetail,
  InputParameters,
} from "server/dist/trpc/routes/family-details/get-many";
import { InputParameters as ImportFamilyDetailInputParameters } from "server/src/trpc/routes/family-details/import";
import Button from "ui/Button";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import { Menu } from "ui/Menu";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { AsyncListContextValue, useAsyncList } from "ui/hooks/UseAsyncList";
import XLSX from "xlsx";
import FamilyDialog from "../../components/FamilyDialog";
import PageHeader from "../../components/PageHeader";
import ShowIf from "../../components/ShowIf";
import { useAuthContext } from "../../hooks/UseAuth";
import { client } from "../../main";
import { handleTRPCError } from "../../utils/handle-trpc-error";

export type Family = {
  uid: string;
  relationship: string;
  name: string;
  dob: string;
};
export type FamilyDataPageProps = {
  tabId: number;
  activeTabId: number;
};
export const family = {
  uid: "1",
  empcode: "1210",
  relationship: "Spouse",
  name: "Sample Spouse Name",
  dob: "12/12/90",
};

export const families = [
  family,
  { ...family, uid: "2" },
  { ...family, uid: "3" },
  { ...family, uid: "4" },
  { ...family, uid: "5" },
  { ...family, uid: "6" },
  { ...family, uid: "7" },
  { ...family, uid: "8" },
  { ...family, uid: "9" },
  { ...family, uid: "10" },
  { ...family, uid: "11" },
  { ...family, uid: "12" },
  { ...family, uid: "13" },
];
export type FamilyPageProps = {};

export const FamilyPage = ({ tabId, activeTabId }: FamilyDataPageProps) => {
  const auth = useAuthContext();

  const value = useAsyncList<FamilyDetail, InputParameters["sortBy"]>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };
        const result = await client.familyDetail.getMany.mutate(
          inputParameters
        );

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

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files) return;

      const [file] = event.target.files;

      if (!file) return;

      await importFamilyDetail(file);

      toast.success("File imported successfully!");

      await value.refresh();
    } catch (error) {
      toast.error("An error occurred!");
    } finally {
      event.target.value = "";
    }
  };

  const importFamilyDetail = async (file: File) => {
    const fileContentsAsBuffer = await file.arrayBuffer();

    const workbook = XLSX.read(fileContentsAsBuffer, { type: "buffer" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(worksheet);

    await client.familyDetail.import.mutate(
      rawData.map((row: any) => ({
        ...row,
      })) as ImportFamilyDetailInputParameters
    );
  };

  const handleExport = async () => {
    try {
      const data = await client.familyDetail.getMany.mutate({
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

      const familyDetails = data.items.map((item) => ({
        "Emp Code": item.user.id,
        "Emp Name":
          item.user.personalInfo?.firstName && item.user.personalInfo.lastName
            ? `${item.user.personalInfo?.firstName} ${item.user.personalInfo?.lastName}`
            : item.user.name,
        "Relationship Type": item.relationshipType.name,
        "Relationship Name": item.name,
        DOB: new Intl.DateTimeFormat("en-US", {
          month: "numeric",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.dateOfBirth)),
      }));

      const worksheet = XLSX.utils.json_to_sheet(familyDetails);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "family-details");
      XLSX.writeFile(workbook, "family-details.xlsx", { compression: true });

      toast.success("Data successfully exported!");
    } catch (error) {
      toast.error("An error occurred!");
      console.log({ error });
    }
  };

  const handleExportFormatExport = async () => {
    try {
      const familyDetails = [
        {
          userId: 4,
          relationShipType: "mother",
          name: "Nirmala",
          dateOfBirth: new Intl.DateTimeFormat("en-US", {
            month: "numeric",
            year: "numeric",
            day: "numeric",
          }).format(new Date()),
        },
      ];

      const worksheet = XLSX.utils.json_to_sheet(familyDetails);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "family-details");
      XLSX.writeFile(workbook, "family-details.xlsx", {
        compression: true,
      });

      toast.success("Export format successfully exported!");
    } catch (error) {
      console.log({ error });
      toast.error("An error occurred!");
    }
  };

  return (
    <Stack gap="3">
      <ShowIf.Employee>
        <PageHeader
          title={<PageHeader.Title />}
          actions={
            <Stack orientation="horizontal" gap="3">
              <FamilyDialog asyncList={value as AsyncListContextValue} />
              <Button variant="primary" onClick={handleExport}>
                Export
              </Button>
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
                    <label
                      className="btn btn-primary"
                      htmlFor="importFamilyDetailsFile"
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
                id="importFamilyDetailsFile"
                onChange={onFileChange}
              />
            </Stack>
          }
        />
      </ShowIf.Admin>
      <Card id={`section-to-print-${tabId}`}>
        <DataGrid<FamilyDetail>
          {...(value as AsyncListContextValue<FamilyDetail>)}
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
              label: "Relationship Type",
              renderCell: (item) => (
                <Typography transform="capitalize">
                  {item.relationshipType.name}
                </Typography>
              ),
              ...value.sort("relationShipId"),
            },
            {
              id: "4",
              key: "name",
              label: "Relationship Name",
              ...value.sort("name"),
            },
            {
              id: "5",
              key: "",
              label: "DOB",
              renderCell: (item) => (
                <>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "numeric",
                    year: "numeric",
                    day: "numeric",
                  }).format(new Date(item.dateOfBirth))}
                </>
              ),
              ...value.sort("dateOfBirth"),
            },
          ]}
        />
      </Card>
    </Stack>
  );
};

export default FamilyPage;
