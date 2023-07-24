import React from "react";
import Button from "ui/Button";
import Dialog from "ui/Dialog";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
// import { useDialog } from "ui/hooks/UseDialog";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

// export type CreateDialogProps = { variant: "update" | "create" };
export const AddLeaveDialog = () => {
  const auth = useAuthContext();
  const [fromDate, setFromDate] = React.useState(`${new Date()}`);
  const [toDate, setToDate] = React.useState(`${new Date()}`);
  const [leaveTypeId, setLeaveTypeId] = React.useState<number>(1);
  const [statusId, setStatusId] = React.useState<number>(1);
  const [noOfDays, setNoOfDays] = React.useState<number>(0);
  const [remarks, setRemarks] = React.useState<string>("");
  // const value = useDialog();
  console.log(fromDate);
  const addLeaves = async () => {
    try {
      await client.leave.set.mutate({
        // name,
        noOfDays,
        fromDate,
        toDate,
        leaveTypeId,
        remarks,
        statusId,

        // email: email || undefined,
        // mobile: mobile || undefined,
      });
    } catch (error) {
      handleTRPCError(error, auth);
    }
  };

  const value = {
    id: "create-leave",
    labelId: "create-leave-label",
  };
  const handleStatus = (e: any) => {
    setStatusId(e.target.value);
  };
  const handleLeaveType = (e: any) => {
    setLeaveTypeId(e.target.value);
  };

  return (
    <>
      <Dialog.Trigger {...value} variant="primary">
        Add Leave
      </Dialog.Trigger>

      <Dialog {...value}>
        <Dialog.Header title="Add Leave" />
        <Dialog.Body>
          <Stack gap="3">
            <Grid.Row gutters="3">
              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control"
                    value={noOfDays}
                    onChange={(event) =>
                      setNoOfDays(parseInt(event.target.value))
                    }
                  />
                  <label htmlFor="NoOfDays">No Of Days</label>
                </div>
              </Grid.Col>
              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <input
                    type="date"
                    className="form-control"
                    value={fromDate}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => setFromDate(event.target.value)}
                  />
                  <label htmlFor="From Date">From Date</label>
                </div>
              </Grid.Col>
              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <input
                    type="date"
                    className="form-control"
                    value={toDate}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => setToDate(event.target.value)}
                  />
                  <label htmlFor="TO Date">To Date</label>
                </div>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <select
                    className="form-control"
                    value={statusId}
                    onChange={(e) => handleLeaveType(e)}
                  >
                    <option value={1}>Sick Leave</option>
                    <option value={2}>Casual Leave</option>
                  </select>
                  <label htmlFor="Leave Type">Leave Type</label>
                </div>
              </Grid.Col>
              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    value={remarks}
                    onChange={(event) => setRemarks(event.target.value)}
                  />
                  <label htmlFor="Remarks">Remarks</label>
                </div>
              </Grid.Col>
              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <select
                    className="form-control"
                    value={statusId}
                    onChange={(e) => handleStatus(e)}
                  >
                    <option value={1}>Pending</option>
                    <option value={2}>Accepted</option>
                    <option value={3}>Rejected</option>
                  </select>
                  <label htmlFor="Status">Status</label>
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
            onClick={addLeaves}
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

export default AddLeaveDialog;
