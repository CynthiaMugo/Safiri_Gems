import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";

function ProductGrid({ products }) {
  return (
    <section className="py-20 px-6 bg-[#f8f5f2]">
      <SectionHeading
        eyebrow="Our Collection"
        title="Pieces Made to Feel Personal"
        description="From pearl earrings to elegant necklaces, each piece is chosen to add quiet beauty to your everyday style."
      />

      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;