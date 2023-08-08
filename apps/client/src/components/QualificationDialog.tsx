import React from "react";
import Button from "ui/Button";
import Dialog from "ui/Dialog";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

export const QualificationDialog = () => {
  const auth = useAuthContext();
  const [name, setName] = React.useState("");

  const handleSubmit = async () => {
    try {
      if (name === undefined) return;
      await client.qualifications.set.mutate({
        name,
      });
    } catch (error) {
      handleTRPCError(error, auth);
    }
  };

  const value = {
    id: "create-qualification",
    labelId: "create-qualification-label",
  };

  return (
    <>
      <Dialog.Trigger {...value} variant="primary">
        Add Qualification
      </Dialog.Trigger>
      <Dialog {...value}>
        <Dialog.Header color="primary" title={"Qualification"} />

        <Dialog.Body>
          <Grid>
            <Stack gap="5">
              <Grid.Row gutters="5">
                <Grid.Col cols={["12", "lg-6"]}>
                  <label htmlFor="name">Qualification</label>
                  <input
                    type="text"
                    className="form-control"
                    id="qualification"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Grid.Col>
              </Grid.Row>
            </Stack>
          </Grid>
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

export default QualificationDialog;
