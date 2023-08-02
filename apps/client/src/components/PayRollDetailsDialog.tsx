import Card from "ui/Card";
import Dialog from "ui/Dialog";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import Typography from "ui/Typography";

const PayRollDetailsDialog = () => {
  const value = {
    id: "payroll-details",
    labelId: "payroll-details-label",
  };
  return (
    <>
      <Dialog.Trigger {...value} variant="primary">
        Pay Roll Details
      </Dialog.Trigger>
      <Dialog {...value}>
        <Dialog.Header title="" className="border-0"></Dialog.Header>
        <Dialog.Body>
          <Grid.Row>
            <Grid.Col cols="4">
              <Stack orientation="horizontal">
                <Typography color="secondary">Emp Code :</Typography>
                <Typography fontStyles="normal" fontSize="6">
                  001
                </Typography>
              </Stack>
            </Grid.Col>
            <Grid.Col cols="4">
              <Stack orientation="horizontal">
                <Typography color="secondary">Name :</Typography>
                <Typography fontStyles="normal" fontSize="6">
                  Naveen
                </Typography>
              </Stack>
            </Grid.Col>
            <Grid.Col cols="4">
              <Stack orientation="horizontal">
                <Typography color="secondary">Period :</Typography>
                <Typography fontStyles="normal">March 2023</Typography>
              </Stack>
            </Grid.Col>
            <Grid.Col cols="4">
              <Stack orientation="horizontal">
                <Typography color="secondary">Department :</Typography>
                <Typography fontStyles="normal">Design</Typography>
              </Stack>
            </Grid.Col>
            <Grid.Col>
              <Stack orientation="horizontal">
                <Typography color="secondary">Designation :</Typography>
                <Typography>Product Design</Typography>
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
                        <Typography>$2700</Typography>
                      </Stack>
                      <Stack justifyContent="between" orientation="horizontal">
                        <Typography fontWeight="bold">HRA</Typography>
                        <Typography>$200</Typography>
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
                        <Typography>$100</Typography>
                      </Stack>
                    </Stack>
                  </Grid.Col>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Col cols="7">
                    <Stack justifyContent="between" orientation="horizontal">
                      <Typography fontWeight="bold">Total</Typography>
                      <Typography>$2900</Typography>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col cols="5">
                    <Stack justifyContent="between" orientation="horizontal">
                      <Typography fontWeight="bold">Total</Typography>
                      <Typography>$100</Typography>
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
                      <Typography>$2900</Typography>
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
