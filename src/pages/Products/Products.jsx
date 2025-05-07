import React, { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import { MdDeleteOutline } from 'react-icons/md';
import ProductAddModel from '../../utils/ProductAddModel';
import Swal from 'sweetalert2';
import ShowProductModel from '../../utils/ShowProductModel';
import ProductUpdateModel from '../../utils/ProductUpdateModel';
import { useCart } from '../../Context/CartProvider';
const Products = ({product}) => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isShowImgOpen, setIsShowImgOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [updateId, setUpdateId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [updateData, setUpdateData] = useState({
        title: '',
        description: '',
        image: '',
        category: '',
        price: '',

    });
    const [cart, setCart] = useState([]);
    const getProductsApi = async () => {
        try {
            setLoading(true);
            const res = await fetch("https://fakestoreapi.com/products", {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const result = await res.json();
            setProducts(result);
            console.log(result)
        } catch (error) {
            console.log("products block error", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to add a new product and update the products list
    const addNewProduct = async (productData) => {
        try {
            setLoading(true);

            // Generate a unique ID based on the current time or by counting the existing products
            const uniqueId = new Date().getTime(); // Using timestamp as a unique ID

            const newProduct = {
                ...productData,
                id: uniqueId,  // Assigning a unique ID
            };

            // Make an API call to add the product
            const res = await fetch("https://fakestoreapi.com/products", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newProduct), // Pass the new product data with ID
            });

            const addedProduct = await res.json();

            if (addedProduct) {
                // Add the new product to the products list
                setProducts(prevProducts => [addedProduct, ...prevProducts]); // Prepending the new product
                Swal.fire('Product Added', 'Product created successfully!', 'success');
            }
        } catch (error) {
            console.error('Error adding product:', error.message);
            Swal.fire('Error', 'Failed to add the product', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductsApi();
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const truncateText = (text, length = 50) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

    // delete prodcut
    const deleteProduct = async (id) => {
        try {
            // Show confirmation dialog before proceeding with deletion
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
            });

            if (result.isConfirmed) {
                setLoading(true);

                // Make API call to delete the product
                const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json"
                    }
                });

                if (res.ok) {
                    // Filter out the deleted product from the state
                    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
                    Swal.fire('Product Deleted', 'Product deleted successfully!', 'success');
                } else {
                    Swal.fire('Error', 'Failed to delete the product', 'error');
                }
            }
        } catch (error) {
            console.log('Error deleting product:', error.message);
            Swal.fire('Error', 'Failed to delete the product', 'error');
        } finally {
            setLoading(false);
        }
    };
     // Fetch a single product based on the product ID
    //  const getSingleProduct = async (productId) => {
    //     try {
    //         setLoading(true);
    //         const res = await fetch(`https://fakestoreapi.com/products/${productId}`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-type": "application/json"
    //             }
    //         });
    //         const product = await res.json();
    //         console.log("Product details: ", product);
    //         return product;
    //     } catch (error) {
    //         console.log("Error fetching single product:", error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // // Add product to the cart or update its quantity if it already exists
    // const addToCart = (product) => {
    //     const existingProduct = cart.find(item => item.id === product.id);

    //     if (existingProduct) {
    //         setCart(cart.map(item =>
    //             item.id === product.id
    //                 ? { ...item, quantity: item.quantity + 1 }
    //                 : item
    //         ));
    //     } else {
    //         setCart([...cart, { ...product, quantity: 1 }]);
    //     }
    //     Swal.fire('Added to Cart', `${product.title} added successfully!`, 'success');
    // };

    // // Handle the click on a product to fetch and add it to the cart
    // const handleProductClick = async (productId) => {
    //     const product = await getSingleProduct(productId);
    //     if (product) {
    //         addToCart(product);
    //     }
    // };

    // // Remove item from cart (optional functionality)
    // const removeFromCart = (productId) => {
    //     setCart(cart.filter(item => item.id !== productId));
    //     Swal.fire('Removed from Cart', 'Product removed successfully', 'success');
    // };

    // Total price calculation
    // const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const getSingleProduct = async (productId) => {
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await res.json();
        return product;
      };
      const handleProductClick = async (productId) => {
        const product = await getSingleProduct(productId);
        if (product) {
          addToCart(product);
          Swal.fire('Added to Cart', `${product.title} added successfully!`, 'success');
        }
      };
    return (
        <div className='Aritical_wrapper All_wrapper'>
            <div className='top_heaindg'>
                <div>
                    <h4 className="text-xl font-semibold mb-0">Products</h4>
                </div>
                <div className='flex items-center gap-3 aritcal_flex'>
                    <div>
                        <button className='artical_Add_btn' onClick={() => setIsModalOpen(!isModalOpen)}><span><FaPlus /></span> Add new Products</button>
                    </div>
                    <div className='articale_delete'><span><FaRegTrashAlt /></span></div>
                    <div>
                        <span>Products</span> / <Link to='/main'>Dashboard</Link>
                    </div>
                </div>
            </div>
           <div className='table_wrapper rounded  bg-white' style={{ overflowY: "auto" }}>
           <table className="min-w-full border border-gray-200 divide-gray-200 shadow-sm rounded-md " >
                <thead className="bg-gray-100 bg-dark" >
                    <tr>
                        <th style={{ border: "1px solid #80808054" }} className="px-4 py-2 text-white text-left text-sm font-semibold">Sr.No</th>
                        <th style={{ border: "1px solid #80808054" }} className="px-4 py-2 text-white text-left text-sm font-semibold">Time% Date</th>
                        <th style={{ border: "1px solid #80808054" }} className="px-4 py-2 text-white text-left text-sm font-semibold">Image</th>
                        <th style={{ border: "1px solid #80808054" }} className="px-4 py-2 text-white text-left text-sm font-semibold">Title</th>
                        <th style={{ border: "1px solid #80808054" }} className="px-4 py-2 text-white text-left text-sm font-semibold">Description</th>
                        <th style={{ border: "1px solid #80808054" }} className="px-4 py-2 text-white text-left text-sm font-semibold">Category</th>
                        <th style={{ border: "1px solid #80808054" }} className="px-4 py-2 text-white text-left text-sm font-semibold">Price</th>
                        <th style={{ border: "1px solid #80808054" }} className="px-4 py-2 text-white text-left text-sm font-semibold">Actions</th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-100">
                    {
                        loading ? (
                            <tr className="w-100">
                                <td className="py-3 text-center" colSpan={100}>
                                    <div className="flex justify-center items-center ">
                                        <Loading />
                                    </div>
                                </td>
                            </tr>
                        ) : currentProducts.length > 0 ? (
                            currentProducts.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50">
                                    <td style={{ border: "1px solid #80808054", fontSize: "14px" }} className="px-4 border-r border-gray-200">{p.id}</td>
                                    <td style={{ border: "1px solid #80808054", fontSize: "14px" }} className="px-4 border-r border-gray-200">
                                        {new Date().toLocaleString() || 'N/A'}
                                    </td>
                                    <td style={{ border: "1px solid #80808054" }} className="px-4 py-2 border-r border-gray-200 cursor-pointer" onClick={() => { setIsShowImgOpen(!isShowImgOpen); setSelectedImage(p?.image) }}>
                                        <img loading='lazy' src={p.image} alt={p.title} width={40} className="rounded" style={{ aspectRatio: "3/3" }} />
                                    </td>
                                    <td style={{ border: "1px solid #80808054", fontSize: "14px" }} className="px-4 border-r border-gray-200">{truncateText(p.title, 30)}</td>
                                    <td style={{ border: "1px solid #80808054", fontSize: "14px" }} className="px-4 border-r border-gray-200">{truncateText(p.description, 50)}</td>
                                    <td style={{ border: "1px solid #80808054", fontSize: "14px" }} className="px-4 border-r border-gray-200">{p.category}</td>
                                    <td style={{ border: "1px solid #80808054", fontSize: "14px" }} className="px-4 border-r border-gray-200">{`₹ ${p.price}`}</td>
                                    <td style={{ border: "1px solid #80808054", fontSize: "14px" }} className="px-4">
                                        <div className="flex gap-2">
                                            <button className="Edit_btn text-blue-600 hover:text-blue-800"
                                                onClick={() => {
                                                    setUpdateId(p.id);
                                                    console.log("Edit clicked for ID:", updateId);
                                                    console.log("Edit clicked for ID:", p.title);

                                                    setUpdateData({
                                                        title: p.title,
                                                        description: p.description,
                                                        image: p.image,
                                                        category: p.category,
                                                        price: p.price,

                                                    });
                                                    setIsUpdateModalOpen(true);
                                                }}
                                            >

                                                <FaEdit /></button>
                                            <button className="delete_btn text-red-600 hover:text-red-800" onClick={() => deleteProduct(p.id)}><MdDeleteOutline /></button>
                                            <button className=" bg-green-600 rounded  text-white w-[70px] hover:text-white-800 " onClick={() => handleProductClick(p.id)}>cart</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="100" className="text-center py-4 text-gray-500">No Products Found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
           </div>


            <div className='flex justify-center mt-6'>
                <div className="flex w-100 justify-center items-center gap-4 bg-white px-6 py-3 rounded-lg shadow-md">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded font-medium border border-gray-300 transition-all ${currentPage === 1
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-gray-800'
                            }`}
                    >
                        Prev
                    </button>

                    <span className="text-sm font-semibold text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded font-medium border border-gray-300 transition-all ${currentPage === totalPages
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-gray-800'
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
            {isModalOpen && <ProductAddModel addNewProduct={addNewProduct} getProductsApi={getProductsApi} onClose={() => setIsModalOpen(false)} />}
            {
                isShowImgOpen && selectedImage && (
                    <>

                        <ShowProductModel showimg={selectedImage} onImgClose={() => setIsShowImgOpen(false)} />
                    </>
                )
            }

            {isUpdateModalOpen && (
                <ProductUpdateModel
                    onUpdateClose={() => setIsUpdateModalOpen(false)}
                    updateId={updateId}
                    updateData={updateData}
                    getProductsApi={getProductsApi}
                />
            )}


        </div>
    );
};

export default Products;
