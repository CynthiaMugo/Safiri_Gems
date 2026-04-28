import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";

function ProductGrid({
  products,
  eyebrow = "Our Collection",
  title = "Pieces Made to Feel Personal",
  description = "From pearl earrings to elegant necklaces, each piece is chosen to add quiet beauty to your everyday style.",
  showActions = true,
  showViewAllButton = false,
}) {
  return (
    <section className="py-20 px-6 bg-[#f8f5f2]">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showActions={showActions}
          />
        ))}
      </div>

      {showViewAllButton && (
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-block rounded-full bg-[#c2a67a] px-8 py-3 text-sm font-medium text-white transition hover:bg-[#5a4a42]"
          >
            View Full Collection
          </Link>
        </div>
      )}
    </section>
  );
}

export default ProductGrid;