import ProductTile from "./ProductTile";

export default function NewArrivalsCarousel({ title, items }) {
  return (
    <section className="product-carousel">
      <div className="product-carousel__header">
        <h2 className="product-carousel__title">{title}</h2>
      </div>
      <div className="product-carousel__wrapper">
        <div className="product-carousel__track">
          {items.map((item) => (
            <ProductTile
              key={item.id}
              name={item.name}
              brand={item.brand}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}