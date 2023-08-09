import React from "react";
import { IdentificationTypes } from "server/src/trpc/routes/identification/identificationType/get-many";
import Button from "ui/Button";
import Dialog, { DialogHeader } from "ui/Dialog";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { AsyncListContextValue } from "ui/hooks/UseAsyncList";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

export type IdentificationDialogProps = {
  asyncList: AsyncListContextValue;
};

export const IdentificationDialog = (props: IdentificationDialogProps) => {
  const auth = useAuthContext();
  const [number, setNumber] = React.useState("");
  const [typeId, setTypeId] = React.useState<number>();
  const [type, setType] = React.useState<IdentificationTypes[]>([]);

  const handleSubmit = async () => {
    try {
      if (typeId === undefined) return;

      await client.identification.set.mutate({
        typeId,
        number,
      });

      props.asyncList.refresh();
    } catch (error) {
      handleTRPCError(error, auth);
    }
  };

  const value = {
    id: "create-identification",
    labelId: "create-identification-label",
  };

  React.useEffect(() => {
    (async () => {
      const identificationTypes =
        await client.identificationTypes.getMany.query();
      setType(identificationTypes);

      const [firstCompany] = identificationTypes;
      if (firstCompany === undefined) return;
      setTypeId(firstCompany.id);
    })();
  }, []);

  return (
    <>
      <Dialog.Trigger {...value} variant="primary">
        Add Identification
      </Dialog.Trigger>

      <Dialog {...value}>
        <DialogHeader title="VisitorPass" />
        <Dialog.Body>
          <Stack gap="3">
            <Grid.Row gutters="3">
              <Grid.Col cols={["12", "lg-6"]}>
                <label htmlFor="First Name">
                  <Typography fontWeight="bolder">
                    Identification Name
                  </Typography>{" "}
                </label>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id="number"
                    value={number}
                    onChange={(event) => setNumber(event.target.value)}
                  />
                </div>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <label htmlFor="username">
                  <Typography fontWeight="bolder">
                    Identification Type
                  </Typography>
                </label>
                <div>
                  <select
                    className="form-control"
                    value={typeId}
                    onChange={(e) => setTypeId(parseInt(e.target.value))}
                  >
                    <option value={undefined}>Select IdentificationType</option>
                    {type.map((identification, index) => {
                      return (
                        <option value={identification.id}>
                          {identification.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </Grid.Col>
            </Grid.Row>
          </Stack>
        </Dialog.Body>
        <Dialog.Footer>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Button
              variant="outline-primary"
              data-bs-toggle="modal"
              data-bs-target={`#${value.id}`}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="center"
              onClick={handleSubmit}
              data-bs-toggle="modal"
              data-bs-target={`#${value.id}`}
            >
              Confirm
            </Button>
          </div>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};

export default IdentificationDialog;
