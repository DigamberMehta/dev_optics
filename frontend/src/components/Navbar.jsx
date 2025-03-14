import { useState, useEffect } from "react"; // Import useEffect
import { Link } from "react-router-dom";
import EyeAppointment from "../pages/EyeAppointment";
import Login from "../pages/Login"; // Import the Login component

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State for login modal
  const [isLoginModalMounted, setIsLoginModalMounted] = useState(false); // To handle mounting and unmounting for transition

  useEffect(() => {
    const rootElement = document.getElementById("root");
    
    if (rootElement) {
      if (isAppointmentModalOpen || isLoginModalOpen) {
        rootElement.style.overflow = "hidden"; // Disable scrolling
      } else {
        rootElement.style.overflow = "auto"; // Re-enable scrolling
      }
    }
  
    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      if (rootElement) {
        rootElement.style.overflow = "auto";
      }
    };
  }, [isAppointmentModalOpen, isLoginModalOpen]);
  

  useEffect(() => {
    if (isLoginModalOpen && !isLoginModalMounted) {
      setIsLoginModalMounted(true);
    } else if (!isLoginModalOpen && isLoginModalMounted) {
      // Start fade-out animation
      setTimeout(() => setIsLoginModalMounted(false), 300); // Adjust timeout to match transition duration
    }
  }, [isLoginModalOpen, isLoginModalMounted]);

  const menus = [
    { name: "EYEGLASSES", subMenu: ["Men", "Women", "Kids"] },
    { name: "SUNGLASSES", subMenu: ["Men", "Women", "Kids"] },
    { name: "LENSES", subMenu: ["Single Vision", "Progressive"] },
    { name: "SPORTS", subMenu: ["Cycling", "Running", "Swimming"] },
    { name: "BOOK APPOINTMENT" },
  ];

  const toggleSubMenu = (menuName) => {
    setActiveSubMenu(activeSubMenu === menuName ? null : menuName);
  };

  const openAppointmentModal = () => {
    setIsAppointmentModalOpen(true);
    setOpenMenu(null);
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
  // console.log("hello from navbar");

  return (
    <div className="w-full shadow-lg border-b bg-white z-50 fixed top-0">
      {/* Top Bar */}
      <div className="bg-blue-200 text-center py-2 text-sm">
        <span className="font-semibold">20% Off</span> with Code{" "}
        <span className="font-bold">LENS20</span>: Blokz®, EyeQLenz™, & Transitions®.
      </div>

      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-3 relative">
        {/* Logo */}
        <div className="text-3xl font-bold text-[#46bac8]">
          <Link to="/">Dev Optics</Link>
        </div>

        {/* Desktop Menu */}
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
                  <button className="text-gray-700 hover:text-blue-500 font-semibold uppercase">
                    {menu.name}
                  </button>
                  {openMenu === menu.name && menu.subMenu && (
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg mt-1 w-40 z-10">
                      {menu.subMenu.map((item, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="block px-4 py-2 hover:bg-blue-100 text-gray-700"
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
                  className="text-gray-700 hover:text-blue-500 font-semibold uppercase"
                >
                  {menu.name}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden lg:relative lg:block w-72 ml-5">
          <input
            type="text"
            placeholder="Search glasses and contact"
            className="w-full border rounded-full py-2 px-4 pl-10 focus:outline-none"
          />
          <i className="fa fa-search absolute left-3 top-3 text-gray-500"></i>
        </div>

        {/* Desktop Icons */}
        <div className="hidden lg:flex justify-between w-[200px] ml-5 text-gray-700 text-xl">
          <i className="fa-light fa-camera-viewfinder"></i>

            <i className="fa fa-user user-modal cursor-pointer" onClick={openLoginModal}></i> {/* Added onClick handler */}

          <i className="fa-regular fa-heart"></i>

      <Link to="/cartpage"><i className="fa-regular fa-cart-shopping"></i></Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center space-x-4 lg:hidden">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <i className="fa fa-search text-gray-700 text-xl"></i>
          </button>
          <i className="fa-regular fa-cart-shopping text-gray-700 text-xl"></i>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <i className="fa fa-bars text-gray-700 text-xl"></i>
          </button>
        </div>

        {/* Mobile Search Bar */}
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 p-4 lg:hidden">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold text-blue-500">ZENNI®</div>
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
      </div>

      {/* Appointment Modal */}
      {isAppointmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 py-4 px-4">
            <EyeAppointment closeModal={closeAppointmentModal} />
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalMounted && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 py-4 px-4 ${isLoginModalOpen ? 'opacity-100' : 'opacity-0'}`}>
          <Login closeModal={closeLoginModal} /> {/* Render the Login component as a modal */}
        </div>
      )}

    </div>
  );
};

export default Navbar;
