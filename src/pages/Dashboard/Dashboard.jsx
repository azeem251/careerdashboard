import React, { useEffect, useState } from 'react'
import { FaUsersLine } from "react-icons/fa6";
// import Loading from '../Loading/Loading';
import Loading from "../../Components/Loading/Loading"
import { FaBox } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { BsGraphUp } from "react-icons/bs";
import ZigZagChart from './ZigZagChart';
import Revenue from './RevenueChart';
import RevenueChart from './RevenueChart';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const[dashboardUsers,setDashboardUsers]=useState({})
  async function getData() {
    const userToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch('https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/getDashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${userToken}`,
          // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTYyM2U4ZjcyNmU3MTczYmE0MjQ1MSIsImlhdCI6MTcyOTUwNDI0MiwiZXhwIjoxNzYxMDQwMjQyfQ.u6dELPLGwiGa5SHmhOdREAciXsPkMl-vXu1GDji9pqw'
        }
      });
    
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      
      let result = await response.json();
      console.log("dashbaord result is here",result);
      setDashboardUsers(result.data)
      console.log("dashbaord data user")
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  
  useEffect(()=>{
    getData();
  },[])
  return (
    <div className="flex-1">
    <div className="dashboard_wrapper All_wrapper " >
      <div className='top_heaindg'>
        <div>
        <h4 className="text-xl font-semibold  mb-0">Dashboard</h4>
        </div>
        <div>
        <Link to='/main'>Dashboard</Link> / <span>Dashboard</span>
        </div>
      </div>
      <div className="dashboard_boxes ">
  <div className="row gy-4">
    {/* 1st Box */}
    <div className="col-12 col-sm-6 col-md-6 col-lg-3">
      <div className="py-3 px-3 rounded-3 bg-white h-100">
        <div className="d-flex justify-content-between align-items-center">
          <div className="left_box">
            <span className="text-sm text-slate-400">Active Users</span>
            <div className="py-2 m-0 flex items-center gap-7">
              <strong className="text-2xl">{ dashboardUsers?.activeUser !==undefined ? dashboardUsers.activeUser : <Loading/>   }</strong>
              
            </div>
          </div>
          <div
            className="right_box d-flex align-items-center justify-content-center rounded"
            style={{
              background: "#e2e2ff",
              height: "50px",
              width: "50px",
            }}
          >
            <FaUsersLine size={18} style={{ color: "#8280FF" }} />
          </div>
        </div>
        <div>
          <p className="mb-0 text-sm" style={{ fontSize: "14px" }}>
              <span style={{ color: "#00B69B" }}> { dashboardUsers?.activeUserChange} </span> 
          </p>
        </div>
      </div>
    </div>

    {/* 2nd Box */}
    <div className="col-12 col-sm-6 col-md-6 col-lg-3">
      <div className="py-3 px-3 rounded-3 bg-white h-100">
        <div className="d-flex justify-content-between align-items-center">
          <div className="left_box">
            <span className="text-sm text-slate-400">Total Buyers</span>
            <div className="py-2 m-0">
              <strong className="text-2xl">{dashboardUsers?.totalBuyers !==undefined ? dashboardUsers.totalBuyers : <Loading/>}</strong>
            </div>
          </div>
          <div
            className="right_box d-flex align-items-center justify-content-center rounded"
            style={{
              background: "#fec53d5e",
              height: "50px",
              width: "50px",
            }}
          >
            <FaBox size={18} style={{ color: "#FEC53D" }} />
          </div>
        </div>
        <div>
          <p className="mb-0 text-sm" style={{ fontSize: "14px" }}>
            <span style={{ color: "#2f24c0" }}>{dashboardUsers?.buyersChange} </span>
          </p>
        </div>
      </div>
    </div>

    {/* 3rd Box */}
    <div className="col-12 col-sm-6 col-md-6 col-lg-3">
      <div className="py-3 px-3 rounded-3 bg-white h-100">
        <div className="d-flex justify-content-between align-items-center">
          <div className="left_box">
            <span className="text-sm text-slate-400">Total Sellers</span>
            <div className="py-2 m-0">
              <strong className="text-2xl">{dashboardUsers?.totalSellers !==undefined ? dashboardUsers.totalSellers :<Loading/>}</strong>
            </div>
          </div>
          <div
            className="right_box d-flex align-items-center justify-content-center rounded"
            style={{
              background: "#ff90665e",
              height: "50px",
              width: "50px",
            }}
          >
            <FaClockRotateLeft size={18} style={{ color: "#FF9066" }} />
          </div>
        </div>
        <div>
          <p className="mb-0 text-sm" style={{ fontSize: "14px" }}>
            <span style={{ color: "#b60000" }}>{dashboardUsers?.sellersChange} </span>
          </p>
        </div>
      </div>
    </div>

    {/* 4th Box */}
    <div className="col-12 col-sm-6 col-md-6 col-lg-3">
      <div className="py-3 px-3 rounded-3 bg-white h-100">
        <div className="d-flex justify-content-between align-items-center">
          <div className="left_box">
            <span className="text-sm text-slate-400">Total Sales</span>
            <p className="py-2 m-0">
              <strong className="text-2xl">₹ {dashboardUsers?.totalEarning !== undefined ? dashboardUsers.totalEarning : 0}</strong>
            </p>
          </div>
          <div
            className="right_box d-flex align-items-center justify-content-center rounded"
            style={{
              background: "#4ad99163",
              height: "50px",
              width: "50px",
            }}
          >
            <BsGraphUp size={18} style={{ color: "#4AD991" }} />
          </div>
        </div>
        <div>
          <p className="mb-0 text-sm" style={{ fontSize: "14px" }}>
            <span style={{ color: "#474648" }}>{dashboardUsers?.earningChange}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

          {/* apext chart */}
            <ZigZagChart/>
            <RevenueChart/>
    </div>
    
  </div>
  )
}

export default Dashboard
