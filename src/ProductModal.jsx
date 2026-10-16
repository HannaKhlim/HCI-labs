import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useApp } from "./context/AppContext";

export default function ProductModal({ product, onClose }) {
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useApp();
  const navigate = useNavigate();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <Dialog open={Boolean(product)} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Product Details
        </Typography>
        <IconButton onClick={onClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{ width: "100%", maxHeight: 420, borderRadius: 2, objectFit: "cover" }}
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Chip label={product.brand} color="primary" size="small" />
              <Chip label={product.category} variant="outlined" size="small" />
              <Chip label={product.gender} variant="outlined" size="small" />
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {product.name}
            </Typography>

            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 800 }}>
              ${product.price.toLocaleString()}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              {product.description || "No description provided for this item."}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => addToCart(product)}
                sx={{ flexGrow: 1 }}
              >
                {inCart ? "Add Another (In Cart) ✓" : "Add to Cart"}
              </Button>

              <Button
                variant="outlined"
                color="error"
                startIcon={inWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                onClick={() => toggleWishlist(product)}
              >
                {inWishlist ? "In Wishlist" : "Wishlist"}
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
        <Button
          startIcon={<EditIcon />}
          onClick={() => {
            onClose();
            navigate(`/admin/product/edit/${product.id}`);
          }}
        >
          Edit Product
        </Button>
        <Button onClick={onClose} variant="text" color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}