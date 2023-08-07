import {
  Address,
  InputParameters,
} from "server/dist/trpc/routes/addresses/get-many";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { AsyncListContextValue, useAsyncList } from "ui/hooks/UseAsyncList";
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

  return (
    <Stack gap="3">
      <ShowIf.Employee>
        <PageHeader
          title={<PageHeader.Title></PageHeader.Title>}
          actions={<ContactDialog />}
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
