import React from "react";
import Button from "ui/Button";
import Dialog from "ui/Dialog";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
// import { useDialog } from "ui/hooks/UseDialog";
import { TimeSheetStatus } from "server/dist/trpc/routes/timesheet-status/get-many";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

// export type CreateDialogProps = { variant: "update" | "create" };
export const TimesheetDialog = () => {
  const auth = useAuthContext();
  const [inTime, setInTime] = React.useState<string>(`${new Date()}`);
  const [outTime, setOutTime] = React.useState<string>(`${new Date()}`);
  const [statusId, setStatusId] = React.useState<number>();
  const [status, setStatus] = React.useState<TimeSheetStatus[]>([]);
  // const value = useDialog();

  const createUser = async () => {
    try {
      if (statusId === undefined) return;

      await client.timeSheet.set.mutate({
        // name,
        inTime,
        outTime,
        statusId,

        // email: email || undefined,
        // mobile: mobile || undefined,
      });
    } catch (error) {
      handleTRPCError(error, auth);
    }
  };

  const value = {
    id: "create-payroll",
    labelId: "create-payroll-label",
  };
  const handleStatus = (e: any) => {
    setStatusId(e.target.value);
  };
  React.useEffect(() => {
    (async () => {
      const status = await client.timeSheetStatus.getMany.query();
      setStatus(status);
      const [firstStatus] = status;
      if (firstStatus === undefined) return;
      setStatusId(firstStatus.id);
    })();
  }, []);

  return (
    <>
      <Dialog.Trigger {...value} variant="primary">
        Add Timesheet
      </Dialog.Trigger>

      <Dialog {...value}>
        <Dialog.Header title="Add Timesheet" />
        <Dialog.Body>
          <Stack gap="3">
            <Grid.Row gutters="3">
              {/* <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="John"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label htmlFor="name">Name</label>
                </div>
              </Grid.Col> */}

              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <input
                    type="date-time"
                    className="form-control"
                    value={inTime}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setInTime(event.target.value)
                    }
                  />
                  <label htmlFor="InTime">Check IN</label>
                </div>
              </Grid.Col>
              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <input
                    type="date-time"
                    className="form-control"
                    value={outTime}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setOutTime(event.target.value)
                    }
                  />
                  <label htmlFor="OutTime">Check OUT</label>
                </div>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <select
                    className="form-control"
                    value={statusId}
                    onChange={(event) =>
                      setStatusId(parseInt(event.target.value))
                    }
                  >
                    {status.map((status) => {
                      return <option value={status.id}>{status.name}</option>;
                    })}
                  </select>
                  <label htmlFor="Status">Status</label>
                </div>

                {/* <div className="form-floating">
                  <input
                    type="number"
                    className="form-control"
                    id="password"
                    placeholder="********"
                    value={statusId}
                    onChange={(event) =>
                      setStatusId(event.target .value as number)
                    }
                  />
                  <label htmlFor="password">Password</label>
                </div> */}
              </Grid.Col>
            </Grid.Row>

            <Grid.Row gutters="3">
              {/* <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    placeholder="+919876543210"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                  />
                  <label htmlFor="mobile">Mobile</label>
                </div>
              </Grid.Col> */}
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

export default TimesheetDialog;