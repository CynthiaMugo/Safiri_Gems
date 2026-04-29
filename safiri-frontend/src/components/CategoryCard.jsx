import { Link } from "react-router-dom";

function CategoryCard({ title, image, status }) {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(title)}`}
      className="group relative block h-72 cursor-pointer overflow-hidden rounded-3xl"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* softer overlay */}
      <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/20"></div>

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

        {/* hover hint */}
        <p className="mt-1 text-xs text-white/80 opacity-0 transition group-hover:opacity-100">
          Shop {title} →
        </p>
      </div>
    </Link>
  );
}

export default CategoryCard;