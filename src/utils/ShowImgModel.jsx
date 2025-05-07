import React, { useRef } from 'react'
import { IoClose } from 'react-icons/io5';

const ShowImgModel = ({ onImgClose, showimg }) => {
    const modalRef = useRef();
    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onImgClose();
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

                <div className="flex justify-between items-center mb-3">
                    <h2 style={{ fontSize: "18px" }} className="font-semibold ">Image Preview</h2>
                    <button onClick={onImgClose} className="text-gray-600 hover:text-red-500">
                        <IoClose size={24} />
                    </button>
                </div>
                <div>
                    <img src={showimg} alt={showimg} className='w-[250px] rounded text-center mx-auto' />
                </div>
            </div>
        </div>
    )
}

export default ShowImgModel
