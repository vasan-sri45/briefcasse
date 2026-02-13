"use client";

export default function SalesByCategories({ categories = [] }) {
  if (!Array.isArray(categories) || categories.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h3 className="text-lg font-bold mb-4">
        Services by Category
      </h3>

      <ul className="space-y-3">
        {categories.map((cat) => (
          <li
            key={cat.title}
            className="flex justify-between"
          >
            <span>{cat.title}</span>
            <span className="font-bold text-[#F7631B]">
              {cat.services}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}


