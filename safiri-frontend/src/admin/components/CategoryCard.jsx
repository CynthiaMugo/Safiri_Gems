function CategoryCard({
  category,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-3xl border border-[#f1ece7] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="font-serif text-2xl text-[#5a4a42]">
            {category.name}
          </h2>

          <p className="mt-3 min-h-[48px] text-sm leading-6 text-[#7a6a61]">
            {category.description || "No description provided."}
          </p>

        </div>

        <div className="rounded-full bg-[#f8f5f2] px-3 py-1 text-xs font-medium text-[#5a4a42]">
          {category.product_count} Products
        </div>

      </div>

      <div className="mt-8 flex gap-3">

        <button
          onClick={onEdit}
          className="flex-1 rounded-xl border border-[#c2a67a] py-2 text-[#5a4a42] transition hover:bg-[#f8f5f2]"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="flex-1 rounded-xl bg-red-50 py-2 text-red-600 transition hover:bg-red-100"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default CategoryCard;