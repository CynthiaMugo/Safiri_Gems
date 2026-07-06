import { Trash2 } from "lucide-react";

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-[#f8f5f2] p-8 shadow-2xl">

        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 p-4">
            <Trash2
              className="text-red-500"
              size={34}
            />
          </div>
        </div>

        <h2 className="mt-6 text-center font-serif text-3xl text-[#5a4a42]">
          Delete Product
        </h2>

        <p className="mt-4 text-center text-[#7a6a61] leading-relaxed">
          Are you sure you want to delete
          <br />
          <span className="font-semibold text-[#5a4a42]">
            {productName}
          </span>
          ?
        </p>

        <p className="mt-2 text-center text-sm text-red-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex gap-4">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-[#c2a67a] py-3 text-[#5a4a42] hover:bg-[#eee6df]"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-500 py-3 text-white hover:bg-red-600"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteModal;