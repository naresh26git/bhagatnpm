import Button from "ui/Button";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import LeaveDialog from "../../components/LeaveDialog";
import PageHeader from "../../components/PageHeader";
import LeaveViewPage from "./leave";
import LeaveBalancePage from "./leave-balance";
export const LeaveTabs = () => {
  return (
    <>
      <Stack gap="3">
        <Grid.Row>
          <Grid.Col className="py-2" cols={["12", "md-2"]}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="From"
            />
          </Grid.Col>
          <Grid.Col className="py-2" cols={["12", "md-2"]}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="To"
            />
          </Grid.Col>
          <Grid.Col className="py-2" cols={["12", "md-2"]}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Leave Type"
            />
          </Grid.Col>
          <Grid.Col className="py-2" cols={["12", "md-2"]}>
            <Button variant="primary" className="w-100">
              Search
            </Button>
          </Grid.Col>
        </Grid.Row>
        <PageHeader
          title={<PageHeader.Title></PageHeader.Title>}
          actions={<LeaveDialog />}
        />

        {/* <PageHeader title={<PageHeader.Title>Account</PageHeader.Title>} /> */}

        <ul className="nav nav-tabs" id="myTab" role="tablist">
          {/* <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="overall-tab"
              data-bs-toggle="tab"
              data-bs-target="#overall"
              type="button"
              role="tab"
              aria-controls="overall"
              aria-selected="true"
            >
              Overall
            </button>
          </li> */}

          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="viewleave-tab"
              data-bs-toggle="tab"
              data-bs-target="#viewleave"
              type="button"
              role="tab"
              aria-controls="viewleave"
              aria-selected="true"
            >
              Leaves
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="leavebalance-tab"
              data-bs-toggle="tab"
              data-bs-target="#leavebalance"
              type="button"
              role="tab"
              aria-controls="leavebalance"
              aria-selected="false"
            >
              Balance
            </button>
          </li>
        </ul>

        <div className="tab-content" id="myTabContent">
          {/* <div
            className="tab-pane fade show active"
            id="overall"
            role="tabpanel"
            aria-labelledby="overall-tab"
          >
            <Stack gap="3">
              <LeaveViewPage />

              <LeaveBalancePage />
            </Stack>
          </div> */}
          <div
            className="tab-pane fade show active"
            id="viewleave"
            role="tabpanel"
            aria-labelledby="viewleave-tab"
          >
            <LeaveViewPage />
          </div>
          <div
            className="tab-pane fade"
            id="leavebalance"
            role="tabpanel"
            aria-labelledby="leavebalance-tab"
          >
            <LeaveBalancePage />
          </div>
        </div>
      </Stack>
    </>
  );
};

export default LeaveTabs;
