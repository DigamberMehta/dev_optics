import React, { useState, useEffect, useContext } from "react";
import EyeAppointment from "../pages/EyeAppointment";
import Login from "../pages/Login";
import DesktopMenu from "./DesktopMenu";
import DesktopIcons from "./DesktopIcons";
import MobileControls from "./MobileControls";
import MobileSearch from "./MobileSearch";
import MobileMenu from "./MobileMenu";
import AuthContext from "../context/authContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoginModalMounted, setIsLoginModalMounted] = useState(false);
  const { user } = useContext(AuthContext); // Get user from context

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.style.overflow = isAppointmentModalOpen || isLoginModalOpen ? "hidden" : "auto";
    }
    return () => {
      if (rootElement) {
        rootElement.style.overflow = "auto";
      }
    };
  }, [isAppointmentModalOpen, isLoginModalOpen]);

  useEffect(() => {
    setIsLoginModalMounted(isLoginModalOpen);
    if (!isLoginModalOpen) {
      setTimeout(() => setIsLoginModalMounted(false), 300);
    }
  }, [isLoginModalOpen]);

  const menus = [
    { name: "EYEGLASSES", subMenu: ["Men", "Women", "Kids"] },
    { name: "SUNGLASSES", subMenu: ["Men", "Women", "Kids"] },
    { name: "SPORTS", subMenu: ["Cycling", "Running", "Swimming"] },
    { name: "BOOK APPOINTMENT" },
  ];

  const openAppointmentModal = () => {
    setIsAppointmentModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="w-full shadow-lg border-b bg-white z-50 fixed top-0">
      <div className="flex items-center justify-between px-6 py-3 relative">

      <div className="text-2xl font-bold text-[#46bac8]">
        <Link to="/">Dev Optics</Link>
      </div>

        <DesktopMenu menus={menus} openAppointmentModal={openAppointmentModal} />

            <div className="hidden lg:relative lg:block w-[550px] ml-5">
              <input
                type="text"
                placeholder="Search glasses and contact"
                className="w-full border rounded-full py-2 px-4 pl-10 focus:outline-none"
              />
              <i className="fa fa-search absolute left-3 top-3 text-gray-500"></i>
          </div>

        <DesktopIcons openLoginModal={openLoginModal} />

      <MobileControls
          setIsSearchOpen={setIsSearchOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isSearchOpen={isSearchOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          openLoginModal={openLoginModal} // Pass openLoginModal
        />
      </div>

      <MobileSearch isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        menus={menus}
        openAppointmentModal={openAppointmentModal}
        activeSubMenu={activeSubMenu}
        setActiveSubMenu={setActiveSubMenu}
      />

      {isAppointmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 py-4 px-4">
          <EyeAppointment closeModal={closeAppointmentModal} />
        </div>
      )}

      {isLoginModalMounted && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 py-4 px-4 ${isLoginModalOpen ? 'opacity-100' : 'opacity-0'}`}>
          <Login closeModal={closeLoginModal} />
        </div>
      )}
    </div>
  );
};

export default Navbar;