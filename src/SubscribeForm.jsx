import { useState } from "react";
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useApp } from "./context/AppContext";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const { notify } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      notify(`Thank you! Subscription confirmed for ${email}`);
      setEmail("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "stretch",
        gap: 1.5,
        width: "100%",
        maxWidth: 640,
        mx: "auto",
        mt: 3,
      }}
    >
      <TextField
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlinedIcon color="action" />
            </InputAdornment>
          ),
          sx: {
            bgcolor: "#fff",
            borderRadius: 2,
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{
          px: 4,
          py: 1.5,
          fontWeight: 700,
          letterSpacing: 1,
          borderRadius: 2,
          whiteSpace: "nowrap",
          bgcolor: "#1a1a1a",
          "&:hover": { bgcolor: "#333" },
        }}
      >
        SUBSCRIBE
      </Button>
    </Box>
  );
}