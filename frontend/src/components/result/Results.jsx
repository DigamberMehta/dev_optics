import React, { useEffect, useState } from "react";
import { useParams, useLocation } from 'react-router-dom';
import OpticsCards from "./OpticsCards";
import FilterSidebar from "./FilterSidebar";

const Results = () => {
  const { category, subcategory } = useParams();
  const location = useLocation();
  const products = location.state?.products || []; // Access products from route state
  const [filteredProducts, setFilteredProducts] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category && subcategory && products.length > 0) {
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

      let filtered =[];
      if (productTypesToFilter && productTypesToFilter.length > 0) {
        filtered = products.filter(
          (product) =>
            product.gender === category &&
            productTypesToFilter.includes(product.product_type)
        );
      } else {
        // Handle cases where direct mapping might not exist
        filtered = products.filter(
          (product) =>
            product.gender === category &&
            (formattedSubcategory === "Reading Glasses" && product.product_type === "frame" && product.name.toLowerCase().includes("reading")) ||
            (formattedSubcategory === "Accessories" && product.product_type === "Accessories") // Assuming 'Accessories' product type
        );
      }
      setFilteredProducts(filtered);
      setLoading(false);
    } else if (category && subcategory && products.length === 0) {
      // Handle the case where products might not have been passed (e.g., direct navigation)
      console.log("Products data not received in Results component.");
      setLoading(false);
      // You might want to fetch the data again here if needed
    }
  }, [category, subcategory, products]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="flex pt-[140px]">
      <div className="hidden md:block w-1/4 ">
        <FilterSidebar />
      </div>
      <div className="w-full md:w-3/4">
        <OpticsCards products={filteredProducts} category={category} subCategory={subcategory.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} />
      </div>
    </div>
  );
};

export default Results;