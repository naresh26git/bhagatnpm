import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "ui/Button";
import Checkbox from "ui/Checkbox";
import Container from "ui/Container";
import Grid from "ui/Grid";
import Hidden from "ui/Hidden";
import Link from "ui/Link";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { useAuthContext } from "../hooks/UseAuth";
import { client, setToken } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

export type LoginPageProps = {};

export const LoginPage = () => {
  const auth = useAuthContext();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const { user, token } = await client.user.signIn.mutate({
        username,
        password,
      });

      setToken(token);
      auth.dispatcher({ type: "set-user", payload: user });
    } catch (error) {
      handleTRPCError(error, auth);
    } finally {
      setTimeout(() => navigate("/"));
    }
  };
  return (
    <>
      <Grid.Row className="w-100 h-100" gutters="0">
        <Grid.Col
          cols="lg-7"
          className="h-100"
          style={{ background: "#EFFBFF" }}
        >
          <Hidden hiddenFor="auto" shownFor="lg" className="h-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/login.png"
              className="img-fluid h-100"
              alt="Login hero"
              style={{ mixBlendMode: "multiply" }}
            />
          </Hidden>
        </Grid.Col>
        <Grid.Col cols={["12", "lg-5"]} className="h-100 bg-white">
          <Container className="h-100" style={{ maxWidth: "25rem" }}>
            <Stack
              gap="5"
              className="h-100"
              justifyContent="center"
              alignItems="center"
            >
              <Stack.Item cols="12">
                <Stack gap="1">
                  <Typography
                    as="h4"
                    color="dark"
                    display="6"
                    className="fw-bold"
                  >
                    Welcome to
                  </Typography>

                  <Typography
                    as="span"
                    color="primary"
                    display="5"
                    className="fw-bold"
                  >
                    cluBITS HRMS
                  </Typography>
                </Stack>
              </Stack.Item>

              <Stack.Item cols="12">
                <Stack gap="3">
                  <Typography className="m-0 fw-bold">Login</Typography>

                  <div>
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control form-control-sm"
                      value={username}
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-sm"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                  </div>
                  <Stack orientation="horizontal" justifyContent="between">
                    <Checkbox label="Remember me"></Checkbox>
                    <Link className="text-decoration-underline">
                      Forgot password
                    </Link>
                  </Stack>
                  <div>
                    <Button className="w-100" variant="primary" onClick={login}>
                      Sign In
                    </Button>
                  </div>
                </Stack>
              </Stack.Item>

              <Stack.Item cols="12">
                <Grid.Row className="float-end">
                  <Grid.Col cols="auto">
                    <Link className="text-decoration-underline">
                      Need Help?
                    </Link>
                  </Grid.Col>
                </Grid.Row>
              </Stack.Item>
            </Stack>
          </Container>
        </Grid.Col>
      </Grid.Row>
    </>
  );
};

export default LoginPage;
