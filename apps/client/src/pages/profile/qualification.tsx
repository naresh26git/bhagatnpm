import { Qualification } from "server/src/trpc/routes/qualification/get-many";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import { useAsyncList } from "ui/hooks/UseAsyncList";
import { useAuthContext } from "../../hooks/UseAuth";
import { client } from "../../main";
import { handleTRPCError } from "../../utils/handle-trpc-error";

const Qualifications = () => {
  const auth = useAuthContext();
  const value = useAsyncList<Qualification>({
    load: async (states) => {
      try {
        const qualification = await client.qualification.getMany.mutate();
        console.log(qualification);
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

  return (
    <Stack gap="3">
      <Card>
        <DataGrid<Qualification>
          {...value}
          columns={[
            {
              id: "1",
              key: "empcode",
              label: "Id",
              renderCell: (item) => <>{item.id}</>,
            },
            {
              id: "2",
              key: "first name",
              label: "Empname",
              renderCell: (item) => <>{item.user.name}</>,
            },
            {
              id: "3",
              key: "qualification",
              label: "Qualification",
              renderCell: (item) => <>{item.name}</>,
            },
          ]}
        />
      </Card>
    </Stack>
  );
};

export default Qualifications;
