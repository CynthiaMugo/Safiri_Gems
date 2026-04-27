function CategoryCard({ title, image, status }) {
  return (
    <div className="group relative rounded-3xl overflow-hidden h-72 cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        {status && (
          <span className="mb-3 text-xs uppercase tracking-[0.25em] bg-white/20 px-3 py-1 rounded-full">
            {status}
          </span>
        )}

        <h3 className="text-3xl font-serif">{title}</h3>
      </div>
    </div>
  );
}

export default CategoryCard;