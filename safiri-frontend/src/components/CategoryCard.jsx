function CategoryCard({ title, image, status }) {
  return (
    <div className="group relative rounded-3xl overflow-hidden h-72 cursor-pointer">
      
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* softer overlay */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>

      {/* content */}
      <div className="absolute bottom-5 left-5 text-white text-left">
        
        {status && (
          <span className="mb-2 inline-block text-[10px] uppercase tracking-[0.3em] bg-white/20 px-3 py-1 rounded-full">
            {status}
          </span>
        )}

        <h3 className="text-xl md:text-2xl font-serif">
          {title}
        </h3>

      </div>
    </div>
  );
}

export default CategoryCard;