import React from 'react'
import { NavLink } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import { LuRefreshCcw } from "react-icons/lu";
import { LuFileQuestion } from "react-icons/lu";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import logo from "../../assets/images/logo.png"
import { MdOutlineShoppingBag } from "react-icons/md";
const Sidebar = () => {
  function handleleft(){
  const sidebarId = document.getElementById("Sidebar_wrapper");
  
  sidebarId.classList.remove("sidebar_toggle")
  
  }
  return (
    // sidebar start

    <>

      <aside >

        <div id='Sidebar_wrapper' style={{ maxWidth: "261px", width: "100%", overflowY:"auto", height: "100vh", background: "#fff", position: "fixed", top: "0" }}>
        <div className='lef_arrow' onClick={handleleft}>
          <FaLongArrowAltLeft/>
        </div>
          <div className='img_div'>
            <img src={logo} alt="logo" className='img-fluid mb-4' />
          </div>
          <nav>
            <ul className='sidebar_ul' style={{ listStyle: "none", padding: 0 }}>
              <li><NavLink to="/main" className='flex items-center gap-2'><span><MdOutlineDashboard /></span>Dashboard</NavLink></li>
              <li><NavLink to="/page/articale" className='flex items-center gap-2'><span><GrArticle /></span>Articles</NavLink></li>
              <li><NavLink to="/page/freeshopnews" className='flex items-center gap-2'><span><IoNewspaperOutline /></span>Freeshop New's</NavLink></li>
              <li><NavLink to="/page/faq" className='flex items-center gap-2'><span><LuFileQuestion /></span>FAQ's</NavLink></li>
              <li><NavLink to="/page/careersopening" className='flex items-center gap-2'><span><MdOutlineShoppingBag /></span>Careers Opening</NavLink></li>
              <li><NavLink to="/page/products" className='flex items-center gap-2'><span><MdOutlineShoppingBag /></span>All Products</NavLink></li>
              <li><NavLink to="/page/cart" className='flex items-center gap-2'><span><MdOutlineShoppingBag /></span>Cart</NavLink></li>
              
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
