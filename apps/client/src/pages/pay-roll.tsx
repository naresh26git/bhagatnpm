import { PayRoll } from "server/dist/trpc/routes/pay-rolls/get-many";
import Button from "ui/Button";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { useAsyncList } from "ui/hooks/UseAsyncList";
import PageHeader from "../components/PageHeader";
import PayrollCreateDialog from "../components/PayrollCreateDialog";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";
export type PayRollItem = {
  uid: string;
  empid: string;
  name: string;
  month: string;
  grosspay: string;
  status: string;
};

export const payRoll = {
  uid: "1",
  empid: "1210",
  name: "Vignesh S",
  month: "Jan/2023",
  grosspay: "30000",
  status: "Recived",
};

export const payRolls = [
  payRoll,

  { ...payRoll, uid: "2", month: "Feb/2023" },
  { ...payRoll, uid: "3", month: "Mar/2023" },
  { ...payRoll, uid: "4", month: "Apr/2023" },
  { ...payRoll, uid: "5", month: "May/2023" },
  { ...payRoll, uid: "6", month: "Jun/2023" },
  { ...payRoll, uid: "7", month: "Jul/2023" },
  { ...payRoll, uid: "8", month: "Aug/2023" },
  { ...payRoll, uid: "9", month: "Sep/2023" },
  { ...payRoll, uid: "10", month: "Oct/2023" },
  { ...payRoll, uid: "11", month: "Nov/2023" },
  { ...payRoll, uid: "12", month: "Dec/2023" },
];

export type PayRollPageProps = {};

export const PayRollPage = () => {
  const auth = useAuthContext();

  const value = useAsyncList<PayRoll>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };
        console.log({ inputParameters });
        const result = await client.payRoll.getMany.mutate(inputParameters);

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
      <Grid.Row>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Emp.Code"
          />
        </Grid.Col>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Emp.Name"
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
      {/* <Stack orientation="horizontal" gap="2">
        <input
          type="text"
          className="form-control form-control-sm rounded-pill w-25"
          placeholder="Search"
        />
        <Link className="bg-primary" color="light" component={IconButton}>
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </Link>
      </Stack> */}
      {/* <PageHeader title={<PageHeader.Title>Pay Roll</PageHeader.Title>} /> */}
      <PageHeader
        title={<PageHeader.Title></PageHeader.Title>}
        actions={<PayrollCreateDialog />}
      />
      <Card>
        <DataGrid<PayRoll>
          {...value}
          columns={[
            // {
            //   id: "1",
            //   key: "Emp Id",
            //   label: "Emp Id",
            // },
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
              label: "Month",
              renderCell: (item) => (
                <>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                  }).format(new Date(item.month))}
                </>
              ),
            },
            {
              id: "4",
              key: "",
              label: "gross pay",
              renderCell: (item) => (
                <>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "INR",
                  }).format(Number(item.salary.amount))}
                </>
              ),
            },
            {
              id: "5",
              key: "",
              label: "Status",
              renderCell: (item) => (
                <Typography transform="capitalize">
                  {item.status.name}
                </Typography>
              ),
            },
          ]}
        />
      </Card>
    </Stack>
  );
};
export default PayRollPage;
