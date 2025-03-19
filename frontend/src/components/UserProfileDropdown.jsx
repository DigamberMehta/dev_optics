import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import { toast } from "sonner"; // Import Sonner's toast function

const UserProfileDropdown = ({ onClose }) => {
  const { logoutUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Successfully logged out!");
      onClose(); // Close the dropdown after successful logout
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
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