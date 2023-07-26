import { Identification } from "server/dist/trpc/routes/identification/get-many";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { useAsyncList } from "ui/hooks/UseAsyncList";
import IdentificationDialog from "../../components/IdentificationDialog";
import PageHeader from "../../components/PageHeader";
import ShowIf from "../../components/ShowIf";
import { useAuthContext } from "../../hooks/UseAuth";
import { client } from "../../main";
import { handleTRPCError } from "../../utils/handle-trpc-error";

const Identifications = () => {
  const auth = useAuthContext();
  const value = useAsyncList<Identification>({
    load: async (states) => {
      try {
        const identification = await client.identification.getMany.mutate();
        console.log(identification);
        return {
          items: identification.items as any,
          totalCount: identification.totalCount,
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
        <ShowIf.Employee>
          <PageHeader
            title={<PageHeader.Title></PageHeader.Title>}
            actions={<IdentificationDialog />}
          />
        </ShowIf.Employee>

        <Card>
          <DataGrid<Identification>
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
                  <Typography transform="capitalize">
                    {item.user.personalInfo?.firstName}{" "}
                    {item.user.personalInfo?.lastName}
                  </Typography>
                ),
              },
              {
                id: "3",
                key: "",
                label: "Identification Type",
                renderCell: (item) => (
                  <Typography transform="capitalize">
                    {item.type.name}
                  </Typography>
                ),
              },
              {
                id: "4",
                key: "",
                label: "Identification Number",
                renderCell: (item) => (
                  <Typography transform="capitalize">{item.number}</Typography>
                ),
              },

              // { id: "6", key: "date", label: "FromDate" },
            ]}
          />
        </Card>
      </Stack>
    </>
  );
};

export default Identifications;
