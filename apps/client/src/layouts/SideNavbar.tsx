import {
  faBullhorn,
  faBusinessTime,
  faCircleUser,
  faCircleXmark,
  faClipboard,
  faHome,
  faLandmark,
  faPersonWalkingArrowRight,
  faPlaneDeparture,
  faQuestionCircle,
  faReceipt,
  faRightFromBracket,
  faSliders,
  faTriangleExclamation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties } from "react";
import { NavLink, NavLinkProps, useMatch } from "react-router-dom";
import Link from "ui/Link";
import Stack from "ui/Stack";
import Typography from "ui/Typography";
import { useAuthContext } from "../hooks/UseAuth";
import { client, resetToken } from "../main";
import { handleTRPCError } from "../utils/handle-trpc-error";

export const _baseStyles: CSSProperties = {
  color: "var(--bs-secondary)",
  margin: "0.5rem",
  borderRadius: "0.25rem",
  padding: "0.5rem",
  lineHeight: 1,
  textDecoration: "none",
};

export const _activeStyles: CSSProperties = {
  ..._baseStyles,
  backgroundColor: "var(--bs-primary)",
  color: "var(--bs-white)",
};

export const _inActiveStyles: CSSProperties = {
  ..._baseStyles,
};

export const getActiveStyles: NavLinkProps["style"] = ({ isActive }) =>
  isActive ? _activeStyles : _inActiveStyles;

export const SideNavbar = () => {
  const auth = useAuthContext();

  const logout = async () => {
    try {
      await client.user.signOut.mutate();
      resetToken();
      auth.dispatcher({ type: "reset-user" });
    } catch (error) {
      handleTRPCError(error, auth);

      console.log(error);
    }
  };

  return (
    <Stack
      gap="5"
      justifyContent="between"
      className="border-end  p-2 h-100 "
      style={{ width: "14rem" }}
    >
      <Stack.Item cols="12">
        <Stack gap="3">
          <Stack alignItems="center">
            <Typography as="h3" color="primary" fontWeight="bolder">
              HRMS
            </Typography>
          </Stack>

          <Stack>
            <Link component={NavLink} to="/" style={getActiveStyles}>
              <Stack gap="2" orientation="horizontal">
                <FontAwesomeIcon icon={faHome} /> Home
              </Stack>{" "}
            </Link>

            <Link component={NavLink} to="account" style={getActiveStyles}>
              <Stack gap="2" orientation="horizontal">
                <FontAwesomeIcon icon={faCircleUser} /> Profile
              </Stack>{" "}
            </Link>
            {/* <Link component={NavLink} to="employees" style={getActiveStyles}>
              <Stack gap="2" orientation="horizontal">
                <FontAwesomeIcon icon={faUsers} /> Employees
              </Stack>
            </Link> */}
            <Link component={NavLink} to="leave" style={getActiveStyles}>
              <Stack gap="2" orientation="horizontal">
                <FontAwesomeIcon icon={faPersonWalkingArrowRight} /> Leave
              </Stack>
            </Link>

            <Link to="time-sheet" component={NavLink} style={getActiveStyles}>
              <Stack gap="2" orientation="horizontal">
                <FontAwesomeIcon icon={faBusinessTime} /> Time management
              </Stack>
            </Link>

            <Link to="pay-roll" component={NavLink} style={getActiveStyles}>
              <Stack gap="2" orientation="horizontal">
                <FontAwesomeIcon icon={faReceipt} /> Payroll
              </Stack>
            </Link>

            <Link to="help-desk" component={NavLink} style={getActiveStyles}>
              <Stack gap="2" orientation="horizontal">
                <FontAwesomeIcon icon={faQuestionCircle} />
                Helpdesk
              </Stack>
            </Link>

            <Link to="visitor-pass" component={NavLink} style={getActiveStyles}>
              <Stack gap="2" orientation="horizontal">
                <FontAwesomeIcon icon={faCircleXmark} /> Visitor pass
              </Stack>
            </Link>

            <Link component={NavLink} to="travel" style={getActiveStyles}>
              <Stack gap="2" orientation="horizontal">
                <FontAwesomeIcon icon={faPlaneDeparture} /> Travel
              </Stack>
            </Link>

            <Link component={NavLink} to="expense" style={getActiveStyles}>
              <Stack gap="2" orientation="horizontal">
                <FontAwesomeIcon icon={faClipboard} /> Expense
              </Stack>
            </Link>

            <Link component={NavLink} to="loan" style={getActiveStyles}>
              <Stack gap="2" orientation="horizontal">
                <FontAwesomeIcon icon={faLandmark} /> Loan
              </Stack>
            </Link>

            <Link component={NavLink} to="announcement" style={getActiveStyles}>
              <Stack gap="2" orientation="horizontal">
                <FontAwesomeIcon icon={faBullhorn} /> Announcement
              </Stack>{" "}
            </Link>

            <Link to="alert" component={NavLink} style={getActiveStyles}>
              <Stack gap="2" orientation="horizontal">
                <FontAwesomeIcon icon={faTriangleExclamation} /> Alert
              </Stack>
            </Link>

            <Link to="admin" component={NavLink} style={getActiveStyles}>
              <Stack gap="2" orientation="horizontal">
                <FontAwesomeIcon icon={faUser} /> Admin
              </Stack>
            </Link>

            <Link
              to="login"
              component={NavLink}
              onClick={logout}
              style={getActiveStyles}
            >
              <Stack gap="2" orientation="horizontal">
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </Stack>
            </Link>
          </Stack>
        </Stack>
      </Stack.Item>
    </Stack>
  );
};

