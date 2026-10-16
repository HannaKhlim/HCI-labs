import { Link } from "react-router-dom";
import { Container, Box, Typography, Button, Paper } from "@mui/material";

export default function NotFoundPage() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 6,
          textAlign: "center",
          maxWidth: 600,
          width: "100%",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: "6rem", fontWeight: 800, lineHeight: 1 }}
        >
          404
        </Typography>

        <Typography variant="h5" sx={{ mb: 2, color: "text.secondary" }}>
          Page Not Found
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
          The page you are looking for does not exist or has been moved.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          sx={{ bgcolor: "#1a1a1a", "&:hover": { bgcolor: "#333" } }}
        >
          Return Home
        </Button>
      </Paper>
    </Container>
  );
}