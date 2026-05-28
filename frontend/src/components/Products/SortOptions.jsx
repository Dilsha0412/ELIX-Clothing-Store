import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const currentSortBy = searchParams.get("sortBy") || "";

  const options = [
    { value: "", label: "Default" },
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
    { value: "popularity", label: "Popularity" },
  ];

  const currentLabel = options.find(opt => opt.value === currentSortBy)?.label || "Default";

  const handleSortChange = (sortBy) => {
    const newParams = new URLSearchParams(searchParams);
    if (sortBy) {
      newParams.set("sortBy", sortBy);
    } else {
      newParams.delete("sortBy");
    }
    setSearchParams(newParams);
    setIsOpen(false);
  };

  return (
    <div className='mb-6 flex items-center justify-end relative'>
      <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between items-center w-48 border border-neutral-300 px-4 py-2.5 text-xs text-neutral-800 font-semibold bg-white hover:border-black transition rounded-none cursor-pointer text-left"
        >
          <span>{currentLabel}</span>
          <svg className="ml-2 h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <>
            {/* Close Dropdown Overlay */}
            <div 
              className="fixed inset-0 z-30" 
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-1 w-48 bg-white border border-neutral-300 shadow-md z-40 rounded-none">
              <div className="py-1">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSortChange(opt.value)}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider block transition ${
                      currentSortBy === opt.value 
                        ? "bg-black text-white" 
                        : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SortOptions;