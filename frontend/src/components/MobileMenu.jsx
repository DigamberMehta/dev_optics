import React from "react";
import { Link } from "react-router-dom";

const MobileMenu = ({ isMobileMenuOpen, setIsMobileMenuOpen, menus, openAppointmentModal, activeSubMenu, setActiveSubMenu }) => {
  const toggleSubMenu = (menuName) => {
    setActiveSubMenu(activeSubMenu === menuName ? null : menuName);
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4 lg:hidden">
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-bold text-blue-500">Dev Optics</div>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <i className="fa fa-times text-gray-700 text-xl"></i>
            </button>
          </div>

          <div className="space-y-2">
            {menus.map((menu, index) => (
              <div key={index}>
                {menu.name === "BOOK APPOINTMENT" ? (
                  <button
                    className="w-full text-left py-2 px-4 font-semibold uppercase"
                    onClick={openAppointmentModal}
                  >
                    {menu.name}
                  </button>
                ) : (
                  <>
                    <button
                      className="w-full text-left py-2 px-4 flex justify-between items-center"
                      onClick={() => toggleSubMenu(menu.name)}
                    >
                      <span className="font-semibold uppercase">{menu.name}</span>
                      {menu.subMenu && (
                        <i
                          className={`fa fa-chevron-${
                            activeSubMenu === menu.name ? "up" : "down"
                          }`}
                        ></i>
                      )}
                    </button>
                    {activeSubMenu === menu.name && menu.subMenu && (
                      <div className="pl-4">
                        {menu.subMenu.map((item, idx) => (
                          <a
                            key={idx}
                            href="#"
                            className="block py-2 px-4 text-gray-700 hover:bg-blue-100"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;