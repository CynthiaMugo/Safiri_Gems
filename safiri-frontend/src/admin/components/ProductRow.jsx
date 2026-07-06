import { Pencil, Trash2 } from "lucide-react";

function ProductRow({ product }) {
  return (
    <div className="grid grid-cols-6 items-center border-t px-6 py-5">
      <div className="flex items-center gap-4">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="h-16 w-16 rounded-xl object-cover"
        />

        <div>
          <h3 className="font-medium text-[#5a4a42]">
            {product.name}
          </h3>

          <p className="text-sm text-[#7a6a61]">
            #{product.id}
          </p>
        </div>
      </div>

      <p>{product.category}</p>

      <p>KSh {product.price.toLocaleString()}</p>

      <p>{product.stock}</p>

      <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
        Active
      </span>

      <div className="flex justify-end gap-3">
        <button className="rounded-lg bg-[#c2a67a] p-2 text-white hover:bg-[#5a4a42]">
          <Pencil size={18} />
        </button>

        <button className="rounded-lg border border-red-300 p-2 text-red-500 hover:bg-red-500 hover:text-white">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default ProductRow;