import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FilterSidebar from './FilterSidebar';
import OpticsCards from './OpticsCards';
 

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) {
        setSearchResults();
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3000/api/products/search?q=${searchQuery}`);
        console.log("Search Results API Response:", response.data);
        if (Array.isArray(response.data)) {
          setSearchResults(response.data);
        } else {
          console.error("Search API response is not an array:", response.data);
          setSearchResults();
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError(err.message || 'Failed to fetch search results.');
        setSearchResults();
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  if (loading) {
    return <div>Loading search results...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex pt-[140px]">
      <div className="hidden md:block w-1/4 ">
        <FilterSidebar />
      </div>
      <div className="w-full md:w-3/4">
        {searchResults.length > 0 ? (
          <OpticsCards products={searchResults} />
        ) : (
          <p>No products found matching your search query.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;