import { useState } from "react";
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
  Checkbox,
  IconButton,
  Button,
  Box,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useApp } from "./context/AppContext";

export default function CartPage() {
  const { cart, removeFromCart, changeQty, clearCart, cartTotal } = useApp();
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const removeSelected = () => {
    selectedIds.forEach((id) => removeFromCart(id));
    setSelectedIds([]);
  };

  const selectAll = () => {
    if (selectedIds.length === cart.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cart.map((item) => item.id));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        Shopping Cart ({cart.length})
      </Typography>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        {cart.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your shopping cart is currently empty
            </Typography>
            <Button component={Link} to="/products" variant="contained">
              Explore Products
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={selectedIds.length === cart.length && cart.length > 0}
                  indeterminate={selectedIds.length > 0 && selectedIds.length < cart.length}
                  onChange={selectAll}
                />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Select All Items
                </Typography>
              </Box>

              {selectedIds.length > 0 && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  size="small"
                  onClick={removeSelected}
                >
                  Delete Selected ({selectedIds.length})
                </Button>
              )}
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Remove</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((item) => {
                    const isSelected = selectedIds.includes(item.id);
                    return (
                      <TableRow
                        key={item.id}
                        selected={isSelected}
                        sx={{ "&.Mui-selected": { bgcolor: "action.hover" } }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} onChange={() => toggleSelect(item.id)} />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{item.name}</TableCell>
                        <TableCell>{item.brand}</TableCell>
                        <TableCell>${item.price.toLocaleString()}</TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                            <IconButton size="small" onClick={() => changeQty(item.id, -1)}>
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography sx={{ minWidth: 24, textAlign: "center", fontWeight: 700 }}>
                              {item.qty}
                            </Typography>
                            <IconButton size="small" onClick={() => changeQty(item.id, 1)}>
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Total: ${cartTotal.toLocaleString()}
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="outlined" color="inherit" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button variant="contained" size="large">
                  Proceed to Checkout
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Paper>

      <Button component={Link} to="/products" variant="text" sx={{ alignSelf: "flex-start" }}>
        ← Continue Shopping
      </Button>
    </Container>
  );
}