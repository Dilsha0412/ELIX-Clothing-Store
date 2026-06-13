import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../../hooks/useCurrency';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FilterSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className='mb-6'>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className='flex justify-between items-center w-full focus:outline-none cursor-pointer'
      >
        <span className='text-xs font-bold uppercase tracking-widest text-black'>{title}</span>
        {isOpen ? <FiChevronUp className='text-neutral-500'/> : <FiChevronDown className='text-neutral-500'/>}
      </button>
      <div className='border-b border-neutral-200 my-3'></div>
      {isOpen && (
        <div className='animate-fadeIn'>
          {children}
        </div>
      )}
    </div>
  );
};

const FilterSidebar = () => {
  const { formatPrice } = useCurrency();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: [],
    gender: [],
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
    "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL",
    "15", "15.5", "16", "16.5", "17", "17.5", "28", "30", "32", "34", 
    "36", "38", "40", "42", "44", "45"
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
      category: params.category ? params.category.split(",") : [],
      gender: params.gender ? params.gender.split(",") : [],
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

    setSearchParams(params, { replace: true, preventScrollReset: true });
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
  };

  const handlePriceChangeComplete = () => {
    const newFilters = { ...filters, minPrice: 0, maxPrice: priceRange[1] };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className='p-6 border-r border-neutral-100 min-h-screen bg-white'>
      <h3 className='text-2xl font-black uppercase tracking-wider text-black mb-6 border-b pb-4'>Filters</h3>

      {/* Category Filter */}
      <FilterSection title="Category" defaultOpen={false}>
        {categories.map((category) => (
          <label key={category} className='flex items-center mb-2 cursor-pointer group'>
            <input
              type="checkbox"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category.includes(category)}
              className='mr-3 h-4 w-4 accent-black border-neutral-300 focus:ring-0 rounded-none cursor-pointer flex-shrink-0'
            />
            <span className='text-sm text-neutral-700 font-medium tracking-wide group-hover:text-black transition-colors whitespace-nowrap'>{category}</span>
          </label>
        ))}
      </FilterSection>

      {/* Gender Filter */}
      <FilterSection title="Gender" defaultOpen={false}>
        {genders.map((gender) => (
          <label key={gender} className='flex items-center mb-2 cursor-pointer group'>
            <input
              type="checkbox"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender.includes(gender)}
              className='mr-3 h-4 w-4 accent-black border-neutral-300 focus:ring-0 rounded-none cursor-pointer flex-shrink-0'
            />
            <span className='text-sm text-neutral-700 font-medium tracking-wide group-hover:text-black transition-colors whitespace-nowrap'>{gender}</span>
          </label>
        ))}
      </FilterSection>

      {/* Color Filter */}
      <FilterSection title="Color">
        <div className='flex flex-wrap gap-3'>
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border border-neutral-300 cursor-pointer transition-all duration-200
            hover:scale-110 ${filters.color === color ? "ring-2 ring-black ring-offset-2 scale-110" : ""}`}
              style={{ backgroundColor: color.toLowerCase() }}
              title={color}
            />
          ))}
        </div>
      </FilterSection>

      {/* Size Filter */}
      <FilterSection title="Size">
        <div className='grid grid-cols-4 gap-2'>
          {sizes.map((size) => (
            <button
              key={size}
              name="size"
              value={size}
              onClick={() => handleFilterChange({ target: { name: 'size', value: size, type: 'checkbox', checked: !filters.size.includes(size) } })}
              className={`py-2 text-center text-xs font-semibold uppercase tracking-wider border rounded-none transition-all duration-200 cursor-pointer
                ${filters.size.includes(size) ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-300 hover:border-black hover:text-black'}`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Material Filter */}
      <FilterSection title="Material">
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
      </FilterSection>

      {/* Brand Filter */}
      <FilterSection title="Brand">
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
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection title="Price Range">
        <input
          type="range"
          name='priceRange'
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          onMouseUp={handlePriceChangeComplete}
          onTouchEnd={handlePriceChangeComplete}
          className='w-full h-1 bg-neutral-200 accent-black appearance-none cursor-pointer transition'
        />
        <div className='flex justify-between text-xs text-neutral-500 font-mono mt-2'>
          <span>{formatPrice(0)}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </FilterSection>
    </div>
  );
};

export default FilterSidebar;