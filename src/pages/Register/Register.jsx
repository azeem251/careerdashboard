import React, { useEffect, useState } from 'react'
import Logo from '../../assets/images/logo.png'
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
     const [isLoading, setIsLoading] = useState(false);
    const [isLoginPassword, setIsLoginPassword] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        
    });
    const navigate = useNavigate()
  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        const newFormData = new FormData();
        newFormData.append('firstName', formData.firstName);
        newFormData.append('lastName', formData.lastName);
        newFormData.append('email', formData.email);
        newFormData.append('phone', formData.phone);
        newFormData.append('password', formData.password);
        newFormData.append('image', formData.image);
        console.log(formData)
        try {
            const response = await axios.post(
                'https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/registration',
                newFormData,  // Data ko directly pass karo
                {
                    headers: {
                        'Content-Type': 'application/json',  // Sending JSON data
                    },

                }
            );
            // Save to localStorage: User is authenticated after registration
        
        localStorage.setItem('user', JSON.stringify(response.data)); 
            // Show success message using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'You have successfully registered.',
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        password: '',
                    })
                    // Navigate to main page after successful login
                    navigate("/login")
                }
            });
            
          


        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Registration Failed!',
                text: error.response?.data?.message || 'Something went wrong. Please try again.',
                confirmButtonText: 'OK',
            });
            // If response is not successful, handle error
            // console.error('Registration failed:', error.response?.data || error.message);

        }finally{
            setIsLoading(false)
        }
       

    }





    return (
        <div className='login_wrapper'>
            <div className='main_login bg-white '>
                <div className='login_img mb-4'>
                    <img src={Logo} className='img-fluid' alt="login logo" /> <div>
                        <h3 className='mb-0'>Register to Account</h3>
                        <p> Please enter your email and password to continue</p>
                    </div>
                </div>
                

                <form onSubmit={handleSubmit} >
                   


                    <div className='regitter_box inline-flex gap-3'>
                        <div className='flex-auto'>
                            <div>
                                <label htmlFor="firstName" className='text-sm'>First Name: <span className='text-red-500'>*</span></label>
                            </div>
                            <input
                                className='mt-2'
                                type="text"
                                required
                                placeholder='First Name'
                                name="firstName"
                                autoFocus
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex-auto'>
                            <div>
                                <label htmlFor="lastName" className='text-sm'>Last Name: <span className='text-red-500'>*</span></label>
                            </div>
                            <input
                                className='mt-2'
                                type="text"
                                required
                                placeholder='Last Name'
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className='inputs_box mb-3.5 mt-2'>
                        <div>
                            <label htmlFor="email" className='text-sm'>Email address: <span className='text-red-500'>*</span></label>
                        </div>
                        <input
                            className='w-100 mt-2'
                            type="email"
                            placeholder='esrabilgic756******'
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='inputs_box mb-3.5'>
                        <div>
                            <label htmlFor="phone" className='text-sm'>Phone Number: <span className='text-red-500'>*</span></label>
                        </div>
                        <input
                            className='w-100 mt-2'
                            type="number"
                            placeholder='879165******'
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='inputs_box relative mb-3.5'>
                        <div>
                            <label htmlFor="password" className='text-sm'>Password: <span className='text-red-500'>*</span></label>
                        </div>
                        <input
                            className='w-100 mt-2'
                            type={isLoginPassword ? "text" : "password"}
                            placeholder='*******'
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <div
                            className='eye_icon absolute top-12 right-3 text-slate-500 cursor-pointer'
                            onClick={() => setIsLoginPassword(!isLoginPassword)}
                        >
                            {isLoginPassword ? <FaRegEye size={18} /> : <FaEyeSlash size={18} />}
                        </div>
                    </div>

                    <div className='login_btn'>
                    <button type="submit">  {isLoading ? (
                            <img src='https://i.gifer.com/ZKZg.gif' className='w-8 text-center mx-auto' />
                        ) : (
                            'Sign Up'
                        )}</button>
                    </div>
                </form>
                <div className='text-center text-sm'>
                    <p>Have already account <Link to="/login" style={{textDecoration:"underline"}}>Sing In</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register
