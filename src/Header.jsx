import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Badge,
  Box,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import TranslateIcon from "@mui/icons-material/Translate";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useApp } from "./context/AppContext";

export default function Header({ organization }) {
  const { cartCount, wishlist } = useApp();

  return (
    <Box component="header" sx={{ mb: 2 }}>
      <Box
        sx={{
          bgcolor: "#000",
          color: "#fff",
          fontSize: "0.8125rem",
          px: 3,
          py: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <EmailIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption" sx={{ color: "inherit" }}>
            support@deepmag.ru
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <PhoneIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption" sx={{ color: "inherit" }}>
            +7 (919)-123-45-56
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <WhatsAppIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption" sx={{ color: "inherit" }}>
            WhatsApp
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }}>
          <Brightness4Icon sx={{ fontSize: 16 }} />
          <Typography variant="caption" sx={{ color: "inherit" }}>
            Change Theme
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }}>
          <AccessibilityIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption" sx={{ color: "inherit" }}>
            Accessibility
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }}>
          <TranslateIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption" sx={{ color: "inherit" }}>
            Change Language
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <LocalShippingIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption" sx={{ color: "inherit" }}>
            Contactless Delivery
          </Typography>
        </Box>
      </Box>

      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar
          sx={{
            bgcolor: "#f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            py: 1,
          }}
        >
          <Box
            component={Link}
            to="/"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box
              component="img"
              src="/logos/logo.png"
              alt={organization}
              sx={{ height: 40, width: "auto" }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#d3d3d3",
              borderRadius: 1,
              px: 1,
              flexGrow: 1,
              maxWidth: 600,
            }}
          >
            <SearchIcon fontSize="small" />
            <InputBase
              placeholder="Search"
              sx={{ ml: 1, flex: 1, fontSize: "0.875rem" }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton component={Link} to="/profile" aria-label="Profile">
              <PersonIcon />
            </IconButton>

            <IconButton component={Link} to="/profile" aria-label="Wishlist">
              <Badge badgeContent={wishlist.length} color="error">
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>

            <IconButton component={Link} to="/profile" aria-label="Cart">
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          bgcolor: "#f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          px: 3,
          py: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography
            component={Link}
            to="/products?gender=women"
            sx={{ textDecoration: "none", color: "inherit", fontWeight: 500 }}
          >
            WOMEN
          </Typography>
          <Typography
            component={Link}
            to="/products?gender=men"
            sx={{ textDecoration: "none", color: "inherit", fontWeight: 500 }}
          >
            MEN
          </Typography>
          <Typography
            component={Link}
            to="/products?gender=kids"
            sx={{ textDecoration: "none", color: "inherit", fontWeight: 500 }}
          >
            KIDS
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography
            component={Link}
            to="/products?category=clothes"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Clothing
          </Typography>
          <Typography
            component={Link}
            to="/products?category=shoes"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Shoes
          </Typography>
          <Typography
            component={Link}
            to="/products?category=accessories"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Bags &amp; Accessories
          </Typography>
          <Typography
            component={Link}
            to="/products?category=underwear"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Underwear
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}