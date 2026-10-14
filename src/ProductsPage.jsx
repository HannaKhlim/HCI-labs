import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductTile from "./ProductTile";
import productsData from "./data/products.json";

const GENDERS = ["all", "women", "men", "kids"];
const CATEGORIES = ["all", "clothes", "shoes", "accessories", "underwear"];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const gender = searchParams.get("gender") || "all";
  const category = searchParams.get("category") || "all";

  // локальный state для поиска и сортировки
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  // фильтрация
  let filtered = productsData.filter((p) => {
    const matchGender = gender === "all" || p.gender === gender;
    const matchCategory = category === "all" || p.category === category;
    const matchSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchGender && matchCategory && matchSearch;
  });

  // сортировка
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
    <section className="products-layout">
      <aside className="products-filters">
        <div className="filter-group open">
          <div className="filter-group__trigger">
            <span className="filter-group__label">Gender</span>
          </div>
          <div className="filter-group__panel">
            {GENDERS.map((g) => (
              <label key={g} className="filter-group__option">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === g}
                  onChange={() => updateParam("gender", g)}
                />
                <span>{g.toUpperCase()}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group open">
          <div className="filter-group__trigger">
            <span className="filter-group__label">Category</span>
          </div>
          <div className="filter-group__panel">
            {CATEGORIES.map((c) => (
              <label key={c} className="filter-group__option">
                <input
                  type="radio"
                  name="category"
                  checked={category === c}
                  onChange={() => updateParam("category", c)}
                />
                <span>{c.toUpperCase()}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      <div className="products-main">
        <div className="products-toolbar">
          <input
            type="text"
            className="input"
            placeholder="Search by name or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="input"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: low → high</option>
            <option value="price-desc">Price: high → low</option>
            <option value="name">Name A→Z</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="products-empty">No products match your filters.</p>
        ) : (
          <div className="products-grid">
            {filtered.map((product) => (
              <ProductTile
                key={product.id}
                product={product}
                onOpen={(p) => console.log("Open modal for:", p)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}