import React from "react";
import Button from "ui/Button";
import Dialog from "ui/Dialog";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
// import { useDialog } from "ui/hooks/UseDialog";
import { Designation } from "server/src/trpc/routes/designation/get-many";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

export type Department = {
  id: number;
  name: string;
};
export const PersonalInfoDialog = () => {
  const auth = useAuthContext();
  // const [userId, setUserId] = React.useState<number>(0);
  const [firstName, setFirstName] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState(`${new Date()}`);
  const [dateOfJoining, setDateOfJoining] = React.useState(`${new Date()}`);

  const [department, setDepartment] = React.useState<Department[]>([]);
  const [departmentId, setDepartmentId] = React.useState<number>();
  const [designation, setDesignation] = React.useState<Designation[]>([]);
  const [designationId, setDesignationId] = React.useState<number>();
  const [reportingManagerId, setReportingManagerId] = React.useState<number>(2);
  // const value = useDialog();

  const AddPersonalInfo = async () => {
    try {
      if (departmentId === undefined) return;
      if (designationId === undefined) return;
      await client.personalInfo.set.mutate({
        // name,
        // userId,
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
  React.useEffect(() => {
    (async () => {
      const department = await client.department.getMany.query();
      setDepartment(department);

      const [firstDepartment] = department;
      if (firstDepartment === undefined) return;
      setDepartmentId(firstDepartment.id);
    })();
  }, []);
  React.useEffect(() => {
    (async () => {
      const designation = await client.designation.getMany.query();
      setDesignation(designation);

      const [firstDesignation] = designation;
      if (firstDesignation === undefined) return;
      setDesignationId(firstDesignation.id);
    })();
  }, []);

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
                    onChange={(event) =>
                      setDepartmentId(parseInt(event.target.value))
                    }
                  >
                    <option value={undefined}>Select a Department</option>
                    {department.map((department) => {
                      return (
                        <option value={department.id}>{department.name}</option>
                      );
                    })}

                    {/* {departmentType.map((dept) => {
                      return <option value={dept.id}>{dept.name}</option>;
                    })} */}
                  </select>
                  <label htmlFor="Department">Department</label>
                </div>
              </Grid.Col>
              <Grid.Col cols={["12", "lg-6"]}>
                <div className="form-floating">
                  <select
                    className="form-control"
                    value={designationId}
                    onChange={(event) =>
                      setDesignationId(parseInt(event.target.value))
                    }
                  >
                    <option value={undefined}>Select a Designation</option>
                    {designation.map((designation) => {
                      return (
                        <option value={designation.id}>
                          {designation.name}
                        </option>
                      );
                    })}

                    {/* {departmentType.map((dept) => {
                      return <option value={dept.id}>{dept.name}</option>;
                    })} */}
                  </select>
                  <label htmlFor="Designation">Designation</label>
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
