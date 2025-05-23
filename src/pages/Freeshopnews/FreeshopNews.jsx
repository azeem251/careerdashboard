import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import Loading from '../../Components/Loading/Loading';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";


import Swal from 'sweetalert2';
import FaqAddModel from '../../utils/FaqAddModel';
import FaqupdateModel from '../../utils/FaqUpdateModel';
import FreeshopAddModel from '../../utils/FreeshopAddModel';
import FreeUpdateModel from '../../utils/FreeshopUpdateModel';
import FreeShowImgModel from '../../utils/FreeShowImgModel';
const FreeShopNews = () => {


    const [isLoading, setIsLoading] = useState(false)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [getArticleData, setGetArticleData] = useState([])
    const [selectedImage, setSelectedImage] = useState(null);
    const [isShowImgOpen, setIsShowImgOpen] = useState(false)
    const [updateId, setUpdateId] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);


    const [updateData, setUpdateData] = useState({
        image: null,
        title: '',
        decsription: ""

    });



    const visibleItems = getArticleData;

    const isAllSelected = visibleItems.length > 0 && visibleItems.every(item => selectedIds.includes(item._id));

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedIds(prev => prev.filter(id => !visibleItems.some(item => item._id === id)));
        } else {
            const newIds = visibleItems.map(item => item._id);
            setSelectedIds(prev => [...new Set([...prev, ...newIds])]);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(selected => selected !== id) : [...prev, id]
        );
    };


    useEffect(() => {
        getArticleAPI();
    }, []);


    //   get all free show news data
    const getArticleAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/FreeShopNews/allFreeShopNews`);
            const result = await response.json();
            console.log("Fetched Free result", result);

            // Try all these and log which one has the correct data
            console.log("Data:", result?.data);
            console.log("Docs:", result?.data?.docs);

            setGetArticleData(result?.data.reverse() || []); // Adjust as needed
        } catch (error) {
            console.error("GET error:", error.message);
        } finally {
            setIsLoading(false);
        }
    };


    // delete artical
    const handleDeleteArticle = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to  Delete this Freeshopnews!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/FreeShopNews/deleteFreeShopNews/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    await getArticleAPI();
                    if (!response.ok) {
                        throw new Error("Failed to delete Faq");
                    }

                    Swal.fire('Deleted!', 'Your Freeshopnews has been deleted.', 'success');
                    // Refresh list after delete
                } catch (error) {
                    Swal.fire('Error!', 'Something went wrong.', 'error');
                    console.error("Delete error:", error.message);
                }
            }
        });
    }



    return (
        <>
            <div className='Aritical_wrapper All_wrapper'>
                <div className='top_heaindg'>
                    <div>
                        <h4 className="text-xl font-semibold  mb-0">Free Shop News</h4>
                    </div>
                    <div className='flex items-center gap-3 aritcal_flex'>
                        <div>
                            <button className='artical_Add_btn' onClick={() => setIsAddOpen(!isAddOpen)}><span><FaPlus /></span>Add New FreeShopNews</button>
                        </div>
                        <div className='articale_delete'><span ><FaRegTrashAlt /></span></div>
                        <div>
                            <span>FreeShopNews</span>   /  <Link to='/main'>Dashbaord</Link>
                        </div>

                    </div>
                </div>

                <div className='table_wrapper rounded  bg-white' style={{ overflowY: "auto" }} >
                    <table className="table table-hover">
                        <thead className='bg-black text-white '>
                            <tr >
                                <th style={{ borderRight: "1px solid white" }} scope="col" className="text-center px-4 py-2">
                                    <div className="flex justify-center items-center">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={isAllSelected}
                                            onChange={handleSelectAll}
                                            id="flexCheckDefault"
                                        />
                                    </div>
                                </th>
                                <th style={{ borderRight: "1px solid white" }} scope="col">Time & Date</th>
                                <th style={{ borderRight: "1px solid white" }} scope="col">Image</th>
                                <th style={{ borderRight: "1px solid white" }} scope="col">Id's</th>
                                <th style={{ borderRight: "1px solid white" }} scope="col">Title</th>
                                <th style={{ borderRight: "1px solid white" }} scope="col">Decsription</th>

                                <th style={{ borderRight: "1px solid white" }} scope="col">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="10" className="p-6">
                                        <div className="flex justify-center items-center h-full">
                                            <Loading />
                                        </div>
                                    </td>
                                </tr>
                            ) : visibleItems.length > 0 ? (
                                visibleItems.map((item, index) => (
                                    <tr key={item._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>

                                        <td style={{ borderRight: "1px solid #80808040" }} className="text-center align-middle">
                                            <div className="flex justify-center">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    checked={selectedIds.includes(item._id)}
                                                    onChange={() => handleCheckboxChange(item._id)}
                                                    id="flexCheckDefault"
                                                />
                                            </div>
                                        </td>
                                        <td style={{ borderRight: "1px solid #80808040", fontSize: "14px" }}>
                                            {new Date(item.createdAt).toLocaleString() || 'N/A'}
                                        </td>
                                        <td className=" cursor-pointer " style={{ borderRight: "1px solid #80808040", fontSize: "14px" }} onClick={() => { setIsShowImgOpen(!isShowImgOpen); setSelectedImage(item?.image) }}>
                                            <img src={item?.image} className="w-10 h-10 object-cover rounded" loading="lazy" alt="Article" />
                                        </td>
                                        <td className=" cursor-pointer " style={{ borderRight: "1px solid #80808040", fontSize: "14px" }}>
                                            {item?._id || 'N/A'}
                                        </td>
                                        <td style={{ borderRight: "1px solid #80808040", fontSize: "14px" }} className=" border-gray-300">{item?.title || 'N/A'}</td>
                                        <td style={{ borderRight: "1px solid #80808040", fontSize: "14px" }} className=" border-gray-300">{item?.description || 'N/A'}</td>

                                        <td style={{ borderRight: "1px solid #80808040" }} className=" border-gray-300">
                                            <div className="flex gap-2">
                                                <button
                                                    className="Edit_btn"
                                                    onClick={() => {
                                                        setUpdateId(item._id);
                                                        console.log("Edit clicked for ID:", item._id);
                                                        console.log("Edit clicked for question:", item.question);
                                                        setIsUpdateOpen(true)
                                                        setUpdateData({
                                                            image: item.image,
                                                            title: item.title,
                                                            description: item.description,

                                                        });

                                                    }}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button className="delete_btn" onClick={() => handleDeleteArticle(item._id)}><MdDeleteOutline /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-gray-500 p-6">No Article Data found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


            </div>



            {
                isAddOpen && <FreeshopAddModel getArticleAPI={getArticleAPI} onClose={() => setIsAddOpen(false)} />
            }
            {
                isUpdateOpen && <FreeUpdateModel onUpdateClose={() => setIsUpdateOpen(false)}
                    updateId={updateId}
                    updateData={updateData}
                    getArticleAPI={getArticleAPI}
                />
            }

            {/* show img model */}
            {
                isShowImgOpen && selectedImage && (
                    <>

                        <FreeShowImgModel showimg={selectedImage} onImgClose={() => setIsShowImgOpen(false)} />
                    </>
                )
            }
        </>

    )
}

export default FreeShopNews
