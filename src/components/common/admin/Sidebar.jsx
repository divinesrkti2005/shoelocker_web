import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Home,
  LogOut,
  Menu,
  Package,
  Star,
  Users
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Confirmed from "../../private/bookings/Confirmed";
import Pending from "../../private/bookings/Pending";
import AddPackages from "../../private/packages/AddPackages";
import ManagePackages from "../../private/packages/ManagePackages";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate(); // Hook for navigation

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("role"); // Remove token from storage
    window.location.href = "/login"; // Correct way to redirect
};


  return (
    <div className={`h-screen ${isCollapsed ? "w-20" : "w-64"} bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col p-4 transition-all duration-300 shadow-xl`}>
      
      {/* Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="mb-4 self-end hover:bg-blue-700 p-1 rounded transition-colors">
        {isCollapsed ? <Menu size={24} /> : <ChevronLeft size={24} />}
      </button>

      <div className={`mb-6 ${isCollapsed ? "hidden" : "block"}`}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-lg flex items-center justify-center">
            <span className="text-blue-900 font-bold text-sm">SL</span>
          </div>
          <span className="text-xl font-bold">ShoeLocker</span>
        </div>
        <p className="text-blue-200 text-sm mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 space-y-2">
        <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700 transition-colors">
          <Home size={20} />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>

        <div>
          <button onClick={() => toggleMenu("packages")} className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-700 transition-colors">
            <div className="flex items-center gap-3">
              <Package size={20} />
              {!isCollapsed && <span>Sneaker Products</span>}
            </div>
            {!isCollapsed && (openMenus.packages ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
          </button>
          {!isCollapsed && openMenus.packages && (
            <div className="ml-6 space-y-1 mt-1">
              <Link onClick={AddPackages} to="/admin/addpackages" className="block p-2 rounded hover:bg-blue-700 transition-colors">Add New Product</Link>
              <Link onClick={ManagePackages} to="/admin/managepackages" className="block p-2 rounded hover:bg-blue-700 transition-colors">Manage Products</Link>
            </div>
          )}
        </div>

        <div>
          <button onClick={() => toggleMenu("bookings")} className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-700 transition-colors">
            <div className="flex items-center gap-3">
              <Calendar size={20} />
              {!isCollapsed && <span>Orders</span>}
            </div>
            {!isCollapsed && (openMenus.bookings ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
          </button>
          {!isCollapsed && openMenus.bookings && (
            <div className="ml-6 space-y-1 mt-1">
              <Link onClick={Pending} to="/admin/pending" className="block p-2 rounded hover:bg-blue-700 transition-colors">Pending Orders</Link>
              <Link onClick={Confirmed} to="/admin/confirmed" className="block p-2 rounded hover:bg-blue-700 transition-colors">Confirmed Orders</Link>
            </div>
          )}
        </div>

        <Link to="/admin/payments" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700 transition-colors">
          <CreditCard size={20} />
          {!isCollapsed && <span>Payments</span>}
        </Link>

        <Link to="/admin/users" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700 transition-colors">
          <Users size={20} />
          {!isCollapsed && <span>Customers</span>}
        </Link>

        <Link to="/admin/reviews" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700 transition-colors">
          <Star size={20} />
          {!isCollapsed && <span>Reviews</span>}
        </Link>
      </nav>

      {/* Logout Button */}
      <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-700 transition-colors mt-4">
        <LogOut size={20} />
        {!isCollapsed && <span>Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;
