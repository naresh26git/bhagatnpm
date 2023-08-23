import React from "react";
import { InputParameters, Leave } from "server/src/trpc/routes/leaves/get-many";
import Button from "ui/Button";
import Grid from "ui/Grid";
import Stack from "ui/Stack";
import { AsyncListContextValue, useAsyncList } from "ui/hooks/UseAsyncList";
import LeaveDialog from "../../components/LeaveDialog";
import PageHeader from "../../components/PageHeader";
import { ShowIf } from "../../components/ShowIf";
import { useAuthContext } from "../../hooks/UseAuth";
import { client } from "../../main";
import { handleTRPCError } from "../../utils/handle-trpc-error";
import LeaveViewPage from "./leave";
import LeaveBalancePage from "./leave-balance";

export const LeaveTabs = () => {
  const auth = useAuthContext();
  const [activeTabId, setActiveTabId] = React.useState(0);

  const leaveValue = useAsyncList<Leave, InputParameters["sortBy"]>({
    load: async ({ states }) => {
      try {
        const inputParameters = {
          sortBy: states.sortState?.sortBy,
          sortOrder: states.sortState?.sortOrder,
          limit: states.paginationState.limit,
          page: states.paginationState.page,
        };

        const result = await client.leave.getMany.mutate(inputParameters);

        return {
          totalCount: result.totalCount,
          items: result.items as any,
        };
      } catch (error) {
        handleTRPCError(error, auth);

        return { error: new Error("Something went wrong") };
      }
    },
  });

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

        <ShowIf.Employee>
          <PageHeader
            title={<PageHeader.Title></PageHeader.Title>}
            actions={
              <LeaveDialog asyncList={leaveValue as AsyncListContextValue} />
            }
          />
        </ShowIf.Employee>

        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTabId === 0 ? "active" : ""}`}
              id="leave-tab"
              data-bs-toggle="tab"
              data-bs-target="#leave-tab-content"
              type="button"
              role="tab"
              aria-controls="leave-tab-content"
              aria-selected="true"
              onClick={() => setActiveTabId(0)}
            >
              Leaves
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTabId === 1 ? "active" : ""}`}
              id="leave-balance-tab"
              data-bs-toggle="tab"
              data-bs-target="#leave-balance-tab-content"
              type="button"
              role="tab"
              aria-controls="leave-balance-tab-content"
              aria-selected="false"
              onClick={() => setActiveTabId(1)}
            >
              Balance
            </button>
          </li>
        </ul>

        <div className="tab-content" id="myTabContent">
          <div
            className={`tab-pane fade ${
              activeTabId === 0 ? "show active" : ""
            }`}
            id="leave-tab-content"
            role="tabpanel"
            aria-labelledby="leave-tab"
          >
            {activeTabId === 0 ? (
              <LeaveViewPage
                tabId={0}
                activeTabId={activeTabId}
                value={leaveValue as AsyncListContextValue}
              />
            ) : null}
            {activeTabId === 1 ? (
              <LeaveBalancePage tabId={1} activeTabId={activeTabId} />
            ) : null}
          </div>
          <div
            className={`tab-pane fade ${
              activeTabId === 1 ? "show active" : ""
            }`}
            id="leave-balance-tab-content"
            role="tabpanel"
            aria-labelledby="leave-balance-tab"
          >
            <LeaveBalancePage tabId={1} activeTabId={activeTabId} />
          </div>
        </div>
      </Stack>
    </>
  );
};

export default LeaveTabs;
