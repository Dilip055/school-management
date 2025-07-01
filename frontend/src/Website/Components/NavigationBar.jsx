import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { Grip, Sparkles, User, X } from "lucide-react";
import Topbar from '../Components/Topbar'
import Marquee from "react-fast-marquee";
import Footer from '../Components/Footer'
import logo from '../../assets/logo.png'

const NavigationBar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

 
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Our Gallery", path: "/gallery" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <>
     <Topbar />


      <nav className={`bg-white shadow-lg z-50 sticky top-0 transition-all duration-300 ${
        scrolled ? 'shadow-xl' : 'shadow-md'
      }`}>
        <div className="mx-10 sm:mx-0 md:mx-16 lg:mx-20">
          <div className="flex items-center justify-between  h-16 lg:h-25">
            
            
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-16 lg:w-25  rounded-lg flex items-center justify-center">
                <img src={logo} alt="Apollo International School" className="" />
              </div>
              
            </div>

            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 text-sm lg:text-base font-medium relative group text-decoration-none ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              ))}
            </div>


            <div className="hidden md:flex items-center gap-3 lg:gap-4">
          

      
              <button
                onClick={() => navigate("/login")}
                className="px-4 lg:px-4 py-2 lg:py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium text-sm lg:text-base flex items-center gap-1 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <User className="text-xs lg:text-sm" />
                <span className="hidden lg:inline">Login</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200"
              >
                {mobileMenuOpen ? (
                  <X className="text-lg" />
                ) : (
                  <Grip className="text-lg" />
                )}
              </button>
            </div>
          </div>

        </div>

       
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-4 bg-gray-50 border-t">
            <div className="space-y-2">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg transition-all duration-200 font-medium text-decoration-none ${
                      isActive
                        ? "text-blue-600 bg-blue-100 border-l-4 border-blue-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <button
                onClick={() => {
                  navigate("/login");
                  closeMobileMenu();
                }}
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
              >
                <User className="text-sm" />
                Login to Account
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-blue-100">
        <div className="overflow-hidden">
          <Marquee>
          <div className="pt-2 pb-1">
            <div className="inline-flex items-center text-sm lg:text-base">
              <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-amber-500 mr-2" />
              <span className="text-gray-700 font-medium mr-5">
                Apollo International School — A Journey of Growth!
              </span>
              <span className="font-semibold text-green-600">
                ✨ Admissions Open — Enroll Now for a Brighter Future!
              </span>
            </div>
          </div>
          </Marquee>
        </div>
      </div>

      <Outlet />
      <Footer />
     
    </>
  );
};

export default NavigationBar;