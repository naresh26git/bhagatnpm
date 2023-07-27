import { Address } from "server/dist/trpc/routes/addresses/get-many";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { useAsyncList } from "ui/hooks/UseAsyncList";
import ContactDialog from "../../components/ContactDialog";
import PageHeader from "../../components/PageHeader";
import { useAuthContext } from "../../hooks/UseAuth";
import { client } from "../../main";
import { handleTRPCError } from "../../utils/handle-trpc-error";

export type Contact = {
  uid: string;
  empcode: string;
  address: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

export const contact = {
  uid: "1",
  empcode: "1210",
  address: "Communication",
  street: "Sample Street",
  city: "Sample City",
  state: "Sample State",
  country: "Sample Country",
  pincode: "Sample Pincode",
};

export const contacts = [
  contact,
  { ...contact, uid: "2" },
  { ...contact, uid: "3" },
  { ...contact, uid: "4" },
  { ...contact, uid: "5" },
  { ...contact, uid: "6" },
  { ...contact, uid: "7" },
  { ...contact, uid: "8" },
  { ...contact, uid: "9" },
  { ...contact, uid: "10" },
  { ...contact, uid: "11" },
  { ...contact, uid: "12" },
  { ...contact, uid: "13" },
];

export type contactDataPageProps = {};

export const ContactDataPage = () => {
  const auth = useAuthContext();

  const value = useAsyncList<Address>({
    load: async ({ states }) => {
      try {
        const addresses = await client.address.getMany.query();

        return {
          totalCount: addresses.length,
          items: addresses as any,
        };
        // const inputParameters = {
        //   sortBy: states.sortState?.sortBy,
        //   sortOrder: states.sortState?.sortOrder,
        //   limit: states.paginationState.limit,
        //   page: states.paginationState.page,
        // };

        // console.log({ inputParameters });

        // const result = await client.leave.getMany.mutate(inputParameters);

        // console.log({ result });
        // return {
        //   totalCount: result.totalCount,
        //   items: result.items as any,
        // };
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
      {/* <PageHeader title={<PageHeader.Title>Address</PageHeader.Title>} /> */}
      {/* <Grid.Row>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Address Type"
          />
        </Grid.Col>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <Button variant="primary" className="w-100">
            Search
          </Button>
        </Grid.Col>
      </Grid.Row> */}
      <PageHeader
        title={<PageHeader.Title></PageHeader.Title>}
        actions={<ContactDialog />}
      />
      <Card>
        <DataGrid<Address>
          {...value}
          columns={[
            {
              id: "1",
              key: "",
              label: "Emp Code ",
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
              label: "Address Type",
              renderCell: (item) => (
                <Typography transform="capitalize">
                  {item.addressType.name}
                </Typography>
              ),
            },
            {
              id: "4",
              key: "street",
              label: "Street",
            },
            {
              id: "5",
              key: "city",
              label: "City",
            },
            {
              id: "6",
              key: "state",
              label: "State",
            },
            {
              id: "7",
              key: "country",
              label: "Country",
            },
            {
              id: "8",
              key: "pincode",
              label: "Pincode",
            },
          ]}
        />
      </Card>
    </Stack>
  );
};

export default ContactDataPage;
// import { Address } from "server/dist/trpc/routes/addresses/get-many";
// import Card from "ui/Card";
// import DataGrid from "ui/DataGrid";
// import Stack from "ui/Stack";
// import Typography from "ui/Typography";
// import { useAsyncList } from "ui/hooks/UseAsyncList";
// import PageHeader from "../../components/PageHeader";
// import { useAuthContext } from "../../hooks/UseAuth";
// import { client } from "../../main";
// import { handleTRPCError } from "../../utils/handle-trpc-error";
// export type Contact = {
//   uid: string;
//   empcode: string;
//   address: string;
//   street: string;
//   city: string;
//   state: string;
//   country: string;
//   pincode: string;
// };

// export const contact = {
//   uid: "1",
//   empcode: "1210",
//   address: "Communication",
//   street: "Sample Street",
//   city: "Sample City",
//   state: "Sample State",
//   country: "Sample Country",
//   pincode: "Sample Pincode",
// };

// export const contacts = [
//   contact,
//   { ...contact, uid: "2" },
//   { ...contact, uid: "3" },
//   { ...contact, uid: "4" },
//   { ...contact, uid: "5" },
//   { ...contact, uid: "6" },
//   { ...contact, uid: "7" },
//   { ...contact, uid: "8" },
//   { ...contact, uid: "9" },
//   { ...contact, uid: "10" },
//   { ...contact, uid: "11" },
//   { ...contact, uid: "12" },
//   { ...contact, uid: "13" },
// ];

// export type contactDataPageProps = {};

// export const ContactDataPage = () => {
//   const auth = useAuthContext();

//   const value = useAsyncList<Address>({
//     load: async ({ states }) => {
//       try {
//         const addresses = await client.address.getMany.query();

//         return {
//           totalCount: addresses.length,
//           items: addresses as any,
//         };
//       } catch (error) {
//         handleTRPCError(error, auth);

//         return {
//           error: Error("Something went wrong"),
//         };
//       }
//     },
//   });

//   return (
//     <Stack gap="3">
//       <PageHeader title={<PageHeader.Title>Address</PageHeader.Title>} />

//       <Card>
//         <DataGrid<Address>
//           {...value}
//           columns={[
//             {
//               id: "1",
//               key: "",
//               label: "Emp Name",
//               renderCell: (item) => (
//                 <>
//                   {item.user.personalInfo
//                     ? `${item.user.personalInfo.firstName} ${item.user.personalInfo.lastName}`
//                     : ""}
//                 </>
//               ),
//             },
//             {
//               id: "2",
//               key: "",
//               label: "Address Type",
//               renderCell: (item) => (
//                 <Typography transform="capitalize">
//                   {item.addressType.name}
//                 </Typography>
//               ),
//             },
//             {
//               id: "3",
//               key: "street",
//               label: "Street",
//             },
//             {
//               id: "4",
//               key: "city",
//               label: "City",
//             },
//             {
//               id: "5",
//               key: "state",
//               label: "State",
//             },
//             {
//               id: "6",
//               key: "country",
//               label: "Country",
//             },
//             {
//               id: "7",
//               key: "pincode",
//               label: "Pincode",
//             },
//           ]}
//         />
//       </Card>
//     </Stack>
//   );
// };

// export default ContactDataPage;
