import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PersonalInfo } from "server/dist/trpc/routes/personal-infos/get-many";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import { useAsyncList } from "ui/hooks/UseAsyncList";
import AddPersonalInfoDialog from "../../components/AddPersonalInfoDialog";
import PageHeader from "../../components/PageHeader";
import { useAuthContext } from "../../hooks/UseAuth";
import { client } from "../../main";
import { handleTRPCError } from "../../utils/handle-trpc-error";
export const personalInfo = {
  uid: "1",
  userId: "1210",
  firstName: "Vignesh",
  lastName: "S",
  fullName: "Vignesh S",
  middleName: "",
  dateOfJoining: "02/02/2021",
  dateOfBirth: "03/03/1997",
  designation: "Web Devloper",
  department: "IT",
  reportingManager: "Selva",
  status: "Active",
};

export type PersonalInfoType = typeof personalInfo;

export const personalInfos = [
  personalInfo,
  { ...personalInfo, uid: "2" },
  { ...personalInfo, uid: "3" },
  { ...personalInfo, uid: "4" },
  { ...personalInfo, uid: "5" },
  { ...personalInfo, uid: "6" },
  { ...personalInfo, uid: "7" },
  { ...personalInfo, uid: "8" },
  { ...personalInfo, uid: "9" },
  { ...personalInfo, uid: "10" },
  { ...personalInfo, uid: "11" },
  { ...personalInfo, uid: "12" },
  { ...personalInfo, uid: "13" },
];

export type PersonalInfoPageProps = {};

export const PersonalInfoPage = () => {
  const auth = useAuthContext();

  const value = useAsyncList<PersonalInfo>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };

        console.log({ inputParameters });

        const result = await client.personalInfo.getMany.mutate(
          inputParameters
        );

        return {
          totalCount: result.totalCount,
          items: result.items as any,
        };
      } catch (error) {
        handleTRPCError(error, auth);

        return { error: new Error("Something went wrong") };
      }
    },
  });
  const deleteUser = async (id: number) => {
    try {
      // await client.user.remove.mutate(id);
    } catch (error) {
      handleTRPCError(error, auth);

      return { error: new Error("Something went wrong") };
    }
  };
  return (
    <Stack gap="3">
      {/* <PageHeader
        title={<PageHeader.Title></PageHeader.Title>}
        actions={<CreateUserDialog />} */}
      {/* /> */}
      {/* <Grid.Row>
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
      </Grid.Row> */}
      {/* <PageHeader title={<PageHeader.Title>Personal Info</PageHeader.Title>} /> */}
      <PageHeader
        title={<PageHeader.Title></PageHeader.Title>}
        actions={<AddPersonalInfoDialog />}
      />
      <Card>
        <DataGrid<PersonalInfo>
          {...value}
          columns={[
            {
              id: "1",
              key: "userId",
              label: "Emp Code",
              renderCell: (item) => <>{item.id}</>,
            },
            {
              id: "5",
              key: "",
              label: "Emp name",
              renderCell: (item) => (
                <>
                  {item.firstName}
                  {item.middleName ? ` ${item.middleName} ` : " "}
                  {item.lastName}
                </>
              ),
            },
            {
              id: "2",
              key: "firstName",
              label: "First name",
            },
            // {
            //   id: "3",
            //   key: "middleName",
            //   label: "Middle name",
            // },
            {
              id: "4",
              key: "lastName",
              label: "Last name",
            },
            // {
            //   id: "5",
            //   key: "",
            //   label: "Emp Full Name",
            //   renderCell: (item) => (
            //     <>
            //       {item.firstName}
            //       {item.middleName ? ` ${item.middleName} ` : " "}
            //       {item.lastName}
            //     </>
            //   ),
            // },
            {
              id: "6",
              key: "",
              label: "DOJ",
              renderCell: (item) => (
                <>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "numeric",
                    year: "numeric",
                    day: "numeric",
                  }).format(new Date(item.dateOfJoining))}
                </>
              ),
            },
            {
              id: "7",
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
            {
              id: "8",
              key: "",
              label: "Job Tittle",
              renderCell: (item) => <>{item.designation.name}</>,
            },
            {
              id: "9",
              key: "",
              label: "Department",
              renderCell: (item) => <>{item.department.name}</>,
            },
            {
              id: "4",
              key: "delete",
              label: "Delete",
              renderCell: (user) => (
                <FontAwesomeIcon
                  onClick={() => deleteUser(user.id)}
                  icon={faTrash}
                />
              ),
            },
            // {
            //   id: "10",
            //   key: "",
            //   label: "Reporting Manger",
            //   renderCell: (item) => <>{item.reportingManager.name}</>,
            // },
            // {
            //   id: "11",
            //   key: "",
            //   label: "Status",
            //   renderCell: (item) => (
            //     <Typography transform="capitalize">
            //       {item.user.status?.name}
            //     </Typography>
            //   ),
            // },
          ]}
        />
      </Card>
    </Stack>
  );
};
export default PersonalInfoPage;

