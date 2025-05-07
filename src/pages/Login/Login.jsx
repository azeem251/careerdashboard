import React, { useState } from 'react'
import Logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoginPassword, setIsLoginPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleLoginSubmit = async (e) => {

        e.preventDefault();
        setIsLoading(true);
        // Create an object to send as JSON
        const dataToSend = {
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await axios.post(
                'https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/login',
                dataToSend,  // Send JSON data instead of FormData
                {
                    headers: {
                        'Content-Type': 'application/json',  // Sending JSON data
                    },
                }
            );


            const firstName = response?.data?.data?.firstName || '';
            const userId = response?.data?.data?._id || '';
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('userId', userId);
            console.log(userId)

            // Show success message using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'You have successfully logged in.',
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    // Clear form data after submission
                    setFormData({
                        email: '',
                        password: '',
                    });
                    // Navigate to main page after successful login
                    navigate("/main");

                }
            });
            localStorage.setItem("accessToken", response?.data?.accessToken); 
            // localStorage.setItem("accessTokenFreeShop", response?.data?.accessToken); 

            console.log(response?.data?.accessToken)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed!',
                text: error.response?.data?.message || 'Something went wrong. Please try again.',
                confirmButtonText: 'OK',
            });
            // Log error details
            // console.error('Login failed:', error.response?.data || error.message);
        } finally {
            setIsLoading(false);  // Hide loading indicator
        }


    };
    return (
        <div className='login_wrapper'>
            <div className='main_login bg-white '>
                <div className='login_img mb-4'>
                    <img src={Logo} className='img-fluid' alt="login logo" /> <div>
                        <h3 className='mb-0'>Login to Account</h3>
                        <p> Please enter your email and password to continue</p>
                    </div>
                </div>
                <form onSubmit={handleLoginSubmit}>
                    <div className='inputs_box mb-3.5'>
                        <div>
                            <label htmlFor="email" className='text-sm'>
                                Email address: <span className='text-red-500'>*</span>
                            </label>
                        </div>
                        <input
                            className='w-100 mt-2'
                            type="email"
                            placeholder='esrabilgic756@gmail.com'
                            name="email"
                            value={formData.email}
                            autoFocus
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='inputs_box relative mb-3.5'>
                        <div>
                            <label htmlFor="password" className='text-sm'>
                                Password: <span className='text-red-500'>*</span>
                            </label>
                        </div>
                        <input
                            className='w-100 mt-2'
                            type={isLoginPassword ? "text" : "password"}
                            placeholder='*******'
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <div
                            className='eye_icon absolute top-12 right-3 text-slate-500 cursor-pointer'
                            onClick={() => setIsLoginPassword(!isLoginPassword)}
                        >
                            {isLoginPassword ? <FaRegEye size={18} /> : <FaEyeSlash size={18} />}
                        </div>
                        <div className="flex items-center justify-between ">
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label text-sm text-slate-600 font-normal" htmlFor="flexCheckDefault">
                                    Remember Password
                                </label>
                            </div>
                            <div>
                                <Link className='text-sm text-slate-400 ' to={"/changepassword"} style={{ textDecoration: "underline", color: "gray" }}>Forget Password?</Link>
                            </div>
                        </div>
                    </div>
                    <div className='login_btn'>
                        <button type="submit">  {isLoading ? (
                            <img src='https://i.gifer.com/ZKZg.gif' className='w-8 text-center mx-auto' />
                        ) : (
                            'Sign In'
                        )}</button>
                    </div>
                    <div className='text-center text-sm'>
                        <p className=''>You don't have account  <Link to="/registration" style={{ textDecoration: "underline" }}> Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
