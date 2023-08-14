import {
  Identification,
  InputParameters,
} from "server/dist/trpc/routes/identification/get-many";
import Button from "ui/Button";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
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
    } catch (error) {
      console.log({ error });
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
                <PrintButton />
              </Stack>
            }
          />
        </ShowIf.Admin>
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
