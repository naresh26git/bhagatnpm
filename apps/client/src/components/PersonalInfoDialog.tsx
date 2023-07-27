import React from "react";
import Button from "ui/Button";
import Dialog from "ui/Dialog";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
// import { useDialog } from "ui/hooks/UseDialog";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

export type Department = {
  id: number;
  name: string;
};
export const PersonalInfoDialog = () => {
  const auth = useAuthContext();
  const [userId, setUserId] = React.useState<number>(0);
  const [firstName, setFirstName] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState(`${new Date()}`);
  const [dateOfJoining, setDateOfJoining] = React.useState(`${new Date()}`);
  const [departmentId, setDepartmentId] = React.useState<number>(1);
  const [designationId, setDesignationId] = React.useState<number>(1);
  const [reportingManagerId, setReportingManagerId] = React.useState<number>(2);
  // const value = useDialog();
  const [department, setDepartment] = React.useState<Department[]>([]);
  const [departmentType, setDepartmentType] = React.useState<Department[]>([]);
  const AddPersonalInfo = async () => {
    try {
      await client.personalInfo.set.mutate({
        // name,
        userId,
        firstName,
        lastName,
        middleName,
        dateOfBirth,
        dateOfJoining,
        departmentId,
        designationId,
        reportingManagerId,

        // email: email || undefined,,
        // mobile: mobile || undefined,
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
    id: "create-info",
    labelId: "create-info-label",
  };
  const handleDepartmentId = (e: any) => {
    setDepartmentId(e.target.value);
  };

  return (
    <>
      <Dialog.Trigger {...value} variant="primary">
        Add PersonalInfo
      </Dialog.Trigger>

      <Dialog {...value}>
        <Dialog.Header title="Add PersonalInfo" />
        <Dialog.Body>
          <Stack gap="3">
            <Grid.Row gutters="3">
              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                  <label htmlFor="First Name">First Name</label>
                </div>
              </Grid.Col>
              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={middleName}
                    onChange={(event) => setMiddleName(event.target.value)}
                  />
                  <label htmlFor="Middle Name">Middle Name</label>
                </div>
              </Grid.Col>
              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                  <label htmlFor="Last Name">Last Name</label>
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
                  <input
                    type="date"
                    className="form-control"
                    value={dateOfJoining}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => setDateOfJoining(event.target.value)}
                  />
                  <label htmlFor="Date Of Joining">Date Of Joining</label>
                </div>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <select
                    className="form-control"
                    value={departmentId}
                    onChange={(e) => handleDepartmentId(e)}
                  >
                    <option value={1}>Development</option>
                    <option value={2}>Design</option>
                    {/* {departmentType.map((dept) => {
                      return <option value={dept.id}>{dept.name}</option>;
                    })} */}
                  </select>
                  <label htmlFor="Status">Status</label>
                </div>
              </Grid.Col>
              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <select
                    className="form-control"
                    value={designationId}
                    onChange={(e: any) => setDesignationId(e.target.value)}
                  >
                    <option value={1}>Senior Fullstack Developer</option>
                    <option value={1}>Junior UI/UX Designer</option>
                    <option value={1}>Junior Fullstack Developer</option>

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
            onClick={AddPersonalInfo}
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

export default PersonalInfoDialog;
