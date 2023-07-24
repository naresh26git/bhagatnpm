import React from "react";
import {
  Navigate,
  Outlet,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import ShowIf from "../components/ShowIf";
import { useAuthContext } from "../hooks/UseAuth";
import GlobalLayout from "../layouts/Global";

const LazyLoginPage = React.lazy(() => import("../pages/login"));
// TODO: Change the implementation to use the Router and Layout properly
const LazyAccountPage = React.lazy(() => import("../pages/profile/layout"));
const LazyEmployeesPage = React.lazy(() => import("../pages/employees"));
// TODO: Change the implementation to use the Router and Layout properly
const LazyLeavePage = React.lazy(() => import("../pages/leave/layout"));
const LazyUnderMaintainancePage = React.lazy(
  () => import("../pages/under-maintainance")
);
// const LazyLeaveBalancePage = React.lazy(
//   () => import("../pages/leave/leave-balance")
// );
const LazyExpensePage = React.lazy(() => import("../pages/expense"));
const LazyTimeSheetPage = React.lazy(() => import("../pages/time-sheet"));
const LazyHelpDeskPage = React.lazy(() => import("../pages/help-desk"));
const LazyPayRollPage = React.lazy(() => import("../pages/pay-roll"));
const LazyTravelPage = React.lazy(() => import("../pages/travel"));
const LazyLoanPage = React.lazy(() => import("../pages/loan"));
const LazyVisitorPassPage = React.lazy(() => import("../pages/visitor-pass"));
//   () => import("../pages/profile/personal-info")
// );
// const LazyFamilyPage = React.lazy(() => import("../pages/profile/family"));
// const LazyContactPage = React.lazy(() => import("../pages/profile/contact"));

const LazyLoginPageWithFallback = () => (
  <React.Suspense fallback={"Loading..."}>
    <LazyLoginPage />
  </React.Suspense>
);
const LazyAccountPageWithFallback = () => (
  <React.Suspense fallback={"Loading..."}>
    <ProtectedRoute>
      <LazyAccountPage />
    </ProtectedRoute>
  </React.Suspense>
);
const LazyEmployeesPageWithFallback = () => (
  <React.Suspense fallback={"Loading..."}>
    <ProtectedRoute>
      <ShowIf.Admin>
        <LazyEmployeesPage />
      </ShowIf.Admin>
    </ProtectedRoute>
  </React.Suspense>
);
const LazyLeavePageWithFallback = () => (
  <React.Suspense fallback={"Loading..."}>
    <ProtectedRoute>
      {/* <ShowIf.Admin> */}
      <LazyLeavePage />
      {/* </ShowIf.Admin> */}
    </ProtectedRoute>
  </React.Suspense>
);
const LazyUnderMaintainancePageWithFallback = () => (
  <React.Suspense fallback={"Loading..."}>
    <ProtectedRoute>
      {/* <ShowIf.Admin> */}
      <LazyUnderMaintainancePage />
      {/* </ShowIf.Admin> */}
    </ProtectedRoute>
  </React.Suspense>
);
// const LazyLeaveBalancePageWithFallback = () => (
//   <React.Suspense fallback={"Loading..."}>
//     <ProtectedRoute>
//       {/* <ShowIf.Admin> */}
//       <LazyLeaveBalancePage />
//       {/* </ShowIf.Admin> */}
//     </ProtectedRoute>
//   </React.Suspense>
// );
const LazyTimeSheetPageWithFallback = () => (
  <React.Suspense fallback={"Loading..."}>
    <ProtectedRoute>
      {/* <ShowIf.Admin> */}
      <LazyTimeSheetPage />
      {/* </ShowIf.Admin> */}
    </ProtectedRoute>
  </React.Suspense>
);
const LazyLoanPageWithFallback = () => (
  <React.Suspense fallback={"Loading..."}>
    <ProtectedRoute>
      {/* <ShowIf.Admin> */}
      <LazyLoanPage />
      {/* </ShowIf.Admin> */}
    </ProtectedRoute>
  </React.Suspense>
);
const LazyHelpDeskPageWithFallback = () => (
  <React.Suspense fallback={"Loading..."}>
    <ProtectedRoute>
      {/* <ShowIf.Admin> */}
      <LazyHelpDeskPage />
      {/* </ShowIf.Admin> */}
    </ProtectedRoute>
  </React.Suspense>
);
const LazyExpensePageWithFallback = () => (
  <React.Suspense fallback={"Loading..."}>
    <ProtectedRoute>
      {/* <ShowIf.Admin> */}
      <LazyExpensePage />
      {/* </ShowIf.Admin> */}
    </ProtectedRoute>
  </React.Suspense>
);
const LazyPayRollPageWithFallback = () => (
  <React.Suspense fallback={"Loading..."}>
    <ProtectedRoute>
      {/* <ShowIf.Admin> */}
      <LazyPayRollPage />
      {/* <ShowIf.Admin> */}
    </ProtectedRoute>
  </React.Suspense>
);
const LazyTravelPageWithFallback = () => (
  <React.Suspense fallback={"Loading..."}>
    <ProtectedRoute>
      {/* <ShowIf.Admin> */}
      <LazyTravelPage />
      {/* <ShowIf.Admin> */}
    </ProtectedRoute>
  </React.Suspense>
);
const LazyVisitorPassPageWithFallback = () => (
  <React.Suspense fallback={"Loading..."}>
    <ProtectedRoute>
      {/* <ShowIf.Admin> */}
      <LazyVisitorPassPage />
      {/* <ShowIf.Admin> */}
    </ProtectedRoute>
  </React.Suspense>
);
// const LazyPersonalInfoPageWithFallback = () => (
//   <React.Suspense fallback={"Loading..."}>
//     <ProtectedRoute>
//       {/* <ShowIf.Admin> */}
//       <LazyPersonalInfoPage />
//       {/* <ShowIf.Admin> */}
//     </ProtectedRoute>
//   </React.Suspense>
// );
// const LazyFamilyPageWithFallback = () => (
//   <React.Suspense fallback={"Loading..."}>
//     <ProtectedRoute>
//       {/* <ShowIf.Admin> */}
//       <LazyFamilyPage />
//       {/* <ShowIf.Admin> */}
//     </ProtectedRoute>
//   </React.Suspense>
// );
// const LazyContactPageWithFallback = () => (
//   <React.Suspense fallback={"Loading..."}>
//     <ProtectedRoute>
//       {/* <ShowIf.Admin> */}
//       <LazyContactPage />
//       {/* <ShowIf.Admin> */}
//     </ProtectedRoute>
//   </React.Suspense>
// );

export type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (auth.state.user) return;
    if (auth.state.user === undefined) {
      navigate("/login");
      return;
    }
  }, [auth.state.user, navigate]);

  return <>{props.children}</>;
};