export const LeadsDropdown = () => {
  const path = useMatch("settings/*");

  return (
    <div style={getActiveStyles({ isActive: Boolean(path), isPending: false })}>
      {/* TODO: Use Menu component for dropdowns */}
      <Link
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <Stack alignItems="center" justifyContent="center" gap="1">
          <FontAwesomeIcon icon={faSliders} fontSize="2rem" />

          <Typography as="small" className="m-0">
            Settings
          </Typography>
        </Stack>
      </Link>

      {/* <ul className="dropdown-menu">
        <li>
          <h6 className="dropdown-header">User</h6>
        </li>
        <li>
          <Link
            component={NavLink}
            to="/settings/user-settings"
            className="dropdown-item"
          >
            User Settings
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <h6 className="dropdown-header">Account</h6>
        </li>
        <li>
          <Link
            component={NavLink}
            to="/settings/users"
            className="dropdown-item"
          >
            Users
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <h6 className="dropdown-header">Company</h6>
        </li>
        <li>
          <Link
            component={NavLink}
            to="/settings/company-settings"
            className="dropdown-item"
          >
            Company Settings
          </Link>
        </li>
        <li>
          <Link
            component={NavLink}
            to="/settings/campaigns"
            className="dropdown-item"
          >
            Campaigns
          </Link>
        </li>
        <li>
          <Link
            component={NavLink}
            to="/settings/destinations"
            className="dropdown-item"
          >
            Destinations
          </Link>
        </li>
      </ul> */}
    </div>
  );
};

export default SideNavbar;

//

// import { faCalendar, faCircleUser } from "@fortawesome/free-regular-svg-icons";
// import {
//   faMoneyBill,
//   faPlane,
//   faSliders,
//   faTrain,
//   faUsers,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { CSSProperties } from "react";
// import { NavLink, NavLinkProps, useMatch } from "react-router-dom";
// import Link from "ui/Link";
// import Stack from "ui/Stack";
// import Typography from "ui/Typography";
// import { ShowIf } from "../components/ShowIf";

// export const _baseStyles: CSSProperties = {
//   color: "var(--bs-secondary)",
//   margin: "0.5rem",
//   borderRadius: "0.25rem",
//   padding: "0.5rem",
//   lineHeight: 1,
//   textDecoration: "none",
// };

// export const _activeStyles: CSSProperties = {
//   ..._baseStyles,
//   backgroundColor: "var(--bs-primary)",
//   color: "var(--bs-white)",
// };

// export const _inActiveStyles: CSSProperties = {
//   ..._baseStyles,
// };

// export const getActiveStyles: NavLinkProps["style"] = ({ isActive }) =>
//   isActive ? _activeStyles : _inActiveStyles;

