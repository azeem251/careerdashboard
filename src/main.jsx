import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './route/route.jsx'
import { CartProvider } from './Context/CartProvider.jsx'


createRoot(document.getElementById('root')).render(
  <CartProvider>
  <RouterProvider router={router} />
  </CartProvider>
)
