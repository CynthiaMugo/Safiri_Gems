import { useState } from "react";

function ImageWithSkeleton({ src, alt, className = "" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#e8ddd4]">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#e8ddd4] via-[#f8f5f2] to-[#e8ddd4]" />
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`${className} transition duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default ImageWithSkeleton;