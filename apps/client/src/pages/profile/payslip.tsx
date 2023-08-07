import {
  InputParameters,
  PayRoll,
} from "server/src/trpc/routes/pay-rolls/get-many";
import Card from "ui/Card";
import DataGrid from "ui/DataGrid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { AsyncListContextValue, useAsyncList } from "ui/hooks/UseAsyncList";
import PayRollDetailsDialog from "../../components/PayRollDetailsDialog";
import { useAuthContext } from "../../hooks/UseAuth";
import { client } from "../../main";
import { handleTRPCError } from "../../utils/handle-trpc-error";

const Payslip = () => {
  const auth = useAuthContext();
  const value = useAsyncList<PayRoll, InputParameters["sortBy"]>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };
        const result = await client.payRoll.getMany.mutate(inputParameters);
        console.log(result.items);
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
      {/* <ShowIf.Employee>
        <PageHeader
          title={<PageHeader.Title></PageHeader.Title>}
          actions={<QualificationDialog />}
        />
      </ShowIf.Employee> */}

      <Card>
        <DataGrid<PayRoll>
          {...(value as AsyncListContextValue<PayRoll>)}
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
              label: "Financial Year",
              renderCell: (item) => (
                <>
                  FY{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "2-digit",
                  }).format(new Date().setFullYear(item.year, item.month, 1))}
                </>
              ),
              ...value.sort("year"),
            },
            {
              id: "4",
              key: "",
              label: "Period",
              renderCell: (item) => (
                <>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    year: "2-digit",
                  }).format(new Date().setFullYear(item.year, item.month, 1))}
                </>
              ),
              ...value.sort("month"),
            },
            {
              id: "5",
              key: "",
              label: "Gross Pay",
              renderCell: (item) => (
                <>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "INR",
                  }).format(
                    Number(
                      item.paySlipComponents.reduce((acc, curr) => {
                        return acc + Number(curr.amount);
                      }, 0)
                    )
                  )}
                </>
              ),
            },
            {
              id: "6",
              key: "",
              label: "Status",
              renderCell: (item) => (
                <Typography transform="capitalize">
                  {item.status.name}
                </Typography>
              ),
            },
            {
              id: "7",
              key: "",
              label: "Action",
              renderCell: (item) => (
                <PayRollDetailsDialog payRollDetails={item} />
              ),
            },
          ]}
        />
      </Card>
    </Stack>
  );
};

export default Payslip;
