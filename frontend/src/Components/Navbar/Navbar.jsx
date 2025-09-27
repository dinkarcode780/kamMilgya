


  import { useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaUserTie,
  FaGraduationCap,
  FaUpload,
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaBars,
  FaSignOutAlt,
  FaUserPlus,
  FaBriefcase,
   FaInfoCircle,
   FaPhone
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../app/auth/authThunks";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

   const menuRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, recruiter } = useSelector((state) => state.auth);
  const isLoggedIn = !!user || !!recruiter; 
  const role = user?.role || recruiter?.role || null;

  

  // const handleLogout = async () => {
  //   await dispatch(logoutUser());
  //   navigate("/login");
  // };

  const handleLogout = async () => {
  await dispatch(logoutUser()); 
  localStorage.removeItem("recruiter"); 
  
  // Redirect based on role
  if (role === "recruiter") {
    navigate("/employeLogin");
  } else {
    navigate("/login");
  }
};


  const commonNavItems = [
    { name: "Home", icon: <FaHome className="mr-2" />, href: "/" },
    { name: "About", icon: <FaInfoCircle className="mr-2" /> ,  href: "/about" },
    { name: "All Jobs", icon: <FaGraduationCap className="mr-2" />, href: "/all-job" },
    { name: "Contact", icon: <FaPhone className="mr-2" />, href: "/contact" },
  ];

  const userNavItems = [{ name: "Dashboard", icon: <FaUser className="mr-2" />, href: "/user-dash" }];
  const recruiterNavItems = [
    { name: "Recruiter Dashboard", icon: <FaBriefcase className="mr-2" />, href: "/employer-dash" },
    // { name: "Post a Job", icon: <FaUpload className="mr-2" />, href: "/post-job" }
  ];
  const adminNavItems = [
    { name: "Admin Dashboard", icon: <FaUserTie className="mr-2" />, href: "/adminpanel" }
  ];

  const recruiterAuthItems = [
    { name: "Recruiter Login", href: "/employeLogin", icon: <FaBriefcase className="mr-2" /> },
    { name: "Recruiter Register", href: "employerRegister", icon: <FaUserPlus className="mr-2" /> },
  ];

  const getNavItems = () => {
    if (role === "user") {
      return [...commonNavItems, ...userNavItems];
    } else if (role === "recruiter") {
      return [...commonNavItems, ...recruiterNavItems];
    } else if (role === "admin") {
      return [...commonNavItems, ...adminNavItems];
    }
    return commonNavItems;
  };

  const navItems = getNavItems();

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeMenus = () => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


