import React, { useState, useRef } from 'react';
import { IoClose } from 'react-icons/io5';

import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../Components/Loading/Loading';

const FaqAddModel = ({ onfaqClose, getArticleAPI }) => {

    const [isArticaleLoading, setIsArticaleLoading] = useState(false)
    const [faqData, setFaqData] = useState({
        question: "",
        answer: ""
    })


    const modalRef = useRef();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFaqData(prev => ({ ...prev, [name]: value }));
    };

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onfaqClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!faqData.question || !faqData.answer) {
            Swal.fire('Error', 'All fields are required', 'error');
            return;
        }
        console.log(faqData)
        const payload = {
            question: faqData.question,
            answer: faqData.answer,
        };

        try {
            setIsArticaleLoading(true)
            const response = await axios.post(
                'https://mamun-reza-freeshops-backend.vercel.app/api/v1/faq/add',
                payload
            );
           
            await getArticleAPI()

            Swal.fire('Faq Added', 'Faq created successfully!', 'success');
            onfaqClose(); // ✅ Close modal after success
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error', error.response?.data?.message || 'Something went wrong', 'error');
        } finally {
            setIsArticaleLoading(false)
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
                    <h2 style={{ fontSize: "18px" }} className="font-semibold">Add FAQ's</h2>
                    <button onClick={onfaqClose} className="text-gray-600 hover:text-red-500">
                        <IoClose size={24} />
                    </button>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>



                    {/* Title */}
                    <div className="inputs_box mt-3 mb-3.5">
                        <label htmlFor="title" className="text-sm">Question: <span className="text-red-500">*</span></label>
                        <input
                            className="w-full mt-2 border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Enter Title"
                            value={faqData.question}
                            required
                            name='question'
                            type="text"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Description */}
                    <div className="inputs_box mb-3.5">
                        <label className="block text-sm font-medium text-gray-700">Answers <span className="text-red-500">*</span></label>
                        <textarea
                            rows="4"
                            className="mt-1 block w-full bg-slate-100 rounded px-2 py-1 text-sm"
                            placeholder="Enter description..."
                            value={faqData.answer}
                            required
                            name="answer"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Submit */}
                    <div className="login_btn">
                        <button className="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700" type="submit">

                            {isArticaleLoading ? (
                                <img src='https://i.gifer.com/ZKZg.gif' className='w-8 text-center mx-auto' />
                            ) : (
                                'Save Faq'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FaqAddModel;
