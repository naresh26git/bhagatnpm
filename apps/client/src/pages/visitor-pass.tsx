import { VisitorPass } from "server/dist/trpc/routes/visitor-pass/get-many";
import Avatar from "ui/Avatar";
import Button from "ui/Button";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { useAsyncList } from "ui/hooks/UseAsyncList";
import PageHeader from "../components/PageHeader";
import VisitorPassDialog from "../components/VisitorPassDialog";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

const VisitorPasses = () => {
  const auth = useAuthContext();
  const value = useAsyncList<VisitorPass>({
    load: async (states) => {
      try {
        const visitorpass = await client.visitorPass.getMany.mutate();
        console.log(visitorpass);
        return {
          items: visitorpass.items as any,
          totalCount: visitorpass.totalCount,
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
        <Grid.Row>
          <Grid.Col className="py-2" cols={["12", "md-2"]}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Visitor Name"
            />
          </Grid.Col>
          <Grid.Col className="py-2" cols={["12", "md-2"]}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Visitor From"
            />
          </Grid.Col>
          <Grid.Col className="py-2" cols={["12", "md-2"]}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="From Date"
            />
          </Grid.Col>
          <Grid.Row>
            <Grid.Col className="py-2" cols={["12", "md-2"]}>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="In Time"
              />
            </Grid.Col>
            <Grid.Col className="py-2" cols={["12", "md-2"]}>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Out Time"
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
        <PageHeader
          title={<PageHeader.Title></PageHeader.Title>}
          actions={<VisitorPassDialog />}
        />
        <Card>
          <DataGrid<VisitorPass>
            {...value}
            columns={[
              {
                id: "1",
                key: "",
                label: "Visitor Image",
                renderCell: (item) => <Avatar src={item.imageUrl as string} />,
              },
              {
                id: "2",
                key: "name",
                label: "Name",
                renderCell: (item) => (
                  <Typography transform="capitalize">{item.name}</Typography>
                ),
              },
              {
                id: "3",
                key: "fromPlace",
                label: "From Place",
                renderCell: (item) => (
                  <Typography transform="capitalize">
                    {item.fromPlace}
                  </Typography>
                ),
              },
              {
                id: "4",
                key: "",
                label: "Company Name",
                renderCell: (item) => (
                  <Typography transform="capitalize">
                    {item.companies.name}
                  </Typography>
                ),
              },
              {
                id: "5",
                key: "",
                label: "HR Name",
                renderCell: (item) => (
                  <Typography transform="capitalize">
                    {item.hr.user.name}
                  </Typography>
                ),
              },
              // { id: "6", key: "date", label: "FromDate" },
              {
                id: "6",
                key: "mobileNumber",
                label: "Mobile Number",
              },
              {
                id: "7",
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
                id: "8",
                key: "",
                label: "InTime",
                renderCell: (item) => (
                  <>
                    {new Intl.DateTimeFormat("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(item.inTime))}
                  </>
                ),
              },
              {
                id: "9",
                key: "",
                label: "OutTime",
                renderCell: (item) => (
                  <>
                    {item.outTime !== null
                      ? new Intl.DateTimeFormat("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                        }).format(new Date(item.outTime))
                      : ""}
                  </>
                ),
              },
              {
                id: "10",
                key: "reason",
                label: "Reason",
                renderCell: (item) => (
                  <Typography transform="capitalize">{item.reason}</Typography>
                ),
              },
            ]}
          />
        </Card>
      </Stack>
    </>
  );
};

export default VisitorPasses;
