import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";

const UserProfileDropdown = ({ onClose }) => {
  const { logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
    onClose(); // Close the dropdown after logout
  };

  return (
    <div className="absolute top-full right-0 bg-white shadow-lg rounded-md  w-48 z-20 border">
      <ul className="py-2">
        <li>
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={onClose}
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/address"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={onClose}
          >
            Address
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={onClose}
          >
            Orders
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserProfileDropdown;