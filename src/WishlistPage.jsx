import { Link } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useApp } from "./context/AppContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useApp();

  return (
    <Container maxWidth="lg" sx={{ py: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        Wishlist ({wishlist.length})
      </Typography>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        {wishlist.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <FavoriteBorderIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your wishlist is currently empty
            </Typography>
            <Button component={Link} to="/products" variant="contained">
              Explore Products
            </Button>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="right">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wishlist.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ fontWeight: 600 }}>{item.name}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>${item.price.toLocaleString()}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        color="error"
                        onClick={() => toggleWishlist(item)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Button component={Link} to="/products" variant="text" sx={{ alignSelf: "flex-start" }}>
        ← Continue Shopping
      </Button>
    </Container>
  );
}