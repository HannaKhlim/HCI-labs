import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useApp } from "./context/AppContext";

export default function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct } = useApp();

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    gender: "women",
    category: "clothes",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (isEdit) {
      const found = products.find((p) => String(p.id) === String(id));
      if (found) {
        setForm(found);
      }
    }
  }, [id, isEdit, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateProduct(form);
    } else {
      addProduct(form);
    }
    navigate("/products");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      deleteProduct(form.id);
      navigate("/products");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          {isEdit ? "Edit Product Details" : "Create New Product"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Price ($)"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
            fullWidth
          />

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="gender-select-label">Gender</InputLabel>
              <Select
                labelId="gender-select-label"
                name="gender"
                value={form.gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="kids">Kids</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="cat-select-label">Category</InputLabel>
              <Select
                labelId="cat-select-label"
                name="category"
                value={form.category}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem value="clothes">Clothing</MenuItem>
                <MenuItem value="shoes">Shoes</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="underwear">Underwear</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField
            label="Image URL or Path (/photos/...)"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="/photos/Beige Wool Coat.jpg"
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button type="submit" variant="contained" size="large" sx={{ flexGrow: 1 }}>
              {isEdit ? "Save Changes" : "Create Product"}
            </Button>

            {isEdit && (
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete Product
              </Button>
            )}

            <Button variant="text" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}