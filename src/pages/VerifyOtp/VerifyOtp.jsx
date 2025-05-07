import React from 'react'

const VerifyOtp = () => {
  return (
    <div className='login_wrapper'>
            <div className='main_login bg-white '>
                
                <form action="">
                    <div className='inputs_box mb-3.5'>
                        <div>
                            <label htmlFor="email" className='text-sm'>OTP: <span className='text-red-500'>*</span></label>
                        </div>
                        <input className='w-100 mt-2' type="number" placeholder='585***' />
                    </div>
                   
                    <div className='login_btn'>
                       <button>Verify OTP</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default VerifyOtp