// import { PersonalInfo } from "server/dist/trpc/routes/personal-infos/get-many";
// import Card from "ui/Card";
// import DataGrid from "ui/DataGrid";
// import Stack from "ui/Stack";
// import Typography from "ui/Typography";
// import { useAsyncList } from "ui/hooks/UseAsyncList";
// import PageHeader from "../../components/PageHeader";
// import { useAuthContext } from "../../hooks/UseAuth";
// import { client } from "../../main";
// import { handleTRPCError } from "../../utils/handle-trpc-error";
// export const personalInfo = {
//   uid: "1",
//   userId: "1210",
//   firstName: "Vignesh",
//   lastName: "S",
//   fullName: "Vignesh S",
//   middleName: "",
//   dateOfJoining: "02/02/2021",
//   dateOfBirth: "03/03/1997",
//   designation: "Web Devloper",
//   department: "IT",
//   reportingManager: "Selva",
//   status: "Active",
// };

// export type PersonalInfoType = typeof personalInfo;

// export const personalInfos = [
//   personalInfo,
//   { ...personalInfo, uid: "2" },
//   { ...personalInfo, uid: "3" },
//   { ...personalInfo, uid: "4" },
//   { ...personalInfo, uid: "5" },
//   { ...personalInfo, uid: "6" },
//   { ...personalInfo, uid: "7" },
//   { ...personalInfo, uid: "8" },
//   { ...personalInfo, uid: "9" },
//   { ...personalInfo, uid: "10" },
//   { ...personalInfo, uid: "11" },
//   { ...personalInfo, uid: "12" },
//   { ...personalInfo, uid: "13" },
// ];

// export type PersonalInfoPageProps = {};

// export const PersonalInfoPage = () => {
//   const auth = useAuthContext();

//   const value = useAsyncList<PersonalInfo>({
//     load: async ({ states }) => {
//       try {
//         const personalInfos = await client.personalInfo.getMany.query();

//         return {
//           totalCount: personalInfos.length,
//           items: personalInfos as any,
//         };
//       } catch (error) {
//         handleTRPCError(error, auth);

//         return { error: new Error("Something went wrong") };
//       }
//     },
//   });

//   return (
//     <Stack gap="3">
//       <PageHeader title={<PageHeader.Title>Personal Info</PageHeader.Title>} />

//       <Card>
//         <DataGrid<PersonalInfo>
//           {...value}
//           columns={[
//             // {
//             //   id: "1",
//             //   key: "userId",
//             //   label: "ID",
//             // },
//             // {
//             //   id: "2",
//             //   key: "firstName",
//             //   label: "FirstName",
//             // },
//             // {
//             //   id: "3",
//             //   key: "middleName",
//             //   label: "MiddleName",
//             // },
//             // {
//             //   id: "4",
//             //   key: "lastName",
//             //   label: "LastName",
//             // },
//             {
//               id: "5",
//               key: "",
//               label: "Emp Full Name",
//               renderCell: (item) => (
//                 <>
//                   {item.firstName}
//                   {item.middleName ? ` ${item.middleName} ` : " "}
//                   {item.lastName}
//                 </>
//               ),
//             },
//             {
//               id: "6",
//               key: "",
//               label: "DOJ",
//               renderCell: (item) => (
//                 <>
//                   {new Intl.DateTimeFormat("en-US", {
//                     month: "numeric",
//                     year: "numeric",
//                     day: "numeric",
//                   }).format(new Date(item.dateOfJoining))}
//                 </>
//               ),
//             },
//             {
//               id: "7",
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
//             {
//               id: "8",
//               key: "",
//               label: "Job",
//               renderCell: (item) => <>{item.designation.name}</>,
//             },
//             {
//               id: "9",
//               key: "",
//               label: "Department",
//               renderCell: (item) => <>{item.department.name}</>,
//             },
//             {
//               id: "10",
//               key: "",
//               label: "Reporting Manger",
//               renderCell: (item) => <>{item.reportingManager.name}</>,
//             },
//             {
//               id: "11",
//               key: "",
//               label: "Status",
//               renderCell: (item) => (
//                 <Typography transform="capitalize">
//                   {item.user.status?.name}
//                 </Typography>
//               ),
//             },
//           ]}
//         />
//       </Card>
//     </Stack>
//   );
// };
// export default PersonalInfoPage;
