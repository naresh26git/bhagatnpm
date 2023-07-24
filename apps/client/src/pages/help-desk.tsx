import { HelpDesk } from "server/dist/trpc/routes/help-desks/get-many";
import Button from "ui/Button";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { useAsyncList } from "ui/hooks/UseAsyncList";
import CreateHelpDesk from "../components/CreateHelpDesk";
import PageHeader from "../components/PageHeader";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

// export type HelpDesk = {
//   uid: string;
//   empcode: string;
//   empname: string;
//   date: string;
//   tittle: string;
//   category: string;
//   description: string;
//   remarks: string;
//   status: string;
// };

export const helpDesk = {
  uid: "1",
  id: "1210",
  // empname: "Vignesh S",
  date: "18/04/2023",
  tittle: "Work",
  category: "Salary Issue",
  description: "My last month Salary Was not Credit My Account",
  remarks: "pls Clear my Issue Quickly",
  status: "Pending",
};

export const helpDesks = [
  helpDesk,
  { ...helpDesk, uid: "2" },
  { ...helpDesk, uid: "3" },
  { ...helpDesk, uid: "4" },
  { ...helpDesk, uid: "5" },
  { ...helpDesk, uid: "6" },
  { ...helpDesk, uid: "7" },
  { ...helpDesk, uid: "8" },
  { ...helpDesk, uid: "9" },
  { ...helpDesk, uid: "10" },
  { ...helpDesk, uid: "11" },
  { ...helpDesk, uid: "12" },
  { ...helpDesk, uid: "13" },
];

export type HelpDeskPageProps = {};

export const HelpDeskPage = () => {
  const auth = useAuthContext();
  const value = useAsyncList<HelpDesk>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };

        console.log({ inputParameters });

        const result = await client.helpDesk.getMany.mutate(inputParameters);

        console.log({ result });

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
      <PageHeader
        title={<PageHeader.Title></PageHeader.Title>}
        actions={<CreateHelpDesk />}
      />
      <Grid.Row>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="ID"
          />
        </Grid.Col>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Tittle"
          />
        </Grid.Col>
        {/* <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="DOJ"
          />
        </Grid.Col> */}
        <Grid.Row>
          <Grid.Col className="py-2" cols={["12", "md-2"]}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="From"
            />
          </Grid.Col>
          <Grid.Col className="py-2" cols={["12", "md-2"]}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="To"
            />
          </Grid.Col>
          <Grid.Col className="py-2" cols={["12", "md-2"]}>
            <Button variant="primary" className="w-100">
              Search
            </Button>
          </Grid.Col>
        </Grid.Row>
      </Grid.Row>

      <Card>
        <DataGrid<HelpDesk>
          {...value}
          columns={[
            // {
            //   id: "1",
            //   key: "empcode",
            //   label: "Empcode",
            // },
            {
              id: "2",
              key: "id",
              label: "ID",
            },
            {
              id: "3",
              key: "",
              label: "Date",
              renderCell: (item) => (
                <>
                  {item.date
                    ? new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      }).format(new Date(item.date))
                    : ""}
                </>
              ),
            },
            {
              id: "4",
              key: "tittle",
              label: "Tittle",
            },

            {
              id: "5",
              key: "category",
              label: "Category",
              renderCell: (input) => (
                <Typography>{input.category.name}</Typography>
              ),
            },
            {
              id: "6",
              key: "description",
              label: "Description",
            },
            {
              id: "7",
              key: "remarks",
              label: "Remarks",
            },
            {
              id: "8",
              key: "status",
              label: "Status",
              renderCell: (input) => (
                <Typography
                  transform="capitalize"
                  color={
                    input.status.name === "resolved"
                      ? "success"
                      : input.status.name === "cancelled"
                      ? "danger"
                      : "warning"
                  }
                >
                  {input.status.name}
                </Typography>
              ),
            },
          ]}
        />
      </Card>
    </Stack>
  );
};

export default HelpDeskPage;
