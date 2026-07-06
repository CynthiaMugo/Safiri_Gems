import React from "react";

function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#7a6a61]">
            {title}
          </p>

          <h2 className="mt-3 text-5xl font-bold text-[#5a4a42]">
            {value}
          </h2>
        </div>

        <div
          className={`rounded-2xl p-4 ${color}`}
        >
          <Icon className="text-white" size={26} />
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;