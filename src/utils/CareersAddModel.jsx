import React, { useState, useRef } from 'react';
import { IoClose } from 'react-icons/io5';

import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../Components/Loading/Loading';

const CareersOpening = ({ onClose, getArticleAPI }) => {

    const [isArticaleLoading, setIsArticaleLoading] = useState(false)
    const [CareersData, setCareersData] = useState({
        title: "",
       
        location: "",
        description: "",
    })


    const modalRef = useRef();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCareersData(prev => ({ ...prev, [name]: value }));
    };

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!CareersData.title || !CareersData.location || !CareersData.description) {
            Swal.fire('Error', 'All fields are required', 'error');
            return;
        }
    
        const payload = {
            title: CareersData.title,
            location: CareersData.location,
            description: CareersData.description,
        };
    
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTJmNTcyZWMwYzU2NThjZjBjODk5NCIsImlhdCI6MTc0NjQzNjk4OSwiZXhwIjoxNzc3OTcyOTg5fQ.q6fUbEYdoyZUqlltElLGSq3kOYQwVfPSfo1_R4MpPzM';
    
        try {
            setIsArticaleLoading(true);
    
            const response = await axios.post(
                'https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/addCareerOpening',
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            await getArticleAPI();
    
            Swal.fire('Careers Added', 'Careers created successfully!', 'success');
            onClose(); // ✅ Close modal after success
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error', error.response?.data?.message || 'Something went wrong', 'error');
        } finally {
            setIsArticaleLoading(false);
        }
    };
    

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleBackdropClick}
        >
            <div
                ref={modalRef}
                className="bg-white w-full mx-3 max-w-[750px] rounded-lg shadow-lg p-6 relative"
            >
                <div className="flex justify-between items-center">
                    <h2 style={{ fontSize: "18px" }} className="font-semibold">Add Careers</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-red-500">
                        <IoClose size={24} />
                    </button>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>



                    {/* Title */}
                    <div className="inputs_box mt-3 mb-3.5">
                        <label htmlFor="title" className="text-sm">Title: <span className="text-red-500">*</span></label>
                        <input
                            className="w-full mt-2 border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Enter Title"
                            value={CareersData.title}
                            required
                            name='title'
                            type="text"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputs_box mt-3 mb-3.5">
                        <label htmlFor="title" className="text-sm">Location: <span className="text-red-500">*</span></label>
                        <input
                            className="w-full mt-2 border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Enter location"
                            value={CareersData.location}
                            required
                            name='location'
                            type="text"
                            onChange={handleChange}
                        />
                    </div>
                    {/* Description */}
                    <div className="inputs_box mb-3.5">
                        <label className="block text-sm font-medium text-gray-700">description <span className="text-red-500">*</span></label>
                        <textarea
                            rows="4"
                            className="mt-1 block w-full bg-slate-100 rounded px-2 py-1 text-sm"
                            placeholder="Enter description..."
                            value={CareersData.description}
                            required
                            name="description"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Submit */}
                    <div className="login_btn">
                        <button className="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700" type="submit">

                            {isArticaleLoading ? (
                                <img src='https://i.gifer.com/ZKZg.gif' className='w-8 text-center mx-auto' />
                            ) : (
                                'Save Careers'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CareersOpening;
