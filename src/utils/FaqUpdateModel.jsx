import React, { useState, useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaCamera } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../Components/Loading/Loading';

const FaqupdateModel = ({ onfaqUpdateClose, updateId, updateData, getArticleAPI }) => {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isArticaleLoading, setIsArticaleLoading] = useState(false)
    const modalRef = useRef();
// close model onlclick the document of body
    const handleBackdropUpdateClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onfaqUpdateClose();
        }
    };


    // update faq

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        if (!question && !answer) {
            Swal.fire('Error', 'Please update at least one field', 'error');
            return;
        }

        const payload = {};
        if (question) payload.question = question;
        if (answer) payload.answer = answer;

        try {
            setIsArticaleLoading(true);

            const response = await axios.put(
                `https://mamun-reza-freeshops-backend.vercel.app/api/v1/faq/update/${updateId}`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            await getArticleAPI();
            Swal.fire('Updated', 'Faq updated successfully!', 'success');
            onfaqUpdateClose(); // close the modal

        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Warning', error.response?.data?.message || 'Something went wrong', 'warning');
        } finally {
            setIsArticaleLoading(false);
        }
    };


    useEffect(() => {
        setQuestion(updateData.question || '');
        setAnswer(updateData.answer || '');

    }, [updateData]);
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleBackdropUpdateClick}
        >
            <div
                ref={modalRef}
                className="bg-white w-full mx-3 max-w-[750px] rounded-lg shadow-lg p-6 relative"
            >
                <div className="flex justify-between items-center">
                    <h2 style={{ fontSize: "18px" }} className="font-semibold">Update Article</h2>
                    <button onClick={onfaqUpdateClose} className="text-gray-600 hover:text-red-500">
                        <IoClose size={24} />
                    </button>
                </div>

                <form className="space-y-4" onSubmit={handleUpdateSubmit}>


                    {/* Title */}
                    <div className="inputs_box mb-3.5">
                        <label htmlFor="title" className="text-sm">Question: <span className="text-red-500">*</span></label>
                        <input
                            className="w-full mt-2 border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Enter Question"
                            value={question}
                            onChange={e => setQuestion(e.target.value)}
                            required
                            type="text"
                        />
                    </div>

                    {/* Description */}
                    <div className="inputs_box mb-3.5">
                        <label className="block text-sm font-medium text-gray-700">Answer <span className="text-red-500">*</span></label>
                        <textarea
                            rows="4"
                            className="mt-1 block w-full bg-slate-100 rounded px-2 py-1 text-sm"
                            placeholder="Enter Answer..."
                            value={answer}
                            onChange={e => setAnswer(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit */}
                    <div className="login_btn">
                        <button className="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700" type="submit">

                            {isArticaleLoading ? (
                                <img src='https://i.gifer.com/ZKZg.gif' className='w-8 text-center mx-auto' />
                            ) : (
                                'Update Faq'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FaqupdateModel;
