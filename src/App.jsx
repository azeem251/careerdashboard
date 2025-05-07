import React from 'react'

import './App.css'
import Header from './Components/Header/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from './Components/Sidebar/Sidebar'
import { useLocation } from "react-router-dom";
import Footer from './Components/Footer/Footer'


function App() {
  const location = useLocation();
  // const Swal = require('sweetalert2')
  // Jo pages par header/footer/Sidebar nahi dikhana hai
  const noLayoutRoutes = ["/login", "/registration", "/changepassword", "/forgetpassword", "/verifyotp", "*"];

  const isNoLayout = noLayoutRoutes.includes(location.pathname);





  

  return (
    <>
     {isNoLayout ? (
        // Sirf Outlet dikhao (Login, Register, etc.)
        <Outlet />
      )  : (
        // Baaki sab page layout ke saath
        <>
          <Header />
          <div className='min-h-screen' style={{ display: "flex" }}>
            <Sidebar />
            <div className="ml-65 pt-25 main_wrapper">
              <Outlet />
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App
