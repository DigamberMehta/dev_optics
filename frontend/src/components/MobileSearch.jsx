import React from "react";

const MobileSearch = ({ isSearchOpen, setIsSearchOpen }) => {
  return (
    <>
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white p-4 lg:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search glasses and contact"
              className="w-full border rounded-full py-2 px-4 pl-10 focus:outline-none"
            />
            <i className="fa fa-search absolute left-3 top-3 text-gray-500"></i>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSearch;