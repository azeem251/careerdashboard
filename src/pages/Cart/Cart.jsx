import React from 'react';
// import { useCart } from '../context/CartContext';
import { useCart } from '../../Context/CartProvider';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
    const { cart, removeFromCart } = useCart();

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const navigate = useNavigate();

    if (cart.length === 0) {
      return (
        <div className="text-center pt-25 cart_empty bg-white mx-12 mx-md:4 mt-33 rounded pb-4">
          <img src="https://img.lovepik.com/free-png/20211215/lovepik-girl-pushing-a-shopping-cart-png-image_401645335_wh1200.png" alt="Empty Cart" className="mx-auto w-66 mb-6" />
          <p className="text-lg font-semibold text-gray-600">Your cart is empty!</p>
          <button
            onClick={() => navigate('/page/products')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>
      );
    }
    return (
        <div className='Aritical_wrapper All_wrapper'>
            <div className='top_heaindg'>
                <div>
                    <h4 className="text-xl font-semibold  mb-0">Cart</h4>
                </div>
                <div className='flex items-center gap-3 aritcal_flex'>
                    <div className='articale_delete'><span ><FaRegTrashAlt /></span></div>
                    <div>
                        <span>Cart</span>   /  <Link to='/main'>Dashboard</Link>
                    </div>
                </div>
            </div>

            <div className='table_wrapper rounded  bg-white' style={{ overflowY: "auto" }} >
                <div>
          
                    {cart.length === 0 ? (
 <div className="flex items-center justify-center ">
 <p className="text-center text-gray-500">Your cart is empty</p>
</div>
) : (
  <div className="overflow-x-auto ">
   <table className="min-w-full bg-white text-sm">
        <thead className="bg-black text-white">
          <tr>
            <th style={{ border: "1px solid #80808054", fontSize: "14px" }}  className="text-left px-4 py-3 border-b">Product</th>
            <th style={{ border: "1px solid #80808054", fontSize: "14px" }} className="text-left px-4 py-3 border-b">Title</th>
            <th style={{ border: "1px solid #80808054", fontSize: "14px" }} className="text-center px-4 py-3 border-b">Quantity</th>
            <th  style={{ border: "1px solid #80808054", fontSize: "14px" }}className="text-center px-4 py-3 border-b">Price</th>
            <th style={{ border: "1px solid #80808054", fontSize: "14px" }} className="text-center px-4 py-3 border-b">Total</th>
            <th  style={{ border: "1px solid #80808054", fontSize: "14px" }} className="text-center px-4 py-3 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id} className="border-t">
              <td style={{ border: "1px solid #80808054", fontSize: "14px" }} className="px-4 py-2">
                <img src={item.image} className="w-12 h-12 object-contain" alt={item.title} />
              </td>
              <td style={{ border: "1px solid #80808054", fontSize: "14px" }} className="px-4 py-2">{item.title}</td>
              <td style={{ border: "1px solid #80808054", fontSize: "14px" }} className="text-center px-4 py-2">{item.quantity}</td>
              <td  style={{ border: "1px solid #80808054", fontSize: "14px" }}className="text-center px-4 py-2">₹{item.price}</td>
              <td  style={{ border: "1px solid #80808054", fontSize: "14px" }}className="text-center px-4 py-2">₹{(item.price * item.quantity).toFixed(2)}</td>
              <td  style={{ border: "1px solid #80808054", fontSize: "14px" }}className="text-center px-4 py-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-white bg-red-600 w-[50px] h-[33px] rounded text-center mx-auto hover:text-red-800"
                  title="Remove"
                >
                  <FaRegTrashAlt size={18} className='text-center block mx-auto' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
)}

                    <p className="font-semibold mt-2 p-2 text-right">Total: ₹{totalPrice.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default Cart;
