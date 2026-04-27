function ProductCard({ product }) {
  return (
    <div className="group bg-white/70 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <span className="absolute top-4 left-4 bg-[#f8f5f2]/90 text-[#5a4a42] text-xs px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-medium text-[#5a4a42]">
          {product.name}
        </h3>

        <p className="text-sm text-[#7a6a61] mt-1">
          KSh {product.price.toLocaleString()}
        </p>

        <button className="mt-4 w-full rounded-full border border-[#c2a67a] text-[#5a4a42] py-2 text-sm hover:bg-[#c2a67a] hover:text-white transition">
          View Details
        </button>
      </div>
    </div>
  );
}

export default ProductCard;