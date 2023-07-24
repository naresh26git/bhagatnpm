import Card from "ui/Card";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import Info from "../../components/Info";
import PageHeader from "../../components/PageHeader";
import { useAuthContext } from "../../hooks/UseAuth";

export const AccountPage = () => {
  const auth = useAuthContext();

  return (
    <>
      <Stack gap="3">
        <PageHeader title={<PageHeader.Title>Account</PageHeader.Title>} />

        <Card>
          <Card.Body>
            <Grid.Row gutters="3">
              <Grid.Col cols={["12", "lg-6"]}>
                <Info>
                  <Info.Title>Name</Info.Title>
                  <Info.SubTitle>{auth.state.user?.name}</Info.SubTitle>
                </Info>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <Info>
                  <Info.Title>Username</Info.Title>
                  <Info.SubTitle>{auth.state.user?.username}</Info.SubTitle>
                </Info>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <Info>
                  <Info.Title>Role</Info.Title>
                  <Info.SubTitle>
                    <Typography as="span" transform="capitalize">
                      {auth.state.user?.role.name}
                    </Typography>
                  </Info.SubTitle>
                </Info>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <Info>
                  <Info.Title>Email</Info.Title>
                  <Info.SubTitle>{auth.state.user?.email ?? "-"}</Info.SubTitle>
                </Info>
              </Grid.Col>

              <Grid.Col cols={["12", "lg-6"]}>
                <Info>
                  <Info.Title>Mobile</Info.Title>
                  <Info.SubTitle>
                    {auth.state.user?.mobile ?? "-"}
                  </Info.SubTitle>
                </Info>
              </Grid.Col>
            </Grid.Row>
          </Card.Body>
        </Card>
      </Stack>
    </>
  );
};

export default AccountPage;
