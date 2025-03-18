import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import UserProfileDropdown from "./UserProfileDropdown";

const DesktopIcons = ({ openLoginModal }) => {
  const { user } = useContext(AuthContext);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const openProfileDropdown = () => {
    setIsProfileDropdownOpen(true);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  return (
    <div className="hidden lg:flex justify-between items-center w-[200px] ml-5 text-gray-700 text-xl">
       

      {user ? (
        <div
          className="relative"
          onMouseEnter={openProfileDropdown}
          onMouseLeave={(e) => {
            if (!e.relatedTarget || !e.relatedTarget.closest('.user-profile-dropdown')) {
              setTimeout(closeProfileDropdown, 100);
            }
          }}
        >
          <button className="cursor-pointer font-semibold">
            {user.name || user.username || 'Profile'}
          </button>
          {isProfileDropdownOpen && <UserProfileDropdown onClose={closeProfileDropdown} />}
        </div>
      ) : (
        <i className="fa fa-user user-modal cursor-pointer" onClick={openLoginModal}></i>
      )}

      <i className="fa-regular fa-heart"></i>

      <Link to="/cartpage"><i className="fa-regular fa-cart-shopping"></i></Link>
    </div>
  );
};

export default DesktopIcons;