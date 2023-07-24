import { Outlet } from "react-router-dom";
import Container from "ui/Container";
import Hidden from "ui/Hidden";
import Stack from "ui/Stack";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";

export const GlobalLayout = () => {
  return (
    <>
      <Stack orientation="horizontal" className="h-100">
        <Hidden hiddenFor="auto" shownFor="lg" className="h-100">
          <SideNavbar />
        </Hidden>

        <Stack className="h-100 w-100">
          <TopNavbar />

          <Stack className="flex-grow-1 overflow-hidden h-100 w-100">
            <Container maxWidth="fluid" className="p-4 overflow-scroll">
              <Outlet />
            </Container>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default GlobalLayout;
