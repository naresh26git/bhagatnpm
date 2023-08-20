import { PayRoll } from "server/src/trpc/routes/pay-rolls/get-many";
import Card from "ui/Card";
import Dialog from "ui/Dialog";
import Grid from "ui/Grid";
import Link from "ui/Link";
import Stack from "ui/Stack";
import Typography from "ui/Typography";

export type PayRollDetailsProps = {
  payRollDetails: PayRoll;
};

const PayRollDetailsDialog = (props: PayRollDetailsProps) => {
  const value = {
    id: `payroll-details${props.payRollDetails.id}`,
    labelId: `payroll-details-label${props.payRollDetails.id}`,
  };

  return (
    <>
      <Dialog.Trigger {...value} color="primary" className="border-0">
        <Link>Payslip</Link>
      </Dialog.Trigger>
      <Dialog {...value}>
        <Dialog.Header title="" className="border-0"></Dialog.Header>
        <Dialog.Body>
          <Grid.Row>
            <Grid.Col cols="4">
              <Stack orientation="horizontal">
                <Typography color="secondary">Emp Code:&nbsp;</Typography>
                <Typography fontSize="6">
                  {props.payRollDetails.user.id}
                </Typography>
              </Stack>
            </Grid.Col>
            <Grid.Col cols="4">
              <Stack orientation="horizontal">
                <Typography color="secondary">Name:&nbsp;</Typography>
                <Typography fontSize="6">
                  {props.payRollDetails.user.personalInfo?.firstName}{" "}
                  {props.payRollDetails.user.personalInfo?.lastName}
                </Typography>
              </Stack>
            </Grid.Col>
            <Grid.Col cols="4">
              <Stack orientation="horizontal">
                <Typography color="secondary">Period:&nbsp;</Typography>
                <Typography>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    year: "2-digit",
                  }).format(
                    new Date().setFullYear(
                      props.payRollDetails.year,
                      props.payRollDetails.month,
                      1
                    )
                  )}
                </Typography>
              </Stack>
            </Grid.Col>
            <Grid.Col cols="5">
              <Stack orientation="horizontal">
                <Typography color="secondary">Department:&nbsp;</Typography>
                <Typography>
                  {props.payRollDetails.user.personalInfo?.department.name}
                </Typography>
              </Stack>
            </Grid.Col>
            <Grid.Col cols="12">
              <Stack orientation="horizontal">
                <Typography color="secondary">Designation:&nbsp;</Typography>
                <Typography>
                  {props.payRollDetails.user.personalInfo?.designation.name}
                </Typography>
              </Stack>
            </Grid.Col>
          </Grid.Row>
          <Card className="border-0">
            <Card.Body>
              <Stack gap="3">
                <div className="border-bottom"></div>
                <Grid.Row>
                  <Grid.Col cols="7">
                    <Stack gap="3">
                      <Typography color="primary" fontWeight="bold">
                        Earning
                      </Typography>
                      <Stack justifyContent="between" orientation="horizontal">
                        <Typography fontWeight="bold">Basic</Typography>
                        <Typography>
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "INR",
                          }).format(
                            Number(
                              props.payRollDetails.paySlipComponents[0].amount
                            )
                          )}
                        </Typography>
                      </Stack>
                      <Stack justifyContent="between" orientation="horizontal">
                        <Typography fontWeight="bold">HRA</Typography>
                        <Typography>
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "INR",
                          }).format(
                            Number(
                              props.payRollDetails.paySlipComponents[1].amount
                            )
                          )}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col cols="5">
                    <Stack gap="3">
                      <Typography color="primary" fontWeight="bold">
                        Deductions
                      </Typography>
                      <Stack justifyContent="between" orientation="horizontal">
                        <Typography fontWeight="bold">Deductions</Typography>
                        <Typography>
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "INR",
                            signDisplay: "never",
                          }).format(
                            Number(
                              props.payRollDetails.paySlipComponents[2].amount
                            )
                          )}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid.Col>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Col cols="7">
                    <Stack justifyContent="between" orientation="horizontal">
                      <Typography fontWeight="bold">Total</Typography>
                      <Typography>
                        {" "}
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "INR",
                          signDisplay: "never",
                        }).format(
                          Number(
                            props.payRollDetails.paySlipComponents[0].amount
                          ) +
                            Number(
                              props.payRollDetails.paySlipComponents[1].amount
                            )
                        )}
                      </Typography>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col cols="5">
                    <Stack justifyContent="between" orientation="horizontal">
                      <Typography fontWeight="bold">Total</Typography>
                      <Typography>
                        {" "}
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "INR",
                          signDisplay: "never",
                        }).format(
                          Number(
                            props.payRollDetails.paySlipComponents[2].amount
                          )
                        )}
                      </Typography>
                    </Stack>
                  </Grid.Col>
                </Grid.Row>
                <div className="border-bottom"></div>
                <Grid.Row>
                  <Grid.Col cols="7">
                    <Stack justifyContent="between" orientation="horizontal">
                      <Typography fontWeight="bold" color="primary">
                        Net Pay
                      </Typography>
                      <Typography>
                        {" "}
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "INR",
                        }).format(
                          Number(
                            props.payRollDetails.paySlipComponents.reduce(
                              (acc, curr) => {
                                return acc + Number(curr.amount);
                              },
                              0
                            )
                          )
                        )}
                      </Typography>
                    </Stack>
                  </Grid.Col>
                </Grid.Row>
              </Stack>
            </Card.Body>
          </Card>
        </Dialog.Body>
      </Dialog>
    </>
  );
};
export default PayRollDetailsDialog;
