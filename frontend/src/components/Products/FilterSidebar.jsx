import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);
  const categories = ["Top Wear", "Bottom Wear"];

  const colors = [
    "Red",
    "Blue",
    "Green",
    "Black",
    "White",
    "Yellow",
    "Beige",
    "Navy",
  ];
  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL"
  ];
  const materials = [
    "Cotton",
    "Polyester",
    "Wool",
    "Linen",
    "Denim",
    "Leather",
    "Rayon"
  ];
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Classic Comfort",
  ];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([params.minPrice || 0, params.maxPrice || 100]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      const value = newFilters[key];

      if (Array.isArray(value) && value.length > 0) {
        params.append(key, value.join(","));
      }

      else if (value && !Array.isArray(value)) {
        params.append(key, value);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className='p-6 border-r border-neutral-100 min-h-screen bg-white'>
      <h3 className='text-2xl font-black uppercase tracking-wider text-black mb-6 border-b pb-4'>Filters</h3>

      {/* Category Filter */}
      <div className='mb-6'>
        <label className='block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3'>Category</label>
        {categories.map((category) => (
          <label key={category} className='flex items-center mb-2 cursor-pointer group'>
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              className='mr-3 h-4 w-4 accent-black border-neutral-300 focus:ring-0 cursor-pointer flex-shrink-0'
            />
            <span className='text-sm text-neutral-700 font-medium tracking-wide group-hover:text-black transition-colors whitespace-nowrap'>{category}</span>
          </label>
        ))}
      </div>

      {/* Gender Filter */}
      <div className='mb-6'>
        <label className='block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3'>Gender</label>
        {genders.map((gender) => (
          <label key={gender} className='flex items-center mb-2 cursor-pointer group'>
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender === gender}
              className='mr-3 h-4 w-4 accent-black border-neutral-300 focus:ring-0 cursor-pointer flex-shrink-0'
            />
            <span className='text-sm text-neutral-700 font-medium tracking-wide group-hover:text-black transition-colors whitespace-nowrap'>{gender}</span>
          </label>
        ))}
      </div>

      {/* Color Filter */}
      <div className='mb-6'>
        <label className='block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3'>Color</label>
        <div className='grid grid-cols-2 gap-3 w-fit'>
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={`w-7 h-7 rounded-full border border-neutral-300 cursor-pointer transition-all duration-200
            hover:scale-110 ${filters.color === color ? "ring-2 ring-black ring-offset-2 scale-110" : ""}`}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className='mb-6'>
        <label className='block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3'>Size</label>
        <div className='space-y-2'>
          {sizes.map((size) => (
            <label key={size} className='flex items-center cursor-pointer group'>
              <input
                type="checkbox"
                name="size"
                value={size}
                onChange={handleFilterChange}
                checked={filters.size.includes(size)}
                className='mr-3 h-4 w-4 accent-black border-neutral-300 focus:ring-0 rounded-none cursor-pointer flex-shrink-0'
              />
              <span className='text-sm text-neutral-700 font-medium tracking-wide group-hover:text-black transition-colors whitespace-nowrap'>{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Material Filter */}
      <div className='mb-6'>
        <label className='block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3'>Material</label>
        <div className='space-y-2'>
          {materials.map((material) => (
            <label key={material} className='flex items-center cursor-pointer group'>
              <input
                type="checkbox"
                name="material"
                value={material}
                onChange={handleFilterChange}
                checked={filters.material.includes(material)}
                className='mr-3 h-4 w-4 accent-black border-neutral-300 focus:ring-0 rounded-none cursor-pointer flex-shrink-0'
              />
              <span className='text-sm text-neutral-700 font-medium tracking-wide group-hover:text-black transition-colors whitespace-nowrap'>{material}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className='mb-6'>
        <label className='block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3'>Brand</label>
        <div className='space-y-2 mb-6'>
          {brands.map((brand) => (
            <label key={brand} className='flex items-center cursor-pointer group'>
              <input
                type="checkbox"
                name="brand"
                value={brand}
                onChange={handleFilterChange}
                checked={filters.brand.includes(brand)}
                className='mr-3 h-4 w-4 accent-black border-neutral-300 focus:ring-0 rounded-none cursor-pointer flex-shrink-0'
              />
              <span className='text-sm text-neutral-700 font-medium tracking-wide group-hover:text-black transition-colors whitespace-nowrap'>{brand}</span>
            </label>
          ))}
        </div>

        {/* Price Range Filter */}
        <div className='mb-6 pt-4 border-t border-neutral-100'>
          <label className='block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3'>
            Price Range
          </label>
          <input
            type="range"
            name='priceRange'
            min={0}
            max={100}
            value={priceRange[1]}
            onChange={handlePriceChange}
            className='w-full h-1 bg-neutral-200 accent-black appearance-none cursor-pointer transition'
          />
          <div className='flex justify-between text-xs text-neutral-500 font-mono mt-2'>
            <span>$0</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;