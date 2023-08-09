import React from "react";
import { RelationShip } from "server/src/trpc/routes/relationship/get-many";
import Button from "ui/Button";
import Dialog from "ui/Dialog";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import { AsyncListContextValue } from "ui/hooks/UseAsyncList";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

export type FamilyDialogProps = {
  asyncList: AsyncListContextValue;
};

export const FamilyDialog = (props: FamilyDialogProps) => {
  const auth = useAuthContext();
  const [name, setName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState(`${new Date()}`);
  const [relationShip, setRelation] = React.useState<RelationShip[]>([]);
  const [relationshipTypeId, setRelationShipTypeId] = React.useState<number>();

  const addFamilyDetails = async () => {
    try {
      if (relationshipTypeId === undefined) return;

      await client.familyDetail.set.mutate({
        name,
        dateOfBirth,
        relationshipTypeId,
      });

      props.asyncList.refresh();
    } catch (error) {
      handleTRPCError(error, auth);
    }
  };

  const value = {
    id: "create-family-info",
    labelId: "create-family-info-label",
  };
  React.useEffect(() => {
    (async () => {
      const relationShip = await client.relationShip.getMany.query();
      setRelation(relationShip);

      const [firstCategory] = relationShip;
      if (firstCategory === undefined) return;
      setRelationShipTypeId(firstCategory.id);
    })();
  }, []);
  return (
    <>
      <Dialog.Trigger {...value} variant="primary">
        Add Family
      </Dialog.Trigger>

      <Dialog {...value}>
        <Dialog.Header title="Add Family" />
        <Dialog.Body>
          <Stack gap="3">
            <Grid.Row gutters="3">
              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label htmlFor="Name">Name</label>
                </div>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <input
                    type="date"
                    className="form-control"
                    value={dateOfBirth}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => setDateOfBirth(event.target.value)}
                  />
                  <label htmlFor="DateOfBirth">Date Of Birth</label>
                </div>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <select
                    className="form-control"
                    value={relationshipTypeId}
                    onChange={(event) =>
                      setRelationShipTypeId(parseInt(event.target.value))
                    }
                  >
                    <option value={undefined}>Select a Relation</option>
                    {relationShip.map((relation) => {
                      return (
                        <option value={relation.id}>{relation.name} </option>
                      );
                    })}
                  </select>
                  <label htmlFor="Relation">Relation</label>
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
            onClick={addFamilyDetails}
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

export default FamilyDialog;