export const router = createBrowserRouter([
  {
    path: "login/*",
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <LazyLoginPageWithFallback />,
      },
    ],
  },

  {
    path: "/*",
    element: <GlobalLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="account" />,
      },
      {
        path: "account/*",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <LazyAccountPageWithFallback />,
          },
        ],
      },
      {
        path: "employees/*",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <LazyEmployeesPageWithFallback />,
          },
        ],
      },
      {
        path: "leave/*",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <LazyLeavePageWithFallback />,
          },
          // {
          //   path: "balance",
          //   element: <LazyLeaveBalancePageWithFallback />,
          // },
        ],
      },
      {
        path: "time-sheet/*",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <LazyTimeSheetPageWithFallback />,
          },
        ],
      },
      {
        path: "loan/*",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <LazyLoanPageWithFallback />,
          },
        ],
      },
      {
        path: "expense/*",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <LazyExpensePageWithFallback />,
          },
        ],
      },
      {
        path: "help-desk/*",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <LazyHelpDeskPageWithFallback />,
          },
        ],
      },
      {
        path: "pay-roll/*",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <LazyPayRollPageWithFallback />,
          },
        ],
      },
      {
        path: "travel/*",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <LazyTravelPageWithFallback />,
          },
        ],
      },
      {
        path: "visitor-pass/*",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <LazyVisitorPassPageWithFallback />,
          },
        ],
      },
      // {
      //   path: "personal-info/*",
      //   element: <Outlet />,
      //   children: [
      //     {
      //       path: "",
      //       element: <LazyPersonalInfoPageWithFallback />,
      //     },
      //     {
      //       path: "family",
      //       element: <LazyFamilyPageWithFallback />,
      //     },
      //     {
      //       path: "contact",
      //       element: <LazyContactPageWithFallback />,
      //     },
      //   ],
      // },
      {
        path: "*",
        element: <LazyUnderMaintainancePageWithFallback />,
      },
    ],
  },
]);

export default router;
