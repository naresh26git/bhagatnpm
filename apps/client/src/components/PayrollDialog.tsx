import React from "react";
import { toast } from "react-toastify";
import Button from "ui/Button";
import Dialog from "ui/Dialog";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import { useDialog } from "ui/hooks/UseDialog";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";
export const PayrollDialog = () => {
  const auth = useAuthContext();
  const [role, setRole] = React.useState<"admin" | "employee">("employee");
  const [month, setMonth] = React.useState<string>("");
  const [salaryId, setSalaryId] = React.useState<number>(0);
  const [statusId, setStatusId] = React.useState<number>(1);
  const [amount, setAmount] = React.useState<number>(0);

  const createUser = async () => {
    try {
      await client.payRoll.set.mutate({
        month,
        salaryId,
        statusId,
      });
      toast.success("Payroll added successfully!");
    } catch (error) {
      handleTRPCError(error, auth);
      toast.error("An error occurred!");
    }
  };

  const value = useDialog();

  const handleStatus = (e: any) => {
    setStatusId(e.target.value);
  };
  const handleAmount = (e: any) => {
    setAmount(e.target.value);
  };
  return (
    <>
      <Dialog.Trigger {...value} variant="primary">
        Add Payroll
      </Dialog.Trigger>

      <Dialog {...value}>
        <Dialog.Header title="Add Payroll" />
        <Dialog.Body>
          <Stack gap="3">
            <Grid.Row gutters="3">
              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Doe"
                    value={month}
                    onChange={(event) => setMonth(event.target.value)}
                  />
                  <label htmlFor="Month">Month</label>
                </div>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <select
                    className="form-control"
                    value={statusId}
                    onChange={(e) => handleStatus(e)}
                  >
                    <option value={1}>Success</option>
                    <option value={2}>Pending</option>
                    <option value={3}>Processing</option>
                    <option value={4}>Declined</option>
                  </select>
                  <label htmlFor="Status">Status</label>
                </div>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    value={amount}
                    onChange={handleAmount}
                  />
                  <label htmlFor="email">Salary</label>
                </div>
              </Grid.Col>
            </Grid.Row>
          </Stack>
        </Dialog.Body>
        <Dialog.Footer>
          <Button
            variant="outline-primary"
            data-bs-toggle="modal"
            data-bs-target={`#${value.id}`}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={createUser}
            data-bs-toggle="modal"
            data-bs-target={`#${value.id}`}
          >
            Submit
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};

export default PayrollDialog;
