import React, { useContext, useState } from "react";
import AuthContext from "../context/authContext";
import MobileUserProfileDropdown from "./MobileUserProfileDropdown";
import { Link } from "react-router-dom";

const MobileControls = ({ setIsSearchOpen, setIsMobileMenuOpen, isSearchOpen, isMobileMenuOpen, openLoginModal }) => {
  const { user } = useContext(AuthContext);
  const [isMobileProfileDropdownOpen, setIsMobileProfileDropdownOpen] = useState(false);

  const toggleMobileProfileDropdown = () => {
    setIsMobileProfileDropdownOpen(!isMobileProfileDropdownOpen);
  };

  const closeMobileProfileDropdown = () => {
    setIsMobileProfileDropdownOpen(false);
  };

  return (
    <div className="flex items-center space-x-10 lg:hidden ">
      <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
        <i className="fa fa-search text-gray-700 text-xl"></i>
      </button>
      {user ? (
        <div className="relative">
          <button onClick={toggleMobileProfileDropdown}>
            <i className="fa fa-user text-gray-700 text-xl"></i>
          </button>
          {isMobileProfileDropdownOpen && <MobileUserProfileDropdown onClose={closeMobileProfileDropdown} />}
        </div>
      ) : (
        <button onClick={openLoginModal}>
          <i className="fa fa-user text-gray-700 text-xl"></i>
        </button>
      )}
     
     <Link to="cartpage"> <i className="fa-regular fa-cart-shopping text-gray-700 text-xl"></i></Link>
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <i className="fa fa-bars text-gray-700 text-xl"></i>
      </button>
    </div>
  );
};

export default MobileControls;