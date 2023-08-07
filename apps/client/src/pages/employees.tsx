import { User } from "server/dist/trpc/routes/users/get-many";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { useAsyncList } from "ui/hooks/UseAsyncList";
import CreateUserDialog from "../components/CreateUserDialog";
import PageHeader from "../components/PageHeader";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

export const EmployeesPage = () => {
  const auth = useAuthContext();

  const value = useAsyncList<User>({
    load: async () => {
      try {
        const employees = await client.user.getMany.query();

        return {
          totalCount: employees.length,
          items: employees as any,
        };
      } catch (error) {
        handleTRPCError(error, auth);
        return { error: new Error("Something went wrong") };
      }
    },
  });

  return (
    <>
      <Stack gap="3">
        <PageHeader
          title={<PageHeader.Title>Employees</PageHeader.Title>}
          actions={<CreateUserDialog />}
        />

        <Card>
          <DataGrid<User>
            {...value}
            columns={[
              { id: "1", key: "name", label: "Name" },
              { id: "2", key: "username", label: "Username" },
              {
                id: "3",
                key: "",
                label: "Role",
                renderCell: (user) => (
                  <Typography as="span" transform="capitalize">
                    {user.role.name}
                  </Typography>
                ),
              },
              { id: "4", key: "email", label: "Email" },
              { id: "5", key: "mobile", label: "Mobile" },
            ]}
          />
        </Card>
      </Stack>
    </>
  );
};

export default EmployeesPage;
