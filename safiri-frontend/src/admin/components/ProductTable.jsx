import ProductRow from "./ProductRow";

function ProductTable({ products, loading }) {
  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-10 shadow-sm">
        <p className="text-center text-[#7a6a61]">
          Loading products...
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-16 text-center shadow-sm">
        <h2 className="font-serif text-3xl text-[#5a4a42]">
          No Products Yet
        </h2>

        <p className="mt-3 text-[#7a6a61]">
          Add your first jewelry item to begin selling.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="grid grid-cols-6 bg-[#f8f5f2] px-6 py-4 text-sm uppercase tracking-[0.2em] text-[#8d7a6c]">
        <div>Product</div>
        <div>Category</div>
        <div>Price</div>
        <div>Stock</div>
        <div>Status</div>
        <div className="text-right">Actions</div>
      </div>

      {products.map(product => (
        <ProductRow
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductTable;