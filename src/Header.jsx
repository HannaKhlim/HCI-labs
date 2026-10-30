import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonIcon from "@mui/icons-material/Person";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import TranslateIcon from "@mui/icons-material/Translate";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useApp } from "./context/AppContext";
import { useTranslation } from "react-i18next";

export default function Header({ organization }) {
  const { cartCount, wishlist } = useApp();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [profileAnchor, setProfileAnchor] = useState(null);

  const handleOpenProfileMenu = (e) => setProfileAnchor(e.currentTarget);
  const handleCloseProfileMenu = () => setProfileAnchor(null);

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
            {t("changeLanguage")}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <LocalShippingIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption" sx={{ color: "inherit" }}>
            Contactless Delivery
          </Typography>
        </Box>
      </Box>

      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar sx={{ bgcolor: "#f5f5f5", justifyContent: "space-between", gap: 2, py: 1 }}>
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center" }}>
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
              bgcolor: "#fff",
              borderRadius: 2,
              px: 2,
              py: 0.5,
              flexGrow: 1,
              maxWidth: 550,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <SearchIcon fontSize="small" sx={{ color: "gray", mr: 1 }} />
            <InputBase
              placeholder="Search catalog..."
              sx={{ flex: 1, fontSize: "0.875rem" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/products?search=${e.target.value}`);
              }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Add New Product">
              <IconButton component={Link} to="/admin/product/new" color="primary">
                <AddBoxOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="User Profile">
              <IconButton onClick={handleOpenProfileMenu} color="inherit">
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={handleCloseProfileMenu}
            >
              <MenuItem
                onClick={() => {
                  handleCloseProfileMenu();
                  navigate("/profile");
                }}
              >
                Profile Dashboard
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseProfileMenu();
                  navigate("/cart");
                }}
              >
                Shopping Cart
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseProfileMenu();
                  navigate("/wishlist");
                }}
              >
                Wishlist
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseProfileMenu();
                  navigate("/admin/product/new");
                }}
              >
                Product Management (CRUD)
              </MenuItem>
            </Menu>

            <Tooltip title="Wishlist">
              <IconButton component={Link} to="/wishlist" color="inherit">
                <Badge badgeContent={wishlist.length} color="error">
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Shopping Cart">
              <IconButton component={Link} to="/cart" color="inherit">
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "space-between",
          px: 3,
          py: 1.5,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography component={Link} to="/products?gender=women" sx={{ fontWeight: 600 }}>
            WOMEN
          </Typography>
          <Typography component={Link} to="/products?gender=men" sx={{ fontWeight: 600 }}>
            MEN
          </Typography>
          <Typography component={Link} to="/products?gender=kids" sx={{ fontWeight: 600 }}>
            KIDS
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography component={Link} to="/products?category=clothes" sx={{ color: "text.secondary" }}>
            Clothing
          </Typography>
          <Typography component={Link} to="/products?category=shoes" sx={{ color: "text.secondary" }}>
            Shoes
          </Typography>
          <Typography component={Link} to="/products?category=accessories" sx={{ color: "text.secondary" }}>
            Accessories
          </Typography>
          <Typography component={Link} to="/products?category=underwear" sx={{ color: "text.secondary" }}>
            Underwear
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}