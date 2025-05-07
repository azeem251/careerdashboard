import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaBell, FaBars } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { FaUsersLine } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { IoKey } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import Swal from 'sweetalert2';
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate()
  const toggleDropdown = (e) => {
    e.stopPropagation(); // stop bubbling
    setIsOpen(prev => !prev);
  };



  const firstName = localStorage.getItem('firstName');



  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('firstName');
 
    
    Swal.fire({
      icon: 'success',
      title: 'Logout Successfully!',
      text: 'You have Logout.',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const handleToggleSidebar = () => {
    const sidebar = document.getElementById('Sidebar_wrapper');
    if (sidebar) {
      sidebar.classList.toggle('sidebar_toggle');
    }
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('Sidebar_wrapper');

      // 1. Sidebar ka andar click hua
      if (sidebar && sidebar.contains(event.target)) {
        // 2. Check karo kya click hua element link (<a>) hai
        if (event.target.tagName === 'A' || event.target.closest('a')) {
          sidebar.classList.remove('sidebar_toggle');
          setIsSidebarOpen(false);
        }
        // 3. Agar sidebar me click hua but link nahi tha, kuch mat karo
        return;
      }

      // 4. Agar sidebar ke bahar click hua to sidebar band karo
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        sidebar.classList.remove('sidebar_toggle');
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-white shadow-sm fixed w-full z-50">
      {/* Left - Hamburger */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <div
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation();
            handleToggleSidebar();
          }}
          className="bar_icon cursor-pointer p-2 rounded-md hover:bg-gray-100 transition"
        >
          <FaBars size={22} className="text-gray-700" />
        </div>
      </div>

      {/* Center - Search (only visible in md and above) */}
      <div className="hidden md:block w-full max-w-md mx-auto search_input_box">
        <div className="relative ">
          <FaSearch className="absolute top-3.5 left-3 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Right - Notification + Profile */}


      <div className="flex items-center gap-6 relative" ref={dropdownRef}>
        {/* Notification Bell */}
        <div className="relative cursor-pointer">
          <FaBell className="text-blue-500" size={20} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            6
          </span>
        </div>

        {/* Profile Section */}
        <div className="relative inline-block text-left">
          <div onClick={toggleDropdown} className="flex items-center gap-2 cursor-pointer select-none">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="user"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">{firstName || 'Loading...'}</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Admin</span>
                <FaChevronDown size={10} className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <ul className="text-sm text-gray-700">
                <li className="hover:bg-gray-100 cursor-pointer">
                  <Link to='/main'>
                    <span className="flex items-center gap-1.5 p-2 border-b border-gray-200 text-gray-700" style={{ fontSize: "12px" }}>
                      <FaUsersLine fill='#6a8dff' size={18} />Manage Account
                    </span>
                  </Link>
                </li>
                <li className="hover:bg-gray-100 cursor-pointer">
                  <Link to='/changepassword'>
                    <span className="flex items-center gap-1.5 p-2 border-b border-gray-200 text-gray-700" style={{ fontSize: "12px" }}>
                      <IoKey fill='#f66aff' size={18} />Change Password
                    </span>
                  </Link>
                </li>
                <li className="hover:bg-gray-100 cursor-pointer">
                  <Link to='/main'>
                    <span className="flex items-center gap-1.5 p-2 border-b border-gray-200 text-gray-700" style={{ fontSize: "12px" }}>
                      <IoMdRefresh fill='#70aaff' size={18} />Activity log
                    </span>
                  </Link>
                </li>
                <li className="hover:bg-gray-100 cursor-pointer text-red-500">
                  <button onClick={handleLogout} className='w-100'>
                    <span className="flex items-center gap-1.5 p-2 w-100 border-b border-gray-200 text-red-500" style={{ fontSize: "12px" }}>
                      <IoLogOutOutline fill='#fb2c36' size={18} />Log out
                    </span>
                  </button>
                </li>
              </ul>
            </div>

          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
