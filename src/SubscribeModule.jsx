import { Box, Paper, Typography } from "@mui/material";
import SubscribeForm from "./SubscribeForm";

export default function SubscribeModule() {
  return (
    <Paper
      elevation={0}
      sx={{
        my: 6,
        py: { xs: 5, md: 7 },
        px: { xs: 3, md: 6 },
        borderRadius: 4,
        textAlign: "center",
        bgcolor: "#f7f7f7",
        border: "1px solid #ebebeb",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
          lineHeight: 1.2,
          color: "#1a1a1a",
          mb: 1.5,
        }}
      >
        Subscribe to our newsletter and get{" "}
        <Box component="span" sx={{ color: "error.main" }}>
          10% off
        </Box>{" "}
        your order
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 520, mx: "auto", fontSize: { xs: "0.95rem", md: "1.05rem" } }}
      >
        Stay updated with our latest designer arrivals, seasonal sales, and member-only privileges.
      </Typography>

      <SubscribeForm />
    </Paper>
  );
}