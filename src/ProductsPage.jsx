import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Paper,
  InputLabel,
} from "@mui/material";
import ProductTile from "./ProductTile";
import ProductModal from "./ProductModal";
import { useApp } from "./context/AppContext";

const GENDERS = [
  { value: "all", label: "All Genders" },
  { value: "women", label: "Women" },
  { value: "men", label: "Men" },
  { value: "kids", label: "Kids" },
];

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "clothes", label: "Clothing" },
  { value: "shoes", label: "Shoes" },
  { value: "accessories", label: "Accessories" },
  { value: "underwear", label: "Underwear" },
];

export default function ProductsPage() {
  const { products } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const gender = searchParams.get("gender") || "all";
  const category = searchParams.get("category") || "all";
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sort, setSort] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);

  let filtered = products.filter((p) => {
    const matchGender = gender === "all" || p.gender === gender;
    const matchCategory = category === "all" || p.category === category;
    const matchSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchGender && matchCategory && matchSearch;
  });

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value === "all") next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, width: "100%", alignItems: "flex-start" }}>
      <Paper sx={{ width: { xs: "100%", md: 260 }, p: 3, flexShrink: 0, borderRadius: 2 }} elevation={2}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Filters
        </Typography>

        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend" sx={{ fontWeight: 600 }}>Gender</FormLabel>
          <RadioGroup value={gender} onChange={(e) => updateParam("gender", e.target.value)}>
            {GENDERS.map((g) => (
              <FormControlLabel key={g.value} value={g.value} control={<Radio size="small" />} label={g.label} />
            ))}
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ fontWeight: 600 }}>Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => updateParam("category", e.target.value)}>
            {CATEGORIES.map((c) => (
              <FormControlLabel key={c.value} value={c.value} control={<Radio size="small" />} label={c.label} />
            ))}
          </RadioGroup>
        </FormControl>
      </Paper>

      <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <TextField
            placeholder="Search by product name or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ flex: 1, minWidth: 240 }}
          />

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sort} label="Sort By" onChange={(e) => setSort(e.target.value)}>
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
              <MenuItem value="name">Name (A-Z)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Products found: {filtered.length}
        </Typography>

        {filtered.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
            <Typography variant="h6">No products match your criteria</Typography>
          </Paper>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 3,
              width: "100%",
            }}
          >
            {filtered.map((product) => (
              <ProductTile
                key={product.id}
                product={product}
                onOpen={(p) => setSelectedProduct(p)}
              />
            ))}
          </Box>
        )}
      </Box>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </Box>
  );
}