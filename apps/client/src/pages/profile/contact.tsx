import { toast } from "react-toastify";
import {
  Address,
  InputParameters,
} from "server/dist/trpc/routes/addresses/get-many";
import { InputParameters as ImportAddressInputParameters } from "server/dist/trpc/routes/addresses/import";
import Button from "ui/Button";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import { Menu } from "ui/Menu";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { AsyncListContextValue, useAsyncList } from "ui/hooks/UseAsyncList";
import XLSX from "xlsx";
import ContactDialog from "../../components/ContactDialog";
import PageHeader from "../../components/PageHeader";
import ShowIf from "../../components/ShowIf";
import { useAuthContext } from "../../hooks/UseAuth";
import { client } from "../../main";
import { handleTRPCError } from "../../utils/handle-trpc-error";

export type ContactDataPageProps = {
  tabId: number;
  activeTabId: number;
};

export const ContactDataPage = ({
  tabId,
  activeTabId,
}: ContactDataPageProps) => {
  const auth = useAuthContext();

  const value = useAsyncList<Address, InputParameters["sortBy"]>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };

        const result = await client.address.getMany.mutate(inputParameters);

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
      const data = await client.address.getMany.mutate({
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

      const addresses = data.items.map((item) => ({
        "Emp Code": item.user.id,
        "Emp Name":
          item.user.personalInfo?.firstName && item.user.personalInfo.lastName
            ? `${item.user.personalInfo?.firstName} ${item.user.personalInfo?.lastName}`
            : item.user.name,
        "Address Type": item.addressType?.name,
        Street: item.street,
        City: item.city,
        State: item.state,
        Country: item.country,
        Pincode: item.pincode,
      }));

      const worksheet = XLSX.utils.json_to_sheet(addresses);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "addresses");
      XLSX.writeFile(workbook, "addresses.xlsx", { compression: true });

      toast.success("Data successfully exported!");
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files) return;

      const [file] = event.target.files;

      if (!file) return;

      await importAddress(file);
      toast.success("File imported successfully!");
    } catch (error) {
      toast.error("An error occurred!");
    } finally {
      event.target.value = "";
    }
  };

  const importAddress = async (file: File) => {
    const fileContentsAsBuffer = await file.arrayBuffer();

    const workbook = XLSX.read(fileContentsAsBuffer, { type: "buffer" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(worksheet);

    await client.address.import.mutate(
      rawData.map((row: any) => ({
        ...row,
      })) as ImportAddressInputParameters
    );
  };

  const handleExportFormatExport = async () => {
    try {
      const contactDetails = [
        {
          userId: 9,
          addressType: "others",
          street: "Kavadiyankadu",
          city: "kumarapalayam",
          state: "Tamil Nadu",
          country: "India",
          pincode: "638183",
        },
      ];

      const worksheet = XLSX.utils.json_to_sheet(contactDetails);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "contact-details");
      XLSX.writeFile(workbook, "contact-details.xlsx", {
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
          title={<PageHeader.Title></PageHeader.Title>}
          actions={
            <Stack orientation="horizontal" gap="3">
              <ContactDialog asyncList={value as AsyncListContextValue} />
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
                      htmlFor="importContactFile"
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
                id="importContactFile"
                onChange={onFileChange}
              />
            </Stack>
          }
        />
      </ShowIf.Admin>

      <Card id={`section-to-print-${tabId}`}>
        <DataGrid<Address>
          {...(value as AsyncListContextValue<Address>)}
          columns={[
            {
              id: "1",
              key: "",
              label: "Emp Code ",
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
              label: "Address Type",
              renderCell: (item) => (
                <Typography transform="capitalize">
                  {item.addressType.name}
                </Typography>
              ),
              ...value.sort("addressTypeId"),
            },
            {
              id: "4",
              key: "street",
              label: "Street",
              renderCell: (item) => <>{item.street}</>,
              ...value.sort("street"),
            },
            {
              id: "5",
              key: "city",
              label: "City",
              renderCell: (item) => <>{item.city}</>,
              ...value.sort("city"),
            },
            {
              id: "6",
              key: "state",
              label: "State",
              renderCell: (item) => <>{item.state}</>,
              ...value.sort("state"),
            },
            {
              id: "7",
              key: "country",
              label: "Country",
              renderCell: (item) => <>{item.country}</>,
              ...value.sort("country"),
            },
            {
              id: "8",
              key: "pincode",
              label: "Pincode",
              renderCell: (item) => <>{item.pincode}</>,
              ...value.sort("pincode"),
            },
          ]}
        />
      </Card>
    </Stack>
  );
};

export default ContactDataPage;
