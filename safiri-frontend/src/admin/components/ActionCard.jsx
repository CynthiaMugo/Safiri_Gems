import { ChevronRight } from "lucide-react";

function ActionCard({
  title,
  description,
  icon: Icon,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-2xl border border-[#e8ddd4] bg-[#f8f5f2] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#c2a67a] hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-[#c2a67a]/15 p-3">
            <Icon
              size={22}
              className="text-[#c2a67a]"
            />
          </div>

          <div>
            <h3 className="font-semibold text-[#5a4a42]">
              {title}
            </h3>

            <p className="mt-1 text-sm text-[#7a6a61]">
              {description}
            </p>
          </div>
        </div>

        <ChevronRight
          className="text-[#c2a67a] transition-transform group-hover:translate-x-1"
          size={22}
        />
      </div>
    </button>
  );
}

export default ActionCard;