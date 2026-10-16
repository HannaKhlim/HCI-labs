import { Link } from "react-router-dom";
import { Container, Paper, Typography, Box, Button, Grid, Divider } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useApp } from "./context/AppContext";

export default function ProfilePage() {
  const { cartCount, cartTotal, wishlist } = useApp();

  return (
    <Container maxWidth="md" sx={{ py: 3, display: "flex", flexDirection: "column", gap: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        User Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ShoppingBagOutlinedIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Shopping Cart
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Total items: {cartCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total sum: ${cartTotal.toLocaleString()}
            </Typography>
            <Button component={Link} to="/cart" variant="contained" sx={{ mt: 1 }}>
              Open Cart
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FavoriteBorderIcon color="error" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Wishlist
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Saved items: {wishlist.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Favorites ready to buy
            </Typography>
            <Button component={Link} to="/wishlist" variant="outlined" sx={{ mt: 1 }}>
              Open Wishlist
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Product Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Create, update, or remove objects in the store catalog.
        </Typography>
        <Button
          component={Link}
          to="/admin/product/new"
          variant="contained"
          startIcon={<AddBoxOutlinedIcon />}
        >
          Add New Product
        </Button>
      </Paper>

      <Divider />

      <Button component={Link} to="/products" variant="text" sx={{ alignSelf: "flex-start" }}>
        ← Continue Shopping
      </Button>
    </Container>
  );
}