import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from 'react-router-dom';
import OpticsCards from "./OpticsCards";
import FilterSidebar from "./FilterSidebar";
import Banner from "../banners/Banner";

const CategoryResults = () => {
  const { category, subcategory } = useParams();
  const location = useLocation();
  const initialProducts = location.state?.products || []; // Access products from route state
  const [filteredProducts, setFilteredProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(initialProducts); // State to hold the initial products

  useEffect(() => {
    if (category && subcategory && initialProducts.length > 0) {
      setLoading(true);
      const formattedSubcategory = subcategory.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

      const categoryMapping = {
        "Eyeglasses": ["Eyeglasses", "prescription_glasses", "frame"],
        "Sunglasses": ["sunglasses", "prescription_sunglasses"],
        "Computer Glasses": ["blue_light_glasses", "computer_glasses"],
        "Reading Glasses": ["Reading_Glasses", "frame"],
        "Contact Lenses": ["Contact_Lenses"],
        "Accessories": ["Accessories"],
      };

      const productTypesToFilter = categoryMapping[formattedSubcategory];

      let initialFiltered = [];
      if (productTypesToFilter && productTypesToFilter.length > 0) {
        initialFiltered = initialProducts.filter(
          (product) =>
            product.gender === category &&
            productTypesToFilter.includes(product.product_type)
        );
      } else {
        initialFiltered = initialProducts.filter(
          (product) =>
            product.gender === category &&
            (formattedSubcategory === "Reading Glasses" && product.product_type === "frame" && product.name.toLowerCase().includes("reading")) ||
            (formattedSubcategory === "Accessories" && product.product_type === "Accessories")
        );
      }
      setFilteredProducts(initialFiltered);
      setProducts(initialProducts); // Set the products state with the initial data
      setLoading(false);
    } else if (category && subcategory && initialProducts.length === 0) {
      console.log("Products data not received in CategoryResults component.");
      setLoading(false);
    }
  }, [category, subcategory, initialProducts]);

  const handleFilterChange = useCallback((newFilteredProducts) => {
    setFilteredProducts(newFilteredProducts);
  },);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="flex  flex-col">
      <Banner img={' https://static1.lenskart.com/media/desktop/img/Dec22/desk-hust.gif'}/>
      <div className="flex">
        <div className="hidden md:block w-1/4 border-2 border-gray-200 p-2">
          <FilterSidebar products={products} onFilterChange={handleFilterChange} />
        </div>
        <div className="w-full md:w-3/4 border-2 border-gray-200 p-2 bg-[#FBF9F7]">
          <OpticsCards
            products={filteredProducts}
            category={category}
            subCategory={subcategory.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryResults;