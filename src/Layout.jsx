import { Outlet } from "react-router-dom";
import { Box, Snackbar, Alert } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { useApp } from "./context/AppContext";

export default function Layout() {
  const organization = "DEEPMAG";
  const { notification, closeNotification } = useApp();

  return (
    <>
      <Header organization={organization} />
      <Box
        component="main"
        sx={{
          px: { xs: 2, md: 4, lg: 6 },
          py: { xs: 3, md: 4 },
          minHeight: "70vh",
        }}
      >
        <Outlet />
      </Box>
      <Footer organization={organization} />

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={closeNotification} severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}