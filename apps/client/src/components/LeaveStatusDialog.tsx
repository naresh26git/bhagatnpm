import { faCheck, faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { LeaveStatus } from "server/src/trpc/routes/leave-status/get-many";
import Button from "ui/Button";
import Dialog from "ui/Dialog";
import Stack from "ui/Stack";
import { AsyncListContextValue } from "ui/hooks/UseAsyncList";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

export type leaveStatusProps = {
  leaveId: number;
  variant: "admin" | "employee";
  asyncList: AsyncListContextValue;
};

const LeaveStatusDialog = (props: leaveStatusProps) => {
  const auth = useAuthContext();
  const [status, setStatus] = React.useState<LeaveStatus[]>([]);
  const [statusId, setStatusId] = React.useState<number>();
  const [remarks, setRemarks] = React.useState("");
  const [variantType, setVariantType] = React.useState("");
  const value =
    props.variant === "admin"
      ? {
          labelId: "update-leave-status-model",
          id: "update-leave-status-model",
        }
      : {
          labelId: "update-leave-model",
          id: "update-leave-model",
        };
  const handleSubmit = async () => {
    try {
      if (statusId === undefined) return;

      const inputParameters = {
        id: props.leaveId,
        remarks: remarks,
        statusId: statusId,
      };

      await client.leave.adminUpdate.mutate(inputParameters);

      props.asyncList.refresh();
    } catch (error) {
      handleTRPCError(error, auth);
    }
  };

  React.useEffect(() => {
    setVariantType(props.variant);
  }, [props.variant]);
  React.useEffect(() => {
    (async () => {
      const status = await client.leaveStatus.getMany.query();
      setStatus(status);
      const [firstStatus] = status;
      if (firstStatus === undefined) return;
      setStatusId(firstStatus.id);
    })();
  }, []);
  return (
    <>
      <Dialog.Trigger {...value} variant="success">
        {props.variant === "admin" ? (
          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
        )}
      </Dialog.Trigger>
      <Dialog.Trigger {...value} variant="danger">
        {props.variant === "admin" ? (
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
        )}
      </Dialog.Trigger>

      <Dialog {...value}>
        <form onSubmit={handleSubmit} className="was-validated">
          <Dialog.Header title="Add Leave Status" />
          <Dialog.Body>
            <Stack gap="3">
              <Stack>
                <label>Remarks</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Remarks"
                  value={remarks}
                  onChange={(event) => setRemarks(event.target.value)}
                  required
                />
              </Stack>
              <Stack>
                <label htmlFor="status">Status</label>
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
              </Stack>
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
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Button
                variant="primary"
                className="center"
                type="submit"
                data-bs-toggle="modal"
                data-bs-target={`#${value.id}`}
              >
                Confirm
              </Button>
            </div>
          </Dialog.Footer>
        </form>
      </Dialog>
    </>
  );
};

export default LeaveStatusDialog;
