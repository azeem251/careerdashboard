import React, { useState, useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaCamera } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../Components/Loading/Loading';

const ProductUpdateModel = ({ onUpdateClose, updateId, updateData, getProductsApi }) => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isArticaleLoading, setIsArticaleLoading] = useState(false)
  const modalRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file); // Store actual file for upload
    }
  };

  const handleBackdropUpdateClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
        onUpdateClose();
    }
  };

  // Update product functionality
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that the ID exists and fields are provided
    if (!updateId) {
        Swal.fire('Error', 'Invalid Product ID', 'error');
        return;
    }

    if (!title && !description && !imageFile && !category && !price) {
        Swal.fire('Error', 'Please update at least one field', 'error');
        return;
    }

    const formData = new FormData();
    if (imageFile) formData.append('image', imageFile);
    if (title) formData.append('title', title);
    if (description) formData.append('description', description);
    if (category) formData.append('category', category);
    if (price) formData.append('price', price);

    try {
        setIsArticaleLoading(true);

        // Make the PUT request to update the product
        const response = await axios.put(
            `https://fakestoreapi.com/products/${updateId}`, // Ensure updateId is valid
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for FormData
                },
            }
        );

        if (response.status === 200) {
            await getProductsApi(); // Refresh the products list
            Swal.fire('Updated', 'Product updated successfully!', 'success');
            onUpdateClose(); // Close the modal after success
        } else {
            Swal.fire('Error', 'Failed to update product', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire('Warning', error.response?.data?.message || 'Something went wrong', 'warning');
    } finally {
        setIsArticaleLoading(false);
    }
};

useEffect(() => {
    if (updateData) {
        setTitle(updateData.title || '');
        setDescription(updateData.description || '');
        setImage(updateData.image || null);
        setCategory(updateData.category || '');
        setPrice(updateData.price || '');
    }
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
          <h2 style={{ fontSize: "18px" }} className="font-semibold">Update Product</h2>
          <button onClick={onUpdateClose} className="text-gray-600 hover:text-red-500">
            <IoClose size={24} />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="text-center">
            <label htmlFor="uploadProfile">
              <div className="border bg-slate-100 w-[75px] h-[75px] flex items-center justify-center mx-auto border-primary-100 hover:bg-primary-200 cursor-pointer rounded-full text-sm mb-1">
                {image ? (
                  <img src={image} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <FaCamera size={22} className="text-slate-400" />
                )}
              </div>
            </label>
            <p className="text-sm text-slate-400">Upload Image</p>
            <input
              type="file"
              id="uploadProfile"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Title */}
          <div className="inputs_box mb-3.5">
            <label htmlFor="title" className="text-sm">Title: <span className="text-red-500">*</span></label>
            <input
              className="w-full mt-2 border border-gray-300 rounded px-2 py-1 text-sm"
              placeholder="Enter Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              type="text"
            />
          </div>

          {/* Category */}
          <div className="inputs_box mb-3.5">
            <label htmlFor="category" className="text-sm">Category: <span className="text-red-500">*</span></label>
            <input
              className="w-full mt-2 border border-gray-300 rounded px-2 py-1 text-sm"
              placeholder="Enter Category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
              type="text"
            />
          </div>

          {/* Price */}
          <div className="inputs_box mb-3.5">
            <label htmlFor="price" className="text-sm">Price: <span className="text-red-500">*</span></label>
            <input
              className="w-full mt-2 border border-gray-300 rounded px-2 py-1 text-sm"
              placeholder="Enter Price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
              type="number"
            />
          </div>

          {/* Description */}
          <div className="inputs_box mb-3.5">
            <label className="block text-sm font-medium text-gray-700">Description <span className="text-red-500">*</span></label>
            <textarea
              rows="4"
              className="mt-1 block w-full bg-slate-100 rounded px-2 py-1 text-sm"
              placeholder="Enter description..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <div className="login_btn">
            <button className="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700" type="submit">
              {isArticaleLoading ? (
                <img src='https://i.gifer.com/ZKZg.gif' className='w-8 text-center mx-auto' />
              ) : (
                'Update Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdateModel;
