import { FamilyDetail } from "server/dist/trpc/routes/family-details/get-many";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { useAsyncList } from "ui/hooks/UseAsyncList";
import AddFamilyDialog from "../../components/AddFamilyDialog";
import PageHeader from "../../components/PageHeader";
import { useAuthContext } from "../../hooks/UseAuth";
import { client } from "../../main";
import { handleTRPCError } from "../../utils/handle-trpc-error";

export type Family = {
  uid: string;
  relationship: string;
  name: string;
  dob: string;
};

export const family = {
  uid: "1",
  empcode: "1210",
  relationship: "Spouse",
  name: "Sample Spouse Name",
  dob: "12/12/90",
};

export const families = [
  family,
  { ...family, uid: "2" },
  { ...family, uid: "3" },
  { ...family, uid: "4" },
  { ...family, uid: "5" },
  { ...family, uid: "6" },
  { ...family, uid: "7" },
  { ...family, uid: "8" },
  { ...family, uid: "9" },
  { ...family, uid: "10" },
  { ...family, uid: "11" },
  { ...family, uid: "12" },
  { ...family, uid: "13" },
];
export type FamilyPageProps = {};

export const FamilyPage = () => {
  const auth = useAuthContext();

  const value = useAsyncList<FamilyDetail>({
    load: async ({ states }) => {
      try {
        const result = await client.familyDetail.getMany.mutate();

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
      {/* <PageHeader title={<PageHeader.Title>Family</PageHeader.Title>} /> */}
      {/* <Grid.Row>
        <Grid.Col className="py-2" cols={["12", "md-2"]}>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Relation Type"
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
        actions={<AddFamilyDialog />}
      />
      <Card>
        <DataGrid<FamilyDetail>
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
              label: "Relationship Type",
              renderCell: (item) => (
                <Typography transform="capitalize">
                  {item.relationshipType.name}
                </Typography>
              ),
            },
            {
              id: "4",
              key: "name",
              label: "Name",
            },
            {
              id: "5",
              key: "",
              label: "DOB",
              renderCell: (item) => (
                <>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "numeric",
                    year: "numeric",
                    day: "numeric",
                  }).format(new Date(item.dateOfBirth))}
                </>
              ),
            },
          ]}
        />
      </Card>
    </Stack>
  );
};

export default FamilyPage;

// import { FamilyDetail } from "server/dist/trpc/routes/family-details/get-many";
// import Card from "ui/Card";
// import DataGrid from "ui/DataGrid";
// import Stack from "ui/Stack";
// import Typography from "ui/Typography";
// import { useAsyncList } from "ui/hooks/UseAsyncList";
// import PageHeader from "../../components/PageHeader";
// import { useAuthContext } from "../../hooks/UseAuth";
// import { client } from "../../main";
// import { handleTRPCError } from "../../utils/handle-trpc-error";
// export type Family = {
//   uid: string;
//   relationship: string;
//   name: string;
//   dob: string;
// };

// export const family = {
//   uid: "1",
//   empcode: "1210",
//   relationship: "Spouse",
//   name: "Sample Spouse Name",
//   dob: "12/12/90",
// };

// export const families = [
//   family,
//   { ...family, uid: "2" },
//   { ...family, uid: "3" },
//   { ...family, uid: "4" },
//   { ...family, uid: "5" },
//   { ...family, uid: "6" },
//   { ...family, uid: "7" },
//   { ...family, uid: "8" },
//   { ...family, uid: "9" },
//   { ...family, uid: "10" },
//   { ...family, uid: "11" },
//   { ...family, uid: "12" },
//   { ...family, uid: "13" },
// ];
// export type FamilyPageProps = {};

// export const FamilyPage = () => {
//   const auth = useAuthContext();

//   const value = useAsyncList<FamilyDetail>({
//     load: async ({ states }) => {
//       try {
//         const inputParameters = {
//           sortBy: states.sortState?.sortBy,
//           sortOrder: states.sortState?.sortOrder,
//           limit: states.paginationState.limit,
//           page: states.paginationState.page,
//         };

//         console.log({ inputParameters });
//         const result = await client.familyDetail.getMany.mutate(
//           inputParameters
//         );

//         return {
//           totalCount: result.totalCount,
//           items: result.items as any,
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
//       <PageHeader title={<PageHeader.Title>Family</PageHeader.Title>} />

//       <Card>
//         <DataGrid<FamilyDetail>
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
//               label: "Relationship Type",
//               renderCell: (item) => (
//                 <Typography transform="capitalize">
//                   {item.relationshipType.name}
//                 </Typography>
//               ),
//             },
//             {
//               id: "3",
//               key: "name",
//               label: "Name",
//             },
//             {
//               id: "4",
//               key: "",
//               label: "DOB",
//               renderCell: (item) => (
//                 <>
//                   {new Intl.DateTimeFormat("en-US", {
//                     month: "numeric",
//                     year: "numeric",
//                     day: "numeric",
//                   }).format(new Date(item.dateOfBirth))}
//                 </>
//               ),
//             },
//           ]}
//         />
//       </Card>
//     </Stack>
//   );
// };

// export default FamilyPage;
// import { FamilyDetail } from "server/dist/trpc/routes/family-details/get-many";
// import Button from "ui/Button";
// import Card from "ui/Card";
// import DataGrid from "ui/DataGrid";
// import Grid from "ui/Grid";
// import Stack from "ui/Stack";
// import Typography from "ui/Typography";
// import { useAsyncList } from "ui/hooks/UseAsyncList";
// import PageHeader from "../../components/PageHeader";
// import { useAuthContext } from "../../hooks/UseAuth";
// import { client } from "../../main";
// import { handleTRPCError } from "../../utils/handle-trpc-error";

// export type Family = {
//   uid: string;
//   relationship: string;
//   name: string;
//   dob: string;
// };

// export const family = {
//   uid: "1",
//   empcode: "1210",
//   relationship: "Spouse",
//   name: "Sample Spouse Name",
//   dob: "12/12/90",
// };

// export const families = [
//   family,
//   { ...family, uid: "2" },
//   { ...family, uid: "3" },
//   { ...family, uid: "4" },
//   { ...family, uid: "5" },
//   { ...family, uid: "6" },
//   { ...family, uid: "7" },
//   { ...family, uid: "8" },
//   { ...family, uid: "9" },
//   { ...family, uid: "10" },
//   { ...family, uid: "11" },
//   { ...family, uid: "12" },
//   { ...family, uid: "13" },
// ];
// export type FamilyPageProps = {};

// export const FamilyPage = () => {
//   const auth = useAuthContext();

//   const value = useAsyncList<FamilyDetail>({
//     load: async ({ states }) => {
//       try {
//         const familyDetails = await client.familyDetail.getMany.query();

//         return {
//           totalCount: familyDetails.length,
//           items: familyDetails as any,
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
//       <PageHeader title={<PageHeader.Title>Family</PageHeader.Title>} />
//       <Grid.Row>
//         <Grid.Col className="py-2" cols={["12", "md-3"]}>
//           <input
//             type="text"
//             className="form-control form-control-sm"
//             placeholder="Leave Type"
//           />
//         </Grid.Col>
//         <Grid.Col className="py-2" cols={["12", "md-3"]}>
//           <Button variant="primary" className="w-100">
//             Search
//           </Button>
//         </Grid.Col>
//       </Grid.Row>
//       <Card>
//         <DataGrid<FamilyDetail>
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
//               label: "Relationship Type",
//               renderCell: (item) => (
//                 <Typography transform="capitalize">
//                   {item.relationshipType.name}
//                 </Typography>
//               ),
//             },
//             {
//               id: "3",
//               key: "name",
//               label: "Name",
//             },
//             {
//               id: "4",
//               key: "",
//               label: "DOB",
//               renderCell: (item) => (
//                 <>
//                   {new Intl.DateTimeFormat("en-US", {
//                     month: "numeric",
//                     year: "numeric",
//                     day: "numeric",
//                   }).format(new Date(item.dateOfBirth))}
//                 </>
//               ),
//             },
//           ]}
//         />
//       </Card>
//     </Stack>
//   );
// };

// export default FamilyPage;