//   useEffect(() => {
//   if (!recruiter) {
//     const storedRecruiter = localStorage.getItem("recruiter");
//     if (storedRecruiter) {
//       // force sync recruiter into redux if missing
//       dispatch({
//         type: "auth/registerRecruiter/fulfilled",
//         payload: { user: JSON.parse(storedRecruiter) },
//       });
//     }
//   }
// }, [recruiter, dispatch]);


  return (
    <nav ref={menuRef} className="bg-white shadow-lg py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between md:h-14 h-10">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-[#009688] flex items-center">
              <div className="flex items-center space-x-2 select-none">
      {/* Optional Icon */}
      {/* <div className="bg-[#009688] text-white p-2 rounded-full shadow-md">
        <FaBriefcase className="w-5 h-5" />
      </div> */}

      {/* Logo Text */}
      {/* <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
        <span className="text-[#009688] font-bold">KAM</span>
        <span className=" text-black font-normal">MILGYA</span><span className=" text-red-600"><big>.</big></span><span className=" text-black font-normal">com</span>
      </h1> */}
       <img
      src="/logo.png"
      alt="Logo"
      className="h-15 w-60 object-contain mr-1"
      style={{ minWidth: 32 }}
    />
    </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Navigation Items */}
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        openDropdown === item.name
                          ? "text-[#009688] bg-blue-50"
                          : "text-gray-700 hover:text-[#009688] hover:bg-blue-50"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                      {openDropdown === item.name ? (
                        <FaChevronUp className="ml-1" size={12} />
                      ) : (
                        <FaChevronDown className="ml-1" size={12} />
                      )}
                    </button>

                    {openDropdown === item.name && (
                      <div className="absolute left-0 mt-1 w-56 rounded-md bg-white shadow-lg z-10">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            onClick={closeMenus}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#009688]"
                          >
                            {subItem.icon}
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#009688] hover:bg-blue-50"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Only show logout when logged in (any role) */}
            {isLoggedIn ? (
              <button
                // onClick={handleLogout}
                onClick={() => {
        handleLogout(); 
        closeMenus();
      }}
                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            ) : (
              <>
                {/* User Auth Buttons */}
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 text-sm font-medium text-white bg-[#009688] hover:bg-[#00796b] rounded-md"
                >
                  <FaUser className="mr-2" /> Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-3 py-2 text-sm font-medium text-[#009688] border border-[#009688] hover:bg-[#009688] hover:text-white rounded-md"
                >
                  <FaUserPlus className="mr-2" /> Register
                </Link>

                {/* Recruiter Auth Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown("recruiterAuth")}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      openDropdown === "recruiterAuth"
                        ? "text-[#009688] bg-blue-50"
                        : "text-gray-700 hover:text-[#009688] hover:bg-blue-50"
                    }`}
                  >
                    <FaBriefcase className="mr-2" />
                    For Recruiters
                    {openDropdown === "recruiterAuth" ? (
                      <FaChevronUp className="ml-1" size={12} />
                    ) : (
                      <FaChevronDown className="ml-1" size={12} />
                    )}
                  </button>

                  {openDropdown === "recruiterAuth" && (
                    <div className="absolute right-0 mt-1 w-48 rounded-md bg-white shadow-lg z-10">
                      {recruiterAuthItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={closeMenus}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#009688]"
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-2 space-y-2">
          {/* Mobile Navigation Items */}
          {navItems.map((item) => (
            <div key={item.name}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="w-full flex justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#009688] hover:bg-blue-50"
                  >
                    <span className="flex items-center">
                      {item.icon}
                      {item.name}
                    </span>
                    {openDropdown === item.name ? (
                      <FaChevronUp size={12} />
                    ) : (
                      <FaChevronDown size={12} />
                    )}
                  </button>

                  {openDropdown === item.name && (
                    <div className="pl-4">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          onClick={closeMenus}
                          className="flex items-center px-3 py-2 rounded-md text-base text-[#009688] hover:bg-blue-50"
                        >
                          {subItem.icon}
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.href}
                  onClick={closeMenus}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#009688] hover:bg-blue-50"
                >
                  {item.icon}
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Auth Section */}
          {isLoggedIn ? (
            <div className="pt-2 border-t">
              <button
                onClick={() => {
                  handleLogout();
                  closeMenus();
                }}
                className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t space-y-2">
              {/* User Auth Buttons */}
              <Link
                to="/login"
                onClick={closeMenus}
                className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-[#009688] hover:bg-[#00796b]"
              >
                <FaUser className="mr-2" /> Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenus}
                className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-[#009688] border border-[#009688] hover:bg-[#009688] hover:text-white"
              >
                <FaUserPlus className="mr-2" /> Register
              </Link>

              {/* Recruiter Auth Dropdown */}
              <div>
                <button
                  onClick={() => toggleDropdown("mobileRecruiterAuth")}
                  className="w-full flex justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#009688] hover:bg-blue-50"
                >
                  <span className="flex items-center">
                    <FaBriefcase className="mr-2" />
                    For Recruiters
                  </span>
                  {openDropdown === "mobileRecruiterAuth" ? (
                    <FaChevronUp size={12} />
                  ) : (
                    <FaChevronDown size={12} />
                  )}
                </button>

                {openDropdown === "mobileRecruiterAuth" && (
                  <div className="pl-4">
                    {recruiterAuthItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={closeMenus}
                        className="flex items-center px-3 py-2 rounded-md text-base text-[#009688] hover:bg-blue-50"
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;