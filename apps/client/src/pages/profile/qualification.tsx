import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import { useAsyncList } from "ui/hooks/UseAsyncList";
export type Qualification = {
  uid: string;
  empcode: string;
  firstname: string;
  designation: string;
  x: string;
  xii: string;
  degree: string;
  status: string;
};

export const qualification = {
  uid: "1",
  empcode: "0001",
  firstname: "murali",
  designation: "Software developer",
  x: "2010",
  xii: "2012",
  degree: "2016",
  status: "Pending",
};

export const qualifications = [
  qualification,
  { ...qualification, uid: "2" },
  { ...qualification, uid: "3" },
  { ...qualification, uid: "4" },
  { ...qualification, uid: "5" },
  { ...qualification, uid: "6" },
  { ...qualification, uid: "7" },
  { ...qualification, uid: "8" },
  { ...qualification, uid: "9" },
  { ...qualification, uid: "10" },
  { ...qualification, uid: "11" },
  { ...qualification, uid: "12" },
  { ...qualification, uid: "13" },
];

export type QualificationPageProps = {};

export const QualificationPage = () => {
  const value = useAsyncList<Qualification>({
    load: async ({ states }) => {
      const url = new URL("/api/v1/qualifications", document.baseURI);

      url.searchParams.set("page", String(states.paginationState.page));
      url.searchParams.set("limit", String(states.paginationState.limit));

      if (states.sortState) {
        url.searchParams.set("sortBy", states.sortState.sortBy);
        url.searchParams.set("sortOrder", states.sortState.sortOrder);
      }

      try {
        const response = await fetch(url);
        if (response.ok) {
          const { totalCount, items } = await response.json();
          return {
            totalCount,
            items,
          };
        }

        return {
          error: Error("Something went wrong"),
        };
      } catch (error) {
        return {
          error: Error("Something went wrong"),
        };
      }
    },
  });
  return (
    <Stack gap="3">
      {/* <Grid.Row>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="From Date"
          />
        </Grid.Col>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="To Date"
          />
        </Grid.Col>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Category"
          />
        </Grid.Col>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <Button variant="primary" className="w-100">
            Search
          </Button>
        </Grid.Col>
      </Grid.Row>
      <Typography color="primary">Create</Typography> */}

      <Card>
        <DataGrid<Qualification>
          {...value}
          columns={[
            {
              id: "1",
              key: "empcode",
              label: "Empcode",
            },
            {
              id: "2",
              key: "first name",
              label: "First name",
            },
            {
              id: "3",
              key: "designation",
              label: "Designation",
            },
            {
              id: "4",
              key: "10th",
              label: "10th",
            },
            {
              id: "5",
              key: "12th",
              label: "12th",
            },
            {
              id: "6",
              key: "degree",
              label: "Degree",
            },
            {
              id: "7",
              key: "department",
              label: "Depaetment",
            },
            // {
            //   id: "8",
            //   key: "status",
            //   label: "Status",
            //   renderCell: (item) => (
            //     <Typography
            //       transform="capitalize"
            //       color={
            //         item.status === "present"
            //           ? "success"
            //           : item.status === "rejected"
            //           ? "danger"
            //           : "warning"
            //       }
            //     >
            //       {item.status}
            //     </Typography>
            //   ),
            // },
          ]}
        />
      </Card>
    </Stack>
  );
};

export default QualificationPage;
