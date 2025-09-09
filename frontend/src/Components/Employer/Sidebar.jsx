import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlus,
  FaBriefcase,
  FaUserTie,
  FaBuilding,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../app/auth/authThunks";
// import { logout } from "../../app/users/authSlice";


const Sidebar = ({jobId}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
 const dispatch = useDispatch();
//  const {logout} = useSelector((state)=> state.logout)



const menuItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/employer-dash/*" },
  { name: "Post Job", icon: <FaPlus />, path: "/employer-dash/post-job" },
  { name: "Manage Jobs", icon: <FaBriefcase />, path: "/employer-dash/manage-jobs" },
  { name: "Applications", icon: <FaUserTie />, path: "/employer-dash/applications" },
  { name: "Company Profile", icon: <FaBuilding />, path: "/employer-dash/company-profile" },
  // ✅ Corrected:
  { name: "Applied Users", icon: <FaCog />, path: `/employer-dash/settings/${jobId || ""}` },
];

 const logoutHandler = (e) => {
  
  dispatch(logoutUser());
  localStorage.removeItem("recruiter"); // ✅ Sirf token delete kare
  toast.success("Logged out successfully");
  navigate("/employeLogin")
  // navigate("login") 

  window.location.reload();         // ✅ UI update ke liye page reload
};


  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4 bg-white shadow flex justify-between fixed w-full z-20">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <h1 className="font-bold">Employer Dashboard</h1>
      </div>

      {/* Overlay (mobile) */}
     {isOpen && (
  <div
    className="fixed inset-0 bg-opacity-40 z-0 md:hidden"
    onClick={() => setIsOpen(false)} 
  ></div>
)}


      {/* Sidebar */}
      <aside
      
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-64 bg-white shadow-lg h-screen fixed top-0 left-0 z-10 overflow-y-auto`}
      >
        <div className="p-4 text-xl font-bold text-center border-b">Employer</div>
        <nav className="p-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 my-2 rounded hover:bg-blue-100 transition ${
                location.pathname === item.path ? "bg-blue-200" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          <button onClick={logoutHandler} className="flex items-center gap-3 p-3 mt-6 rounded hover:bg-red-100 w-full text-red-500">
            <FaSignOutAlt />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
