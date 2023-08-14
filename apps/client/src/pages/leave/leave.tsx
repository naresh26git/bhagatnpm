import { Leave } from "server/dist/trpc/routes/leaves/get-many";
import Button from "ui/Button";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { AsyncListContextValue } from "ui/hooks/UseAsyncList";
import XLSX from "xlsx";
import LeaveStatusDialog from "../../components/LeaveStatusDialog";
import PageHeader from "../../components/PageHeader";
import PrintButton from "../../components/PrintButton";
import { useAuthContext } from "../../hooks/UseAuth";
import { client } from "../../main";

export type LeaveList = {
  uid: string;
  empcode: string;
  empname: string;
  leavetype: string;
  fromdate: string;
  todate: string;
  status: string;
  remarks: string;
};

export const leave = {
  uid: "1",
  empcode: "1210",
  empname: "Vishnupriya",
  fromdate: "18/04/2023",
  todate: "20/04/2023",
  leavetype: "Sick Leave",
  Status: "Pending",
  remarks: "Kindly consider",
};

export const leaves = [
  leave,
  { ...leave, uid: "2" },
  { ...leave, uid: "3" },
  { ...leave, uid: "4" },
  { ...leave, uid: "5" },
  { ...leave, uid: "6" },
  { ...leave, uid: "7" },
  { ...leave, uid: "8" },
  { ...leave, uid: "9" },
  { ...leave, uid: "10" },
  { ...leave, uid: "11" },
  { ...leave, uid: "12" },
  { ...leave, uid: "13" },
];
export type LeaveViewPageProps = {
  value: AsyncListContextValue;
};

export const LeaveViewPage = ({ value }: LeaveViewPageProps) => {
  const auth = useAuthContext();

  const columns = [
    {
      id: "1",
      key: "",
      label: "Empcode",
      renderCell: (item: Leave) => <>{item.user.id}</>,
    },
    {
      id: "2",
      key: "",
      label: "Emp Name",
      renderCell: (item: Leave) => (
        <>
          {item.user.personalInfo?.firstName} {item.user.personalInfo?.lastName}
        </>
      ),
      ...value.sort("userId"),
    },
    {
      id: "3",
      key: "",
      label: "Requested On",
      renderCell: (item: Leave) => (
        <>
          {" "}
          {new Intl.DateTimeFormat("en-US", {
            month: "numeric",
            year: "numeric",
            day: "numeric",
          }).format(new Date(item.createdAt))}
        </>
      ),
      ...value.sort("createdAt"),
    },
    {
      id: "4",
      key: "",
      label: "Leave Type",
      renderCell: (item: Leave) => <>{item.leaveType.name}</>,
      ...value.sort("leaveTypeId"),
    },

    {
      id: "5",
      key: "",
      label: "From",
      renderCell: (item: Leave) => (
        <>
          {new Intl.DateTimeFormat("en-US", {
            month: "numeric",
            year: "numeric",
            day: "numeric",
          }).format(new Date(item.fromDate))}
        </>
      ),
      ...value.sort("fromDate"),
    },
    {
      id: "6",
      key: "",
      label: "To",
      renderCell: (item: Leave) => (
        <>
          {new Intl.DateTimeFormat("en-US", {
            month: "numeric",
            year: "numeric",
            day: "numeric",
          }).format(new Date(item.toDate))}
        </>
      ),
      ...value.sort("toDate"),
    },
    {
      id: "7",
      key: "noOfDays",
      label: "Days",
      renderCell: (item: Leave) => <>{item.noOfDays}</>,
      ...value.sort("noOfDays"),
    },
    {
      id: "8",
      key: "remarks",
      label: "Remarks",
      ...value.sort("remarks"),
    },
    {
      id: "8",
      key: "",
      label: "Status",
      renderCell: (item: Leave) => (
        <Typography
          transform="capitalize"
          color={
            item.status.name === "accepted"
              ? "success"
              : item.status.name === "rejected"
              ? "danger"
              : "warning"
          }
        >
          {item.status.name}
        </Typography>
      ),
      ...value.sort("statusId"),
    },
    {
      id: "9",
      key: "",
      label: "Action",
      renderCell: (item: Leave) => (
        <>
          <LeaveStatusDialog
            variant={
              auth.state.user?.role.name === "admin" ? "admin" : "employee"
            }
            leaveId={item.id}
            asyncList={value as AsyncListContextValue}
          />
        </>
      ),
    },
  ];

  const handleExport = async () => {
    try {
      const data = await client.leave.getMany.mutate({
        fromDate: new Date(
          new Date(
            new Date().setFullYear(
              new Date().getFullYear(),
              new Date().getMonth(),
              1
            )
          ).setHours(0, 0, 0, 0)
        ),
        toDate: new Date(
          new Date(
            new Date().setFullYear(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              1
            )
          ).setHours(0, 0, 0, 0)
        ),
      });

      const leaves = data.items.map((item) => ({
        "Emp Code": item.user.id,
        "Emp Name":
          item.user.personalInfo?.firstName && item.user.personalInfo.lastName
            ? `${item.user.personalInfo?.firstName} ${item.user.personalInfo?.lastName}`
            : item.user.name,
        "Requested On": item.createdAt,
        "Leave Type": item.leaveType.name,
        From: item.fromDate,
        To: item.toDate,
        Days: item.noOfDays,
        Remarks: item.remarks,
        Status: item.status.name,
      }));

      const worksheet = XLSX.utils.json_to_sheet(leaves);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "leaves");
      XLSX.writeFile(workbook, "leaves.xlsx", { compression: true });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Stack gap="3">
      <PageHeader
        title={<PageHeader.Title></PageHeader.Title>}
        actions={
          <Stack orientation="horizontal" gap="3">
            <Button variant="primary" onClick={handleExport}>
              Export
            </Button>
            <PrintButton />
          </Stack>
        }
      />
      <Card id="section-to-print">
        <DataGrid<Leave>
          {...(value as AsyncListContextValue<Leave>)}
          columns={columns.filter((column) => {
            if (column.label !== "Action") return true;
            if (auth.state.user?.role.name === "admin") return true;

            return false;
          })}
        />
      </Card>
    </Stack>
  );
};
export default LeaveViewPage;
