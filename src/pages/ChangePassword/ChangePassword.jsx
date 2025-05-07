import React, { useState, useEffect } from 'react'
import Logo from '../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2';
const ChangePassword = () => {
    const [isChangePassword, setIsChangePassword] = useState(false)
    const [isConfirmChangePassword, setConfirmChangePassword] = useState(false)
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [timer, setTimer] = useState(60);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

    const navigate = useNavigate()

    // for timer
    useEffect(() => {
        if (isTimerRunning && timer > 0) {
            const countdown = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else if (timer === 0) {
            setIsTimerRunning(false);
        }
    }, [isTimerRunning, timer]);

    // for send the OTP
    const handleSendOtp = async (e) => {
        e.preventDefault();
      
        // ✅ Clean and safe email regex for React
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
        if (!email.trim()) {
          Swal.fire('Required!', 'Please enter your email address.', 'warning');
          return;
        }
      
        if (!emailRegex.test(email)) {
          Swal.fire('Invalid Email', 'Please enter a valid email address.', 'error');
          return;
        }
      
        try {
          setIsSendingOtp(true);
          await axios.post('https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/forgetPassword', { email });
          Swal.fire('OTP Sent!', 'Check your email.', 'success');
          setShowOtpInput(true);
          setIsTimerRunning(true);
          setTimer(60);
        } catch (error) {
          Swal.fire('Error', 'Failed to send OTP. Try again later.', 'error');
        } finally {
          setIsSendingOtp(false);
        }
      };
      
    

    // for Verify the OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        try {
            setIsVerifyingOtp(true);
            const res = await axios.post('https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/forgotVerifyotp', { email, otp });
            Swal.fire('Verified', res.data.message, 'success');
            setIsOtpVerified(true);
            setIsTimerRunning(false);
        } catch (error) {
            Swal.fire('Error', 'Invalid OTP.', 'error');
        } finally {
            setIsVerifyingOtp(false);
        }
    };


    // for CHAGNE THE PASSWORD

    const handleChangePassword = async (e) => {
        e.preventDefault()
        if (!newPassword || !confirmPassword) {
            Swal.fire('Error', 'Please fill in all password fields.', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            Swal.fire('Error', 'Passwords do not match', 'error');
            return;
        }

        const userId = localStorage.getItem('userId');

        const payload = {
            newPassword,
            confirmPassword
        };

        try {
            const res = await axios.post(
                `https://mamun-reza-freeshops-backend.vercel.app/api/v1/user/changePassword/${userId}`,
                payload
            );

            console.log("Response:", res.data);
            Swal.fire('Password changed', res.data.message, 'success');
            navigate('/login');
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            Swal.fire('Error', error.response?.data?.message || 'Password update failed', 'error');
        }
    };



    return (
        <div className='login_wrapper'>
            <div className='main_login bg-white '>
                <div className='login_img mb-4 justify-center'>
                    <div className=' text-center '>
                        <h3 className='mb-0'>Change Password</h3>
                        <p> Please enter your email and password to continue</p>
                    </div>
                </div>
                <form>
                    <div className='inputs_box mb-3.5'>
                        <div>
                            <label htmlFor="email" className='text-sm'>Email address: <span className='text-red-500'>*</span></label>
                        </div>

                        <input
                            className={`w-100 mt-2 ${showOtpInput ? 'opacity-60 cursor-not-allowed' : ''}`}
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="esal@****"
                            required
                            
                            readOnly={showOtpInput}
                        />
                    </div>

                    <div className='login_btn'><button className={`text-sm text-blue-600 ${showOtpInput ? 'opacity-50 cursor-not-allowed' : ''}`} type="submit" disabled={showOtpInput} onClick={handleSendOtp}> {isSendingOtp ? (
                        <img src='https://i.gifer.com/ZKZg.gif' className='w-8 text-center mx-auto' />
                    ) : (
                        'Send OTP'
                    )}</button></div>

                    {showOtpInput && (
                        <>

                            <div className='inputs_box mb-3.5'>
                                <div>
                                    <label htmlFor="otp" className='text-sm'>Sent OTP: <span className='text-red-500'>*</span></label>
                                </div>
                                <input
                                    className={`w-100 mt-2 p-2 border rounded ${isOtpVerified ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    type="text"
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                    disabled={isOtpVerified}
                                />
                            </div>

                            {!isOtpVerified && (
                                <div className="flex justify-between items-center mb-3">
                                    {isTimerRunning ? (
                                        <p className="text-xs text-gray-600">Resend OTP in {timer}s</p>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleSendOtp}
                                            style={{ fontSize: "15px" }}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Resend OTP
                                        </button>
                                    )}
                                </div>
                            )}
                            <div className='login_btn'>
                                <button
                                    type="submit"
                                    onClick={handleVerifyOtp}
                                    disabled={isOtpVerified}
                                    className={`text-sm px-4 py-2 bg-blue-600 text-white rounded ${isOtpVerified ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                                >
                                    {isVerifyingOtp ? (
                                        <img src='https://i.gifer.com/ZKZg.gif' className='w-8 text-center mx-auto' />
                                    ) : (
                                        'Verify OTP'
                                    )}
                                </button>
                            </div>
                        </>
                    )}

                    {isOtpVerified && (
                        <>
                            <div className='inputs_box relative mb-3.5'>
                                <div>
                                    <label htmlFor="password" className='text-sm'>password: <span className='text-red-500'>*</span></label>
                                </div>
                                <input className='w-100 mt-2' type={isChangePassword ? "text" : "password"} required value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" />
                                <div className='eye_icon absolute top-12 right-3 text-slate-500 cursor-pointer' onClick={() => setIsChangePassword(!isChangePassword)} >
                                    {isChangePassword ? <FaRegEye size={18} /> : <FaEyeSlash size={18} />}
                                </div>
                            </div>
                            <div className='inputs_box relative mb-3.5'>
                                <div>
                                    <label htmlFor="ConfirmPassword" className='text-sm'>Confirm Password: <span className='text-red-500'>*</span></label>
                                </div>
                                <input className='w-100 mt-2' required type={isConfirmChangePassword ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                                <div className='eye_icon absolute top-12 right-3 text-slate-500 cursor-pointer' onClick={() => setConfirmChangePassword(!isConfirmChangePassword)} >
                                    {isConfirmChangePassword ? <FaRegEye size={18} /> : <FaEyeSlash size={18} />}
                                </div>

                            </div>
                            <div className='login_btn'>  <button type="submit" onClick={handleChangePassword}>Change Password</button></div>
                        </>
                    )}
                </form>

            </div>
        </div>
    )
}

export default ChangePassword
