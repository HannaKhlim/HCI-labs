# Laboratory Work 2 & 3: React SPA with Material-UI

## Used Component Library

The project uses **Material-UI (@mui/material, @mui/icons-material)**.

## Material-UI Components Used (22 distinct components):

1. **AppBar** — Primary navigation header (`Header.jsx`)
2. **Toolbar** — Action bar container (`Header.jsx`)
3. **Typography** — Standardized text hierarchy across the application
4. **Button** — Action triggers across forms, cards, and modal dialogs
5. **IconButton** — Icon-based interactive buttons (cart, wishlist, delete, counter)
6. **Card** — Product presentation cards (`ProductTile.jsx`)
7. **CardMedia** — Image containers for product catalog cards
8. **CardContent** — Main body wrapper for product details
9. **CardActions** — Bottom action area on catalog cards
10. **Dialog** — Full modal window popup for item inspection (`ProductModal.jsx`)
11. **DialogTitle** — Header area of modal dialog
12. **DialogContent** — Body container of modal dialog
13. **DialogActions** — Footer controls of modal dialog
14. **TextField** — Form input elements and search bars (`ProductFormPage.jsx`, `ProductsPage.jsx`)
15. **Select** — Dropdown selection lists for sorting and category picking
16. **MenuItem** — Individual option items in dropdown menus
17. **Checkbox** — Multi-selection controls with row highlighting (`ProfilePage.jsx`)
18. **RadioGroup / Radio / FormControlLabel** — Gender and category filter panels
19. **Badge** — Numeric counters on cart and wishlist icons
20. **Menu** — User profile dropdown list in header
21. **Table / TableHead / TableBody / TableRow / TableCell** — Data grid for cart and wishlist items
22. **Paper** — Elevated surface backgrounds for containers and forms
23. **Tooltip** — Informative hover hints on interactive elements
24. **Snackbar / Alert** — Toast notification system for CRUD operations
25. **Chip** — Attribute badges for brand and category tags

## Features Implemented:

- **Routing (React Router v6)**: Home, catalog with search/filter, profile/cart, product create/edit form, 404 page.
- **State Management & Full CRUD**:
  - Initialized from `products.json`.
  - Add new products via dedicated form.
  - Edit existing product data.
  - Delete products from the catalog.
  - Multiple selection with visual highlight and bulk deletion in cart.
- **Modal Popup Window**: Detailed view with purchase and wishlist actions.
- **Responsive Layout**: Designed for resolutions from 320px up to 1920px.
