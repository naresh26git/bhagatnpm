import {
  HelpDesk,
  InputParameters,
} from "server/dist/trpc/routes/help-desks/get-many";
import Button from "ui/Button";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { AsyncListContextValue, useAsyncList } from "ui/hooks/UseAsyncList";
import HelpDeskDialog from "../components/HelpDeskDialog";
import HelpDeskStatusDialog from "../components/HelpDeskStatusDialog";
import PageHeader from "../components/PageHeader";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

export const helpDesk = {
  uid: "1",
  id: "1210",
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
  const value = useAsyncList<HelpDesk, InputParameters["sortBy"]>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };

        const result = await client.helpDesk.getMany.mutate(inputParameters);

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
  const columns = [
    {
      id: "1",
      key: "",
      label: "Id",
      renderCell: (item: HelpDesk) => <>{item.user.id}</>,
    },
    {
      id: "2",
      key: "",
      label: "Date",
      renderCell: (item: HelpDesk) => (
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
      ...value.sort("date"),
    },
    {
      id: "3",
      key: "tittle",
      label: "Tittle",
      renderCell: (item: HelpDesk) => <>{item.tittle}</>,
      ...value.sort("tittle"),
    },

    {
      id: "4",
      key: "category",
      label: "Category",
      renderCell: (item: HelpDesk) => (
        <Typography>{item.category.name}</Typography>
      ),
    },
    {
      id: "5",
      key: "description",
      label: "Description",
      renderCell: (item: HelpDesk) => <>{item.description}</>,
      ...value.sort("description"),
    },
    {
      id: "6",
      key: "remarks",
      label: "Remarks",
      renderCell: (item: HelpDesk) => <>{item.remarks}</>,
      ...value.sort("remarks"),
    },
    {
      id: "7",
      key: "status",
      label: "Status",
      renderCell: (item: HelpDesk) => (
        <Typography
          transform="capitalize"
          color={
            item.status.name === "resolved"
              ? "success"
              : item.status.name === "cancelled"
              ? "danger"
              : "warning"
          }
        >
          {item.status.name}
        </Typography>
      ),
    },
    {
      id: "8",
      key: "",
      label: "Action",
      renderCell: (item: HelpDesk) => (
        <>
          <HelpDeskStatusDialog
            variant={
              auth.state.user?.role.name === "admin" ? "admin" : "employee"
            }
            helpDeskId={item.id}
          />
        </>
      ),
    },
  ];
  return (
    <Stack gap="3">
      <PageHeader
        title={<PageHeader.Title></PageHeader.Title>}
        actions={<HelpDeskDialog />}
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
          {...(value as AsyncListContextValue<HelpDesk>)}
          columns={columns.filter((column) => {
            if (column.label !== "Action") return true;
            if (auth.state.user?.role.name === "admin") return true;

            return false;
          })}
        />
      </Card>
    </Stack>
  );
};

export default HelpDeskPage;
