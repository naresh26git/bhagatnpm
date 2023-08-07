import { useNavigate } from "react-router-dom";
import {
  InputParameters,
  PersonalInfo,
} from "server/dist/trpc/routes/personal-infos/get-many";
import Avatar from "ui/Avatar";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import { AsyncListContextValue, useAsyncList } from "ui/hooks/UseAsyncList";
import PageHeader from "../../components/PageHeader";
import PersonalInfoDialog from "../../components/PersonalInfoDialog";
import ShowIf from "../../components/ShowIf";
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

  const value = useAsyncList<PersonalInfo, InputParameters["sortBy"]>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };

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

  const navigate = useNavigate();

  return (
    <Stack gap="3">
      <ShowIf.Employee>
        <PageHeader
          title={<PageHeader.Title></PageHeader.Title>}
          actions={<PersonalInfoDialog />}
        />
      </ShowIf.Employee>
      <Card>
        <DataGrid<PersonalInfo>
          {...(value as AsyncListContextValue<PersonalInfo>)}
          onRowClick={(item) =>
            navigate("../profile-page", {
              state: item,
              replace: true,
            })
          }
          columns={[
            {
              id: "1",
              key: "userId",
              label: "Emp Code",
              renderCell: (item) => <>{item.user.id}</>,
            },
            {
              id: "2",
              key: "",
              label: "Emp name",
              renderCell: (item) => (
                <>
                  {item.firstName}
                  {item.middleName ? ` ${item.middleName} ` : " "}
                  {item.lastName}
                </>
              ),
              ...value.sort("firstName"),
            },
            {
              id: "3",
              key: "",
              label: "Profile Image",
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
              id: "4",
              key: "firstName",
              label: "First name",
            },
            // {
            //   id: "3",
            //   key: "middleName",
            //   label: "Middle name",
            // },
            {
              id: "5",
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
              ...value.sort("dateOfJoining"),
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
              ...value.sort("dateOfBirth"),
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
          ]}
        />
      </Card>
    </Stack>
  );
};
export default PersonalInfoPage;
