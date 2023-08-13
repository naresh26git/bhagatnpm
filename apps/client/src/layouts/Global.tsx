import { Outlet } from "react-router-dom";
import Container from "ui/Container";
import Hidden from "ui/Hidden";
import Stack from "ui/Stack";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";

export const sideNavbarWidth = "14rem";

export const GlobalLayout = () => {
  const content = (
    <Stack className="h-100 w-100">
      <TopNavbar />

      <Stack className="flex-grow-1 overflow-hidden h-100 w-100">
        <Container maxWidth="fluid" className="p-4 overflow-scroll">
          <Outlet />
        </Container>
      </Stack>
    </Stack>
  );

  return (
    <>
      <Stack orientation="horizontal" className="h-100">
        <Hidden hiddenFor="auto" shownFor="lg" className="h-100">
          <SideNavbar width={sideNavbarWidth} />
        </Hidden>

        <Hidden
          hiddenFor="auto"
          shownFor="lg"
          className="h-100"
          style={{
            width: `calc(100% - ${sideNavbarWidth})`,
            maxWidth: `calc(100% - ${sideNavbarWidth})`,
            minWidth: `calc(100% - ${sideNavbarWidth})`,
          }}
        >
          {content}
        </Hidden>

        <Hidden hiddenFor="lg" shownFor="auto" className="h-100 w-100">
          {content}
        </Hidden>
      </Stack>
    </>
  );
};

export default GlobalLayout;
