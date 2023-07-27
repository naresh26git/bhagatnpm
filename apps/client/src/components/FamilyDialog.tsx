import React from "react";
import Button from "ui/Button";
import Dialog from "ui/Dialog";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
// import { useDialog } from "ui/hooks/UseDialog";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

export const FamilyDialog = () => {
  const auth = useAuthContext();
  const [userId, setUserId] = React.useState<number>(0);
  const [name, setName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState(`${new Date()}`);
  const [relationshipTypeId, setRelationShipId] = React.useState<number>(1);

  const addFamilyDetails = async () => {
    try {
      await client.familyDetail.set.mutate({
        userId,
        name,
        dateOfBirth,
        relationshipTypeId,
      });
    } catch (error) {
      handleTRPCError(error, auth);
    }
  };
  // const departmentResult = async () =>await client.department.getMany.query()

  // React.useEffect(() => {
  //   setDepartmentType(departmentResult);
  // }, [departmentResult]);

  const value = {
    id: "create-family-info",
    labelId: "create-family-info-label",
  };

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
                    onChange={(e: any) =>
                      setRelationShipId(parseInt(e.target.value))
                    }
                  >
                    <option value={1}>Father</option>
                    <option value={2}>Mother</option>
                    <option value={3}>Gaurdian</option>
                    <option value={4}>Brother</option>
                    <option value={5}>Sister</option>
                    <option value={6}>Spouse</option>
                    <option value={7}>Son</option>
                    <option value={8}>Daughter</option>
                    {/* {departmentType.map((dept) => {
                      return <option value={dept.id}>{dept.name}</option>;
                    })} */}
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
