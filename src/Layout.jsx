import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const organization = "DEEPMAG";

  return (
    <>
      <Header organization={organization} />
      <Box
        component="main"
        sx={{
          px: { xs: 2, md: 4, lg: 6 },
          py: { xs: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Outlet />
      </Box>
      <Footer organization={organization} />
    </>
  );
}