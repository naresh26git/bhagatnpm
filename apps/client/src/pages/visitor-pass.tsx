import {
  InputParameters,
  VisitorPass,
} from "server/dist/trpc/routes/visitor-pass/get-many";
import Avatar from "ui/Avatar";
import Button from "ui/Button";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { AsyncListContextValue, useAsyncList } from "ui/hooks/UseAsyncList";
import PageHeader from "../components/PageHeader";
import PrintButton from "../components/PrintButton";
import ShowIf from "../components/ShowIf";
import VisitorPassDialog from "../components/VisitorPassDialog";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

export type VisitorPassPageProps = {};

const VisitorPasses = () => {
  const auth = useAuthContext();

  const value = useAsyncList<VisitorPass, InputParameters["sortBy"]>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };

        const result = await client.visitorPass.getMany.mutate(inputParameters);

        return {
          items: result.items as any,
          totalCount: result.totalCount,
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
        <ShowIf.Employee>
          <PageHeader
            title={<PageHeader.Title></PageHeader.Title>}
            actions={
              <Stack orientation="horizontal" gap="3">
                <VisitorPassDialog asyncList={value as AsyncListContextValue} />
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
                <PrintButton />
              </Stack>
            }
          />
        </ShowIf.Admin>
        <Card>
          <DataGrid<VisitorPass>
            {...(value as AsyncListContextValue<VisitorPass>)}
            columns={[
              {
                id: "1",
                key: "",
                label: "Visitor Image",
                renderCell: (item) => (
                  <Stack alignItems="center">
                    <Avatar
                      src={item.imageUrl as string}
                      variant="circle"
                      className="overflow-hidden"
                    />
                  </Stack>
                ),
              },
              {
                id: "2",
                key: "name",
                label: "Name",
                renderCell: (item) => (
                  <Typography transform="capitalize">{item.name}</Typography>
                ),
                ...value.sort("name"),
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
                ...value.sort("fromPlace"),
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
                ...value.sort("companyId"),
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
                ...value.sort("hrId"),
              },
              {
                id: "6",
                key: "mobileNumber",
                label: "Mobile Number",
                ...value.sort("mobileNumber"),
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
                ...value.sort("date"),
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
                ...value.sort("inTime"),
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
                ...value.sort("outTime"),
              },
              {
                id: "10",
                key: "reason",
                label: "Reason",
                renderCell: (item) => (
                  <Typography transform="capitalize">{item.reason}</Typography>
                ),
                ...value.sort("reason"),
              },
            ]}
          />
        </Card>
      </Stack>
    </>
  );
};

export default VisitorPasses;