// export const SideNavbar = () => {
//   return (
//     <Stack
//       gap="3"
//       className="h-100 p-0 border-end overflow-scroll"
//       justifyContent="between"
//       // TODO: Add theme via sass
//       style={{ width: "6rem" }}
//     >
//       <Stack.Item cols="12">
//         <Stack gap="0">
//           <Stack
//             alignItems="center"
//             justifyContent="center"
//             gap="2"
//             style={{ height: 68, backgroundColor: "#F4F4F4" }}
//           >
//             <FontAwesomeIcon icon={faBuromobelexperte} fontSize="2rem" />
//           </Stack>

//           {/* <Stack>
//           <Link component={NavLink} to="/" style={getActiveStyles}>
//             <Stack alignItems="center" justifyContent="center" gap="1">
//               <FontAwesomeIcon icon={faHouseChimney} fontSize="2rem" />

//               <Typography as="small" className="m-0">
//                 Home
//               </Typography>
//             </Stack>
//           </Link>
//         </Stack> */}

//           <Stack>
//             <Link component={NavLink} to="account" style={getActiveStyles}>
//               <Stack alignItems="center" justifyContent="center" gap="1">
//                 <FontAwesomeIcon icon={faCircleUser} fontSize="2rem" />

//                 <Typography as="small" className="m-0">
//                   Account
//                 </Typography>
//               </Stack>
//             </Link>
//           </Stack>

//           <ShowIf.Admin>
//             <Stack>
//               <Link component={NavLink} to="employees" style={getActiveStyles}>
//                 <Stack alignItems="center" justifyContent="center" gap="1">
//                   <FontAwesomeIcon icon={faUsers} fontSize="2rem" />

//                   <Typography as="small" className="m-0">
//                     Employees
//                   </Typography>
//                 </Stack>
//               </Link>
//             </Stack>
//           </ShowIf.Admin>

//           <Stack>
//             <Link component={NavLink} to="leave" style={getActiveStyles}>
//               <Stack alignItems="center" justifyContent="center" gap="1">
//                 <FontAwesomeIcon icon={faTrain} fontSize="2rem" />

//                 <Typography as="small" className="m-0">
//                   Leave
//                 </Typography>
//               </Stack>
//             </Link>
//           </Stack>

//           <Stack>
//             <Link component={NavLink} to="travel" style={getActiveStyles}>
//               <Stack alignItems="center" justifyContent="center" gap="1">
//                 <FontAwesomeIcon icon={faPlane} fontSize="2rem" />

//                 <Typography as="small" className="m-0">
//                   Travel
//                 </Typography>
//               </Stack>
//             </Link>
//           </Stack>

//           {/* <Stack>
//           <Link component={NavLink} to="leave/balance" style={getActiveStyles}>
//             <Stack alignItems="center" justifyContent="center" gap="1">
//               <FontAwesomeIcon icon={faUsers} fontSize="2rem" />

//               <Typography as="small" className="m-0">
//                 Leave Balance
//               </Typography>
//             </Stack>
//           </Link>
//         </Stack> */}

//           <Stack>
//             <Link component={NavLink} to="time-sheet" style={getActiveStyles}>
//               <Stack alignItems="center" justifyContent="center" gap="1">
//                 <FontAwesomeIcon icon={faCalendar} fontSize="2rem" />

//                 <Typography as="small" className="m-0">
//                   Timesheet
//                 </Typography>
//               </Stack>
//             </Link>
//           </Stack>

//           {/* <Stack>
//           <Link component={NavLink} to="help-desk" style={getActiveStyles}>
//             <Stack alignItems="center" justifyContent="center" gap="1">
//               <FontAwesomeIcon icon={faInfo} fontSize="2rem" />

//               <Typography as="small" className="m-0">
//                 Helpdesk
//               </Typography>
//             </Stack>
//           </Link>
//         </Stack> */}

//           <Stack>
//             <Link component={NavLink} to="pay-roll" style={getActiveStyles}>
//               <Stack alignItems="center" justifyContent="center" gap="1">
//                 <FontAwesomeIcon icon={faMoneyBill} fontSize="2rem" />

//                 <Typography as="small" className="m-0">
//                   Payroll
//                 </Typography>
//               </Stack>
//             </Link>
//           </Stack>

//           {/* <Stack>
//           <Link component={NavLink} to="personal-info" style={getActiveStyles}>
//             <Stack alignItems="center" justifyContent="center" gap="1">
//               <FontAwesomeIcon icon={faUsers} fontSize="2rem" />

//               <Typography as="small" className="m-0">
//                 Personal
//               </Typography>
//             </Stack>
//           </Link>
//         </Stack> */}

