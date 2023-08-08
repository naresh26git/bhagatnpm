import {
  Identification,
  InputParameters,
} from "server/dist/trpc/routes/identification/get-many";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { AsyncListContextValue, useAsyncList } from "ui/hooks/UseAsyncList";
import IdentificationDialog from "../../components/IdentificationDialog";
import PageHeader from "../../components/PageHeader";
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

  return (
    <>
      <Stack gap="3">
        <ShowIf.Employee>
          <PageHeader
            title={<PageHeader.Title></PageHeader.Title>}
            actions={<IdentificationDialog />}
          />
        </ShowIf.Employee>

        <Card>
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
