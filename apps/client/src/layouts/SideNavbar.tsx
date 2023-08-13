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

export type SideNavbarProps = {
  width: string;
};

export const SideNavbar = ({ width }: SideNavbarProps) => {
  return (
    <Stack
      gap="5"
      justifyContent="between"
      className="border-end p-2 h-100"
      style={{ width }}
    >
      <Stack.Item cols="12">
        <Stack gap="3">
          <Stack alignItems="center">
            <Typography as="h3" color="primary" fontWeight="bolder">
              HRMS
            </Typography>
          </Stack>

          <SideNavbarLinks />
        </Stack>
      </Stack.Item>
    </Stack>
  );
};

export type SideNavbarLinksProps = JSX.IntrinsicElements["div"] & {};

export const SideNavbarLinks = (props: SideNavbarLinksProps) => {
  const auth = useAuthContext();

  const logout = async () => {
    try {
      await client.user.signOut.mutate();
      resetToken();
      auth.dispatcher({ type: "reset-user" });
    } catch (error) {
      handleTRPCError(error, auth);
    }
  };

  return (
    <Stack>
      <Link component={NavLink} to="/" style={getActiveStyles}>
        <Stack gap="2" orientation="horizontal" {...props}>
          <FontAwesomeIcon icon={faHome} /> Home
        </Stack>{" "}
      </Link>

      <Link component={NavLink} to="account" style={getActiveStyles}>
        <Stack gap="2" orientation="horizontal" {...props}>
          <FontAwesomeIcon icon={faCircleUser} /> Profile
        </Stack>{" "}
      </Link>

      <Link component={NavLink} to="leave" style={getActiveStyles}>
        <Stack gap="2" orientation="horizontal" {...props}>
          <FontAwesomeIcon icon={faPersonWalkingArrowRight} /> Leave
        </Stack>
      </Link>

      <Link to="time-sheet" component={NavLink} style={getActiveStyles}>
        <Stack gap="2" orientation="horizontal" {...props}>
          <FontAwesomeIcon icon={faBusinessTime} /> Time management
        </Stack>
      </Link>

      <Link to="pay-roll" component={NavLink} style={getActiveStyles}>
        <Stack gap="2" orientation="horizontal" {...props}>
          <FontAwesomeIcon icon={faReceipt} /> Payroll
        </Stack>
      </Link>

      <Link to="help-desk" component={NavLink} style={getActiveStyles}>
        <Stack gap="2" orientation="horizontal" {...props}>
          <FontAwesomeIcon icon={faQuestionCircle} />
          Help-desk
        </Stack>
      </Link>

      <Link to="visitor-pass" component={NavLink} style={getActiveStyles}>
        <Stack gap="2" orientation="horizontal" {...props}>
          <FontAwesomeIcon icon={faCircleXmark} /> Visitor pass
        </Stack>
      </Link>

      <Link component={NavLink} to="travel" style={getActiveStyles}>
        <Stack gap="2" orientation="horizontal" {...props}>
          <FontAwesomeIcon icon={faPlaneDeparture} /> Travel
        </Stack>
      </Link>

      <Link component={NavLink} to="expense" style={getActiveStyles}>
        <Stack gap="2" orientation="horizontal" {...props}>
          <FontAwesomeIcon icon={faClipboard} /> Expense
        </Stack>
      </Link>

      <Link component={NavLink} to="loan" style={getActiveStyles}>
        <Stack gap="2" orientation="horizontal" {...props}>
          <FontAwesomeIcon icon={faLandmark} /> Loan
        </Stack>
      </Link>

      <Link component={NavLink} to="announcement" style={getActiveStyles}>
        <Stack gap="2" orientation="horizontal" {...props}>
          <FontAwesomeIcon icon={faBullhorn} /> Announcement
        </Stack>{" "}
      </Link>

      <Link to="alert" component={NavLink} style={getActiveStyles}>
        <Stack gap="2" orientation="horizontal" {...props}>
          <FontAwesomeIcon icon={faTriangleExclamation} /> Alert
        </Stack>
      </Link>

      <Link to="admin" component={NavLink} style={getActiveStyles}>
        <Stack gap="2" orientation="horizontal" {...props}>
          <FontAwesomeIcon icon={faUser} /> Admin
        </Stack>
      </Link>

      <Link
        to="login"
        component={NavLink}
        onClick={logout}
        style={getActiveStyles}
      >
        <Stack gap="2" orientation="horizontal" {...props}>
          <FontAwesomeIcon icon={faRightFromBracket} /> Logout
        </Stack>
      </Link>
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
    </div>
  );
};

export default SideNavbar;
