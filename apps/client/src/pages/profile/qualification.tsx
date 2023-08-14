import {
  InputParameters,
  Qualification,
} from "server/src/trpc/routes/qualification/get-many";
import Button from "ui/Button";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import { AsyncListContextValue, useAsyncList } from "ui/hooks/UseAsyncList";
import XLSX from "xlsx";
import PageHeader from "../../components/PageHeader";
import PrintButton from "../../components/PrintButton";
import QualificationDialog from "../../components/QualificationDialog";
import ShowIf from "../../components/ShowIf";
import { useAuthContext } from "../../hooks/UseAuth";
import { client } from "../../main";
import { handleTRPCError } from "../../utils/handle-trpc-error";

const Qualifications = () => {
  const auth = useAuthContext();

  const value = useAsyncList<Qualification, InputParameters["sortBy"]>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };

        const qualification = await client.qualifications.getMany.mutate(
          inputParameters
        );

        return {
          items: qualification.items as any,
          totalCount: qualification.totalCount,
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
      const data = await client.qualifications.getMany.mutate({
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

      const qualifications = data.items.map((item) => ({
        "Emp Code": item.user.id,
        "Emp Name":
          item.user.personalInfo?.firstName && item.user.personalInfo.lastName
            ? `${item.user.personalInfo?.firstName} ${item.user.personalInfo?.lastName}`
            : item.user.name,
        Qualification: item.name,
      }));

      const worksheet = XLSX.utils.json_to_sheet(qualifications);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "qualifications");
      XLSX.writeFile(workbook, "qualifications.xlsx", {
        compression: true,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Stack gap="3">
      <ShowIf.Employee>
        <PageHeader
          title={<PageHeader.Title></PageHeader.Title>}
          actions={
            <Stack orientation="horizontal" gap="3">
              <QualificationDialog asyncList={value as AsyncListContextValue} />
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
        <DataGrid<Qualification>
          {...(value as AsyncListContextValue<Qualification>)}
          columns={[
            {
              id: "1",
              key: "",
              label: "Emp code",
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
              label: "Qualification",
              renderCell: (item) => <>{item.name}</>,
              ...value.sort("name"),
            },
          ]}
        />
      </Card>
    </Stack>
  );
};

export default Qualifications;
