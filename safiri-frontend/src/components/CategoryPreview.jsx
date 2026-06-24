import { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import SectionHeading from "./SectionHeading";
import { getCategories } from "../services/categoryService";



function CategoryPreview() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();

        const categoriesWithImages = data.map((category) => ({
          ...category,
          image:
            category.name === "Earrings"
              ? "/placeholder3.jpeg"
              : category.name === "Necklaces"
              ? "/placeholder7.jpeg"
              : category.name === "Sets"
              ? "/placeholder9.jpeg"
              : category.name === "Bracelets"
              ? "/placeholder1.jpeg"
              : "/placeholder.jpeg",
        }));

        setCategories(categoriesWithImages);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <section className="py-20 px-6 bg-[#eee6df]">
      <SectionHeading
        eyebrow="Shop By Style"
        title="Choose Your Signature Piece"
        description="Explore elegant pieces made to complement your personality, your outfit, and your occasion."
      />

      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.slice(0, 4).map((category) => (
          <CategoryCard
            key={category.id}
            title={category.name}
            image={category.image}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryPreview;