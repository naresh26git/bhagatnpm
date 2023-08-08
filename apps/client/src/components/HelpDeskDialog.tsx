import React from "react";
import { HelpdeskCategories } from "server/src/trpc/routes/category/get-many";
import Button from "ui/Button";
import Dialog from "ui/Dialog";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import { useAuthContext } from "../hooks/UseAuth";
import { client } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

export const HelpDeskDialog = () => {
  const auth = useAuthContext();
  const [tittle, setTittle] = React.useState("");
  const [category, setCategory] = React.useState<HelpdeskCategories[]>([]);
  const [categoryId, setCategoryId] = React.useState<number>();
  const [description, setDescription] = React.useState("");

  const create = async () => {
    try {
      if (categoryId === undefined) return;

      await client.helpDesk.set.mutate({
        tittle,
        categoryId,
        description,
      });
    } catch (error) {
      handleTRPCError(error, auth);
    }
  };

  const value = { id: "create-helpdesk", labelId: "create-helpdesk-label" };

  React.useEffect(() => {
    (async () => {
      const helpDeskCategories =
        await client.helpDeskCategories.getMany.query();
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

        <Dialog.Body>
          <Grid>
            <Stack gap="5">
              <Grid.Row gutters="5">
                <Grid.Col cols={["12", "lg-6"]}>
                  <label htmlFor="name">Tittle</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tittle"
                    value={tittle}
                    onChange={(event) => setTittle(event.target.value)}
                  />
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
