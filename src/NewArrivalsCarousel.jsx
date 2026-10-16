import { Box, Typography } from "@mui/material";
import ProductTile from "./ProductTile";

export default function NewArrivalsCarousel({ title, items, onOpenProduct }) {
  return (
    <Box component="section" sx={{ my: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 2,
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#ccc", borderRadius: 4 },
        }}
      >
        {items.map((item) => (
          <Box key={item.id} sx={{ flex: "0 0 260px", width: 260 }}>
            <ProductTile product={item} onOpen={onOpenProduct} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}