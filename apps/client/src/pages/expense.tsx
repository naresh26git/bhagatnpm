import Button from "ui/Button";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { useAsyncList } from "ui/hooks/UseAsyncList";
export type ExpenceList = {
  uid: string;
  empcode: string;
  empname: string;
  leavetype: string;
  fromdate: string;
  todate: string;
  status: string;
  remarks: string;
};
export const expence = [
  {
    uid: "1",
    empcode: "1210",
    details: "Trip to Kerala",
    amount: "$2000",
    status: "Approved",
  },
  {
    uid: "2",
    empcode: "1342",
    details: "Trip to Ooty",
    amount: "$1200",
    status: "Declined",
  },
  {
    uid: "3",
    empcode: "1123",
    details: "Trip to Maharastra",
    amount: "$2500",
    status: "Approved",
  },
  {
    uid: "4",
    empcode: "1986",
    details: "Trip to Kanyakumari",
    amount: "$1700",
    status: "Pending",
  },
];
const Expence = () => {
  const value = useAsyncList<ExpenceList>({
    load: async (context) => {
      return {
        items: expence as any,
        totalCount: expence.length as any,
      };
    },
  });
  return (
    <>
      <Stack gap="3">
        <Grid.Row>
          <Grid.Col className="py-2" cols={["12", "md-2"]}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Emp Code"
            />
          </Grid.Col>
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
              placeholder="DOJ"
            />
          </Grid.Col>
          <Grid.Row>
            <Grid.Col className="py-2" cols={["12", "md-2"]}>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Emp Name"
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
        {/* <Grid.Row>
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
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Leave Type"
            />
          </Grid.Col>
          <Grid.Col className="py-2" cols={["12", "md-2"]}>
            <Button variant="primary" className="w-100">
              Search
            </Button>
          </Grid.Col>
        </Grid.Row> */}
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
        <Card>
          <DataGrid<ExpenceList>
            {...value}
            columns={[
              { id: "1", key: "uid", label: "S.No" },
              { id: "2", key: "empcode", label: "Expence ID" },
              { id: "3", key: "details", label: "Details" },
              { id: "4", key: "amount", label: "Amount" },
              {
                id: "5",
                key: "status",
                label: "Status",
                renderCell: (items) => (
                  <Typography
                    color={
                      items.status === "Approved"
                        ? "success"
                        : items.status === "Declined"
                        ? "danger"
                        : "warning"
                    }
                  >
                    {items.status}
                  </Typography>
                ),
              },
            ]}
          />
        </Card>
      </Stack>
    </>
  );
};

export default Expence;