//           {/* <Stack>
//           <Link
//             component={NavLink}
//             to="personal-info/family"
//             style={getActiveStyles}
//           >
//             <Stack alignItems="center" justifyContent="center" gap="1">
//               <FontAwesomeIcon icon={faUsers} fontSize="2rem" />

//               <Typography as="small" className="m-0">
//                 Family
//               </Typography>
//             </Stack>
//           </Link>
//         </Stack> */}

//           {/* <Stack>
//           <Link
//             component={NavLink}
//             to="personal-info/contact"
//             style={getActiveStyles}
//           >
//             <Stack alignItems="center" justifyContent="center" gap="1">
//               <FontAwesomeIcon icon={faUsers} fontSize="2rem" />

//               <Typography as="small" className="m-0">
//                 Contact
//               </Typography>
//             </Stack>
//           </Link>
//         </Stack> */}

//           {/* <Stack>
//           <Link component={NavLink} to="" style={getActiveStyles}>
//             <Stack alignItems="center" justifyContent="center" gap="1">
//               <FontAwesomeIcon icon={faAddressBook} fontSize="2rem" />

//               <Typography as="small" className="m-0">
//                 Contact
//               </Typography>
//             </Stack>
//           </Link>
//         </Stack> */}

//           {/* <Stack>
//           <Link component={NavLink} to="" style={getActiveStyles}>
//             <Stack alignItems="center" justifyContent="center" gap="1">
//               <FontAwesomeIcon icon={faHandshake} fontSize="2rem" />

//               <Typography as="small" className="m-0">
//                 Deal
//               </Typography>
//             </Stack>
//           </Link>
//         </Stack> */}

//           {/* <Stack>
//           <Link component={NavLink} to="" style={getActiveStyles}>
//             <Stack alignItems="center" justifyContent="center" gap="1">
//               <FontAwesomeIcon icon={faFile} fontSize="2rem" />

//               <Typography as="small" className="m-0">
//                 Reports
//               </Typography>
//             </Stack>
//           </Link>
//         </Stack> */}
//         </Stack>
//       </Stack.Item>

//       <LeadsDropdown />
//     </Stack>
//   );
// };

// export const LeadsDropdown = () => {
//   const path = useMatch("settings/*");

//   return (
//     <div style={getActiveStyles({ isActive: Boolean(path), isPending: false })}>
//       {/* TODO: Use Menu component for dropdowns */}
//       <Link
//         role="button"
//         data-bs-toggle="dropdown"
//         aria-expanded="false"
//         style={{ color: "inherit", textDecoration: "inherit" }}
//       >
//         <Stack alignItems="center" justifyContent="center" gap="1">
//           <FontAwesomeIcon icon={faSliders} fontSize="2rem" />

//           <Typography as="small" className="m-0">
//             Settings
//           </Typography>
//         </Stack>
//       </Link>

//       {/* <ul className="dropdown-menu">
//         <li>
//           <h6 className="dropdown-header">User</h6>
//         </li>
//         <li>
//           <Link
//             component={NavLink}
//             to="/settings/user-settings"
//             className="dropdown-item"
//           >
//             User Settings
//           </Link>
//         </li>
//         <li>
//           <hr className="dropdown-divider" />
//         </li>
//         <li>
//           <h6 className="dropdown-header">Account</h6>
//         </li>
//         <li>
//           <Link
//             component={NavLink}
//             to="/settings/users"
//             className="dropdown-item"
//           >
//             Users
//           </Link>
//         </li>
//         <li>
//           <hr className="dropdown-divider" />
//         </li>
//         <li>
//           <h6 className="dropdown-header">Company</h6>
//         </li>
//         <li>
//           <Link
//             component={NavLink}
//             to="/settings/company-settings"
//             className="dropdown-item"
//           >
//             Company Settings
//           </Link>
//         </li>
//         <li>
//           <Link
//             component={NavLink}
//             to="/settings/campaigns"
//             className="dropdown-item"
//           >
//             Campaigns
//           </Link>
//         </li>
//         <li>
//           <Link
//             component={NavLink}
//             to="/settings/destinations"
//             className="dropdown-item"
//           >
//             Destinations
//           </Link>
//         </li>
//       </ul> */}
//     </div>
//   );
// };

// export default SideNavbar;
