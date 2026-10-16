import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { useNavigate } from "react-router-dom";
import { useApp } from "./context/AppContext";

export default function ProductTile({ product, onOpen }) {
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useApp();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <Card
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: 470,
        boxSizing: "border-box",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "#ffffff",
        transition: "transform 0.25s, box-shadow 0.25s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 270,
          flexShrink: 0,
          bgcolor: "#f0f0f0",
          cursor: "pointer",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => onOpen && onOpen(product)}
      >
        {!imageError && product.image ? (
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              color: "text.secondary",
            }}
          >
            <CheckroomIcon sx={{ fontSize: 48, opacity: 0.4 }} />
            <Typography variant="caption" sx={{ textTransform: "uppercase", letterSpacing: 1 }}>
              {product.brand}
            </Typography>
          </Box>
        )}

        <Tooltip title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(255, 255, 255, 0.9)",
              boxShadow: 1,
              "&:hover": { bgcolor: "#fff" },
            }}
          >
            {inWishlist ? <FavoriteIcon color="error" fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>

      <CardContent
        sx={{
          flex: "1 0 auto",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          p: 2,
          pb: 1,
        }}
        onClick={() => onOpen && onOpen(product)}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            textTransform: "uppercase",
            fontWeight: 700,
            letterSpacing: 0.5,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.brand}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            lineHeight: 1.25,
            my: 0.5,
            height: "2.5em",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 700, mt: "auto" }}>
          ${product.price.toLocaleString()}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0, height: 50, flexShrink: 0, justifyContent: "space-between", gap: 1 }}>
        <Button
          variant={inCart ? "outlined" : "contained"}
          size="small"
          onClick={() => addToCart(product)}
          sx={{
            flex: 1,
            height: 36,
            fontWeight: 600,
            bgcolor: inCart ? "transparent" : "#1a1a1a",
            color: inCart ? "#1a1a1a" : "#ffffff",
            borderColor: "#1a1a1a",
            "&:hover": {
              bgcolor: inCart ? "rgba(0,0,0,0.04)" : "#333333",
              borderColor: "#1a1a1a",
            },
          }}
        >
          {inCart ? "In Cart ✓" : "Add to Cart"}
        </Button>

        <Tooltip title="Edit Product">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/product/edit/${product.id}`);
            }}
            sx={{ border: "1px solid #e0e0e0", borderRadius: 1, height: 36, width: 36 }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}