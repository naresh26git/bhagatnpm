import {
  InputParameters,
  Leave,
} from "server/dist/trpc/routes/leaves/get-many";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import { AsyncListContextValue, useAsyncList } from "ui/hooks/UseAsyncList";
import PageHeader from "../../components/PageHeader";
import PrintButton from "../../components/PrintButton";
import { useAuthContext } from "../../hooks/UseAuth";
import { client } from "../../main";
import { handleTRPCError } from "../../utils/handle-trpc-error";

export type LeaveItem = {
  uid: string;
  empcode: string;
  leavetype: string;
  availableunits: string;
  balanceunits: string;
  underapproval: string;
};

export const leaveBalance = {
  uid: "1",
  empcode: "1210",
  leavetype: "Sick Leave",
  availableunits: "50",
  balanceunits: "40",
  underapproval: "Pending",
};

export const leaveBalances = [
  leaveBalance,
  { ...leaveBalance, uid: "2" },
  { ...leaveBalance, uid: "3" },
  { ...leaveBalance, uid: "4" },
  { ...leaveBalance, uid: "5" },
  { ...leaveBalance, uid: "6" },
  { ...leaveBalance, uid: "7" },
  { ...leaveBalance, uid: "8" },
  { ...leaveBalance, uid: "9" },
  { ...leaveBalance, uid: "10" },
  { ...leaveBalance, uid: "11" },
  { ...leaveBalance, uid: "12" },
  { ...leaveBalance, uid: "13" },
];

export type LeaveBalancePageProps = {};

export const LeaveBalancePage = () => {
  const auth = useAuthContext();

  const value = useAsyncList<Leave, InputParameters["sortBy"]>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };

        const result = await client.leave.getMany.mutate(inputParameters);

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
  return (
    <Stack gap="3">
      <PageHeader title={<PageHeader.Title />} actions={<PrintButton />} />
      <Card>
        <DataGrid<Leave>
          {...(value as AsyncListContextValue<Leave>)}
          columns={[
            {
              id: "1",
              key: "",
              label: "Emp code",
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
              ...value.sort("userId"),
            },
            {
              id: "3",
              key: "",
              label: "Leave Type",
              renderCell: (item) => <>{item.leaveType.name}</>,
              ...value.sort("leaveTypeId"),
            },
            {
              id: "4",
              key: "",
              label: "Available Units",
              renderCell: (item) => <>{item.leaveType.daysAlloted}</>,
              ...value.sort("daysAlloted"),
            },
            {
              id: "5",
              key: "",
              label: "Balance Units",
              renderCell: (item) => (
                <>
                  {Number(item.leaveType.daysAlloted) - Number(item.noOfDays)}
                </>
              ),
            },
          ]}
        />
      </Card>
    </Stack>
  );
};

export default LeaveBalancePage;
