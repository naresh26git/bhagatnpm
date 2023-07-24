import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import IconButton from "ui/IconButton";
import Link from "ui/Link";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { useAsyncList } from "ui/hooks/UseAsyncList";
export type ExpenceList = {
  uid: string;
  empcode: string;
  details: string;
  amount: string;
  fromdate: string;
  todate: string;
  status: string;
};
export const expence = [
  {
    uid: "1",
    empcode: "1210",
    details: "Trip to Kerala",
    fromdate: "10/02/2023",
    todate: "17/02/2023",
    status: "Approved",
  },
  {
    uid: "2",
    empcode: "1342",
    details: "Trip to Ooty",
    fromdate: "22/05/2023",
    todate: "26/05/2023",
    status: "Declined",
  },
  {
    uid: "3",
    empcode: "1123",
    details: "Trip to Maharastra",
    fromdate: "02/07/2023",
    todate: "08/07/2023",
    status: "Approved",
  },
  {
    uid: "4",
    empcode: "1986",
    details: "Trip to Kanyakumari",
    fromdate: "25/01/2023",
    todate: "28/01/2023",
    status: "Pending",
  },
];
const Travel = () => {
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
        <Stack orientation="horizontal" gap="2">
          <input
            type="text"
            className="form-control form-control-sm rounded-pill w-25"
            placeholder="Search"
          />
          <Link className="bg-primary" color="light" component={IconButton}>
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </Link>
        </Stack>
        <Card>
          <DataGrid<ExpenceList>
            {...value}
            columns={[
              { id: "1", key: "uid", label: "S.No" },
              { id: "2", key: "empcode", label: "Travel ID" },
              { id: "3", key: "details", label: "Details" },
              { id: "4", key: "fromdate", label: "From" },
              { id: "5", key: "todate", label: "To" },
              {
                id: "6",
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

export default Travel;

// import Typography from "ui/Typography";
// export const TravelPage = () => {
//   return (
//     <>
//       <img
//         src="/images/404-image.png"
//         className="rounded mx-auto d-block h-75"
//       />
//       <Typography as="h1" align="center">
//         page not found
//       </Typography>
//     </>
//   );
// };

// export default TravelPage;
