import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DesktopSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setSearchResults();
        setIsOpen(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/products/search?q=${searchQuery}`);
        console.log("API Response:", response.data); // Log the response for debugging

        if (Array.isArray(response.data)) {
          setSearchResults(response.data);
          setIsOpen(true);
        } else {
          console.error("API response is not an array:", response.data);
          setSearchResults(); // Set to empty array to avoid .map error
          setIsOpen(false);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults();
        setIsOpen(false);
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSearchResults();
    }, 300); // Debounce the search by 300ms

    return () => clearTimeout(debounceTimer); // Cleanup the timer
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setSearchQuery(''); // Clear the search query after selecting a result
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchContainerRef]);

  return (
    <div className="hidden lg:relative lg:block w-[550px] ml-5" ref={searchContainerRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search glasses and contact"
          className="w-full border rounded-full py-2 px-4 pl-10 focus:outline-none"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => searchQuery.trim() && setIsOpen(true)}
        />
        <i className="fa fa-search absolute left-3 top-3 text-gray-500"></i>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md rounded-md z-50 overflow-hidden">
            {loading ? (
              <div className="px-4 py-2 text-gray-500">Searching...</div>
            ) : searchResults.length > 0 ? (
              <ul className="max-h-[300px] overflow-y-auto search-bar">
                {searchResults.map((product) => (
                  <li
                    key={product.product_id}
                    className="cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                    onClick={handleResultClick}
                  >
                    <Link
                      to={`/product/${product.product_id}/${product.slug}`} // Updated Link
                      className="block px-4 py-2"
                    >
                      <div className="flex items-center space-x-2">
                        {product.images && product.images.length > 0 && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded-md"
                          />
                        )}
                        <span>{product.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : searchQuery.trim() !== '' ? (
              <div className="px-4 py-2 text-gray-500">No results found.</div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopSearch;