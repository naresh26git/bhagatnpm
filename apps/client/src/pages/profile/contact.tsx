import {
  Address,
  InputParameters,
} from "server/dist/trpc/routes/addresses/get-many";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
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

export type contactDataPageProps = {};

export const ContactDataPage = () => {
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
        "Emp Code": item.id,
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
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Stack gap="3">
      <ShowIf.Employee>
        <PageHeader
          title={<PageHeader.Title></PageHeader.Title>}
          actions={<ContactDialog asyncList={value as AsyncListContextValue} />}
        />
      </ShowIf.Employee>

      <Card>
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
