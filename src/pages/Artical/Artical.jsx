import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import ArticalAddModel from '../../utils/ArticalAddModel';
import Loading from '../../Components/Loading/Loading';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import ArticalUpdateModel from '../../utils/ArticalUpdateModel';
import ShowImgModel from '../../utils/ShowImgModel';
import Swal from 'sweetalert2';
const Artical = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isShowImgOpen, setIsShowImgOpen] = useState(false)
  const [getArticleData, setGetArticleData] = useState([])
  const [totalArticles, setTotalArticles] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateId, setUpdateId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [updateData, setUpdateData] = useState({
    title: '',
    description: '',
    image: ''
  });
  const itemsPerPage = 10;

  const totalPages = Math.ceil(totalArticles / itemsPerPage);

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

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(current => current - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(current => current + 1);
  }
  // GET ARTICALES
  const getArticleAPI = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/Article/getArticle?search=&fromDate=&toDate=&page=${currentPage}&limit=${itemsPerPage}`, {
        method: "get",
        headers: {
          "Content-type": "application/json"
        }
      })
      if (!response.ok) {
        throw new Error("no articale Data found")
      }
      const result = await response.json()
      console.log("get articale resonse", result)
      setGetArticleData(result?.data?.docs)
      setTotalArticles(result?.data?.totalDocs || 0)
      console.log("state articel data", getArticleData)
    } catch (error) {
      console.log("articale get catch block error", error.message)
    } finally {
      setIsLoading(false)
    }
  }


// delete artical
const handleDeleteArticle = async (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to Delete this Articale!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`https://mamun-reza-freeshops-backend.vercel.app/api/v1/admin/Article/deleteArticle/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to delete article");
        }

        Swal.fire('Deleted!', 'Your article has been deleted.', 'success');
        getArticleAPI(); // Refresh list after delete
      } catch (error) {
        Swal.fire('Error!', 'Something went wrong.', 'error');
        console.error("Delete error:", error.message);
      }
    }
  });
}

  useEffect(() => {
    getArticleAPI()
  }, [currentPage])
  return (
    <>
      <div className='Aritical_wrapper All_wrapper'>
        <div className='top_heaindg'>
          <div>
            <h4 className="text-xl font-semibold  mb-0">Articale</h4>
          </div>
          <div className='flex items-center gap-3 aritcal_flex'>
            <div onClick={() => setIsModalOpen(!isModalOpen)}>
              <button className='artical_Add_btn'><span><FaPlus /></span>Add new articale</button>
            </div>
            <div className='articale_delete'><span ><FaRegTrashAlt /></span></div>
            <div>
              <span>Articale</span>   /  <Link to='/main'>Dashbaord</Link>
            </div>

          </div>
        </div>

        <div className='table_wrapper rounded  bg-white' style={{ overflowY: "auto" }}>
          <table className="table table-hover">
            <thead className='bg-black text-white '>
              <tr>
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
                <th style={{ borderRight: "1px solid white" }} scope="col">Title</th>
                <th style={{ borderRight: "1px solid white" }} scope="col">Description</th>
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
                    <td className=" cursor-pointer " onClick={() => { setIsShowImgOpen(!isShowImgOpen); setSelectedImage(item?.image) }} style={{ borderRight: "1px solid #80808040", fontSize: "14px" }}>
                      <img src={item?.image} className="w-10 h-10 object-cover rounded" loading="lazy" alt="Article" />
                    </td>
                    <td style={{ borderRight: "1px solid #80808040", fontSize: "14px" }} className=" border-gray-300">{item?.title || 'N/A'}</td>
                    <td style={{ borderRight: "1px solid #80808040", fontSize: "14px" }} className=" border-gray-300">{item?.description || 'N/A'}</td>
                    <td style={{ borderRight: "1px solid #80808040" }} className=" border-gray-300">
                      <div className="flex gap-2">
                        <button
                          className="Edit_btn"


                          onClick={() => {
                            setUpdateId(item._id);
                            console.log("Edit clicked for ID:", updateId);
                            console.log("Edit clicked for ID:", item.title);

                            setUpdateData({
                              title: item.title,
                              description: item.description,
                              image: item.image
                            });
                            setIsUpdateModalOpen(true);
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
        {/* Pagination Controls */}


        <div className="flex bg-white rounded p-3 justify-between items-center mt-4">
          <p className="text-sm mb-0 text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-3 items-center">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 opacity-50 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 opacity-50 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* add image model */}
      {isModalOpen && <ArticalAddModel getArticleAPI={getArticleAPI} onClose={() => setIsModalOpen(false)} />}
     {/* update img model */}
      {isUpdateModalOpen && (
        <ArticalUpdateModel
          onUpdateClose={() => setIsUpdateModalOpen(false)}
          updateId={updateId}
          updateData={updateData}
          getArticleAPI={getArticleAPI}
        />
      )}

      {/* show img model */}
      {
        isShowImgOpen && selectedImage && (
          <>

            <ShowImgModel showimg={selectedImage} onImgClose={() => setIsShowImgOpen(false)} />
          </>
        )
      }

    </>

  )
}

export default Artical
