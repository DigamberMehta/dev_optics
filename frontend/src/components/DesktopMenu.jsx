import React, { useState } from "react";

const DesktopMenu = ({ menus, openAppointmentModal }) => {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="hidden lg:flex space-x-6 relative">
      {menus.map((menu, index) => (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => setOpenMenu(menu.name)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          {menu.subMenu ? (
            <>
              <button className="text-gray-700 hover:text-blue-500 font-normal uppercase text-sm">
                {menu.name}
              </button>
              {openMenu === menu.name && menu.subMenu && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg mt-1 w-40 z-10">
                  {menu.subMenu.map((item, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="block px-4 py-2 hover:bg-blue-100 text-gray-700 text-sm"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </>
          ) : (
            <button
              onClick={openAppointmentModal}
              className="text-gray-700 hover:text-blue-500 font-normal uppercase text-sm whitespace-nowrap"
            >
              {menu.name}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DesktopMenu;