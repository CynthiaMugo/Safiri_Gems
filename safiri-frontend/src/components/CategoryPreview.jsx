import CategoryCard from "./CategoryCard";
import SectionHeading from "./SectionHeading";

const categories = [
  {
    title: "Earrings",
    image: "/images/category-earrings.jpg",
  },
  {
    title: "Necklaces",
    image: "/images/category-necklaces.jpg",
  },
  {
    title: "Sets",
    image: "/images/category-sets.jpg",
  },
  {
    title: "Bracelets",
    image: "/images/category-bracelets.jpg",
    status: "Coming Soon",
  },
];

function CategoryPreview() {
  return (
    <section className="py-20 px-6 bg-[#eee6df]">
      <SectionHeading
        eyebrow="Shop By Style"
        title="Choose Your Signature Piece"
        description="Explore elegant pieces made to complement your personality, your outfit, and your occasion."
      />

      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            image={category.image}
            status={category.status}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryPreview;