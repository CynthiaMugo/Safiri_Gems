function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10 px-4">
      {eyebrow && (
        <p className="text-sm uppercase tracking-[0.3em] text-[#c2a67a] mb-3">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl md:text-4xl font-serif text-[#5a4a42] mb-4">
        {title}
      </h2>

      {description && (
        <p className="text-sm md:text-base text-[#7a6a61] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;