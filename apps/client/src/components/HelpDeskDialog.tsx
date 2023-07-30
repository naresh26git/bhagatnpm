import React from "react";
import Button from "ui/Button";
import Dialog from "ui/Dialog";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import { client } from "../main";
// import { useDialog } from "ui/hooks/UseDialog";
import { HelpdeskCategories } from "server/src/trpc/routes/category/get-many";
import { useAuthContext } from "../hooks/UseAuth";
import { handleTRPCError } from "../utils/handle-trpc-error";
export const HelpDeskDialog = () => {
  const auth = useAuthContext();
  const [tittle, setTittle] = React.useState("");
  const [category, setCategory] = React.useState<HelpdeskCategories[]>([]);
  const [categoryId, setCategoryId] = React.useState<number>();
  const [description, setDescription] = React.useState("");

  // const [role, setRole] = React.useState<"admin" | "employee">("employee");
  // const [name, setName] = React.useState("");
  // const [username, setUsername] = React.useState("");
  // const [password, setPassword] = React.useState("");
  // const [email, setEmail] = React.useState("");
  // const [mobile, setMobile] = React.useState("");

  // const value = useDialog();

  const create = async () => {
    try {
      console.log({ categoryId });

      if (categoryId === undefined) return;

      await client.helpDesk.set.mutate({
        tittle,
        categoryId,
        description,
      });
    } catch (error) {
      handleTRPCError(error, auth);
      console.log(error);
    }
  };

  const value = { id: "create-helpdesk", labelId: "create-helpdesk-label" };

  React.useEffect(() => {
    (async () => {
      const helpDeskCategories =
        await client.identificationTypes.getMany.query();
      setCategory(helpDeskCategories);

      const [firstCategory] = helpDeskCategories;
      if (firstCategory === undefined) return;
      setCategoryId(firstCategory.id);
    })();
  }, []);
  return (
    <>
      <Dialog.Trigger {...value} variant="primary">
        Add HeskDesk
      </Dialog.Trigger>
      <Dialog {...value}>
        <Dialog.Header color="primary" title={"HELP DESK"} />
        {/* <Typography as="span" color="primary">
          Help Desk
        </Typography> */}

        <Dialog.Body>
          <Grid>
            <Stack gap="5">
              {/* <div>
              <Typography as="h6" color="secondary">
                Role
              </Typography>

              <div className="btn-group" role="group" data-toggle="buttons">
                <input
                  type="radio"
                  className="btn-check"
                  name="role"
                  id="employee"
                  autoComplete="off"
                  checked={role === "employee"}
                  onChange={() => setRole("employee")}
                />
                <label className="btn btn-outline-primary" htmlFor="employee">
                  Employee
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="role"
                  id="admin"
                  autoComplete="off"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                />
                <label className="btn btn-outline-primary" htmlFor="admin">
                  Admin
                </label>
              </div>
            </div> */}

              <Grid.Row gutters="5">
                <Grid.Col cols={["12", "lg-6"]}>
                  {/* <div className="form-floating"> */}
                  <label htmlFor="name">Tittle</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tittle"
                    value={tittle}
                    onChange={(event) => setTittle(event.target.value)}
                  />

                  {/* </div> */}
                </Grid.Col>

                <Grid.Col cols={["12", "lg-6"]}>
                  <label htmlFor="username">Category</label>
                  <div>
                    <select
                      className="form-control"
                      value={categoryId}
                      onChange={(e) => setCategoryId(parseInt(e.target.value))}
                    >
                      <option value={undefined}>Select Category</option>
                      {category.map((category) => {
                        return (
                          <option value={category.id}>{category.name}</option>
                        );
                      })}
                    </select>
                  </div>
                </Grid.Col>

                <Grid.Col cols={["12", "xl-12"]}>
                  <label htmlFor="description">Description</label>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      //
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </div>
                </Grid.Col>
              </Grid.Row>
            </Stack>
          </Grid>
        </Dialog.Body>
        <Dialog.Footer>
          {/* <Button
            variant="outline-primary"
            data-bs-toggle="modal"
            data-bs-target={`#${value.id}`}
          >
            Cancel
          </Button> */}
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
              onClick={create}
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

export default HelpDeskDialog;
