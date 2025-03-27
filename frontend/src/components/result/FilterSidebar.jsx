// FilterSidebar.js
import React, { useState, useEffect, useMemo } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const FilterSidebar = ({ products, onFilterChange }) => {
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 0 },
    gender: [],
    product_type: [],
    material: [],
    style: [],
    color: [],
    rim_details: [],
    lens_type: [], // New filter for lens type
    lens_material: [], // New filter for lens material
    new_arrivals: false, // New filter for new arrivals
  });

  const [filterOptions, setFilterOptions] = useState({
    price: { min: 0, max: 0 }
  });

  useEffect(() => {
    if (products?.length) {
      // Extract filter options from products
      const extractOptions = (key, subKey) => [
        ...new Set(products.map(p => subKey ? p[subKey]?.[key] : p[key]).filter(Boolean))
      ];

      // Special handling for color field
      const extractColors = () => [
        ...new Set(
          products.flatMap(p => {
            try {
              return JSON.parse(p.frame?.color || '[]');
            } catch {
              return [];
            }
          }).filter(Boolean)
        )
      ];

      // Price range calculation
      const prices = products.map(p => parseFloat(p.price?.replace('₹', '') || 0));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      setFilterOptions({
        gender: extractOptions('gender'),
        product_type: extractOptions('product_type'),
        material: extractOptions('material', 'frame'),
        style: extractOptions('style', 'frame'),
        color: extractColors(),
        rim_details: extractOptions('rim_details', 'frame'),
        lens_type: extractOptions('lens_type', 'lens'), // Extract lens types
        lens_material: extractOptions('material', 'lens'), // Extract lens materials
        price: { min: minPrice, max: maxPrice }
      });

      // Initialize price range
      setFilters(prev => ({
        ...prev,
        priceRange: { min: minPrice, max: maxPrice }
      }));
    }
  }, [products]);

  const handleCheckboxChange = (filterCategory, value) => (checked) => {
    setFilters(prev => ({
      ...prev,
      [filterCategory]: checked
        ? [...(prev[filterCategory] || []), value]
        : (prev[filterCategory] || []).filter(item => item !== value)
    }));
  };

  const handlePriceChange = (values) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        min: Math.min(...values),
        max: Math.max(...values)
      }
    }));
  };

  const handleNewArrivalsChange = (checked) => {
    setFilters(prev => ({
      ...prev,
      new_arrivals: checked,
    }));
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter(product => {
      const price = parseFloat(product.price?.replace('₹', '') || 0);
      const { min, max } = filters.priceRange;
      const [priceMin, priceMax] = [Math.min(min, max), Math.max(min, max)];

      // Check all filter conditions
      return (
        // Category filters
        (!filters.gender.length || filters.gender.includes(product.gender)) &&
        (!filters.product_type.length || filters.product_type.includes(product.product_type)) &&
        (!filters.material.length || filters.material.includes(product.frame?.material)) &&
        (!filters.style.length || filters.style.includes(product.frame?.style)) &&
        (!filters.rim_details.length || filters.rim_details.includes(product.frame?.rim_details)) &&
        (!filters.lens_type.length || filters.lens_type.includes(product.lens?.lens_type)) &&
        (!filters.lens_material.length || filters.lens_material.includes(product.lens?.material)) &&

        // Color filter
        (!filters.color.length ||
          JSON.parse(product.frame?.color || '[]')
            .some(color => filters.color.includes(color))) &&

        // Price filter
        (price >= priceMin && price <= priceMax) &&

        // New Arrivals filter
        (!filters.new_arrivals || product.new_arrivals === filters.new_arrivals)
      );
    });
  }, [products, filters]);

  useEffect(() => {
    onFilterChange(filteredProducts);
  }, [filteredProducts, onFilterChange]);

  return (
    <Card className="p-3 space-y-4 w-full max-w-xs shadow-none border-0">
      <h3 className="text-lg font-bold text-gray-800">Filter By</h3>

      {/* Price Range Slider */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-700">Price Range (₹)</h4>
        <Slider
          range
          min={filterOptions.price.min}
          max={filterOptions.price.max}
          value={[filters.priceRange.min, filters.priceRange.max]}
          onChange={handlePriceChange}
          allowCross={false}
          trackStyle={[{ backgroundColor: '#3b82f6' }]}
          handleStyle={[
            { borderColor: '#3b82f6', boxShadow: 'none', width: 20, height: 20 },
            { borderColor: '#3b82f6', boxShadow: 'none', width: 20, height: 20 }
          ]}
          railStyle={{ backgroundColor: '#e5e7eb' }}
        />

        <div className="flex justify-between text-sm text-gray-600">
          <span>₹{Math.round(filters.priceRange.min)}</span>
          <span>₹{Math.round(filters.priceRange.max)}</span>
        </div>
      </div>

      {/* New Arrivals Filter */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2 text-sm text-gray-600">
          <Checkbox
            checked={filters.new_arrivals}
            onCheckedChange={handleNewArrivalsChange}
          />
          <span>New Arrivals</span>
        </label>
      </div>

      {/* Dynamic Filter Categories */}
      {Object.entries(filterOptions).map(([category, options]) => {
        if (category === 'price' || !options?.length) return null;

        const formattedCategory = category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        return (
          <div key={category} className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700">{formattedCategory}</h4>
            <div className="space-y-1">
              {options.map(option => (
                <label
                  key={option}
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <Checkbox
                    checked={filters[category]?.includes(option)}
                    onCheckedChange={handleCheckboxChange(category, option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </Card>
  );
};

export default FilterSidebar;