import { PayRoll } from "server/dist/trpc/routes/pay-rolls/get-many";
import Button from "ui/Button";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { useAsyncList } from "ui/hooks/UseAsyncList";
import PageHeader from "../components/PageHeader";
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
        // actions={<PayrollDialog />}
      />
      <Card>
        <DataGrid<PayRoll>
          {...value}
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
              label: "Financial Year",
              renderCell: (item) => (
                <>
                  FY{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "2-digit",
                  }).format(new Date().setFullYear(item.year, item.month, 1))}
                </>
              ),
            },
            {
              id: "4",
              key: "",
              label: "Period",
              renderCell: (item) => (
                <>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    year: "2-digit",
                  }).format(new Date().setFullYear(item.year, item.month, 1))}
                </>
              ),
            },
            {
              id: "5",
              key: "",
              label: "Gross Pay",
              renderCell: (item) => (
                <>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "INR",
                  }).format(
                    Number(
                      item.paySlipComponents.reduce((acc, curr) => {
                        return acc + Number(curr.amount);
                      }, 0)
                    )
                  )}
                </>
              ),
            },
            {
              id: "6",
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
