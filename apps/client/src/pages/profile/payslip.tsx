import { PaySlip } from "server/src/trpc/routes/pay-slip/get-many";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import { useAsyncList } from "ui/hooks/UseAsyncList";
import { useAuthContext } from "../../hooks/UseAuth";
import { client } from "../../main";
import { handleTRPCError } from "../../utils/handle-trpc-error";

const Payslip = () => {
  const auth = useAuthContext();
  const value = useAsyncList<PaySlip>({
    load: async (states) => {
      try {
        const payslip = await client.paySlip.getMany.mutate();
        console.log(payslip);
        return {
          items: payslip.items as any,
          totalCount: payslip.totalCount,
        };
      } catch (error) {
        handleTRPCError(error, auth);

        return {
          error: Error("Something went wrong"),
        };
      }
    },
  });
  const getMonth = (monthName: any) => {
    new Date().setMonth(monthName);

    const date = new Date();
    date.setMonth(6);

    return date.toLocaleString("en-US", { month: "short" });
  };

  return (
    <Stack gap="3">
      {/* <ShowIf.Employee>
        <PageHeader
          title={<PageHeader.Title></PageHeader.Title>}
          actions={<QualificationDialog />}
        />
      </ShowIf.Employee> */}

      <Card>
        <DataGrid<PaySlip>
          {...value}
          columns={[
            {
              id: "1",
              key: "",
              label: "Emp code",
              renderCell: (item) => <>{item.userId}</>,
            },

            // {
            //   id: "2",
            //   key: "",
            //   label: "Emp Name",
            //   renderCell: (item) => (
            //     <>
            //       {item.user.personalInfo
            //         ? `${item.user.personalInfo.firstName} ${item.user.personalInfo.lastName}`
            //         : ""}
            //     </>
            //   ),
            // },
            {
              id: "3",
              key: "year",
              label: "Financial Year",
            },
            {
              id: "4",
              key: "month",
              label: "Period",
              renderCell: (item) => <>{getMonth(item.month)}</>,
            },
            {
              id: "5",
              key: "",
              label: "Gross Pay",
              renderCell: (item) => <>{item._sum.amount}</>,
            },
            // {
            //   id: "6",
            //   key: "",
            //   label: "Pay Slip",
            // },
          ]}
        />
      </Card>
    </Stack>
  );
};

export default Payslip;
