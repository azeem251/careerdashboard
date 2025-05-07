import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard/Dashboard";
import Artical from "../pages/Artical/Artical";
import Faq from "../pages/Faq/Faq";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import VerifyOtp from "../pages/VerifyOtp/VerifyOtp";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import ProtectedRoute from "../Components/PrivateRouted/PrivateRouted";
// import TitleWrapper from "../Components/TitleWrapper"; // import it
import TitleChange from "../Components/TitleChange/TitleChange";
import FreeshopNews from "../pages/Freeshopnews/FreeshopNews";
import CareersOpening from "../pages/CareersOpening/CareersOpening";
import Products from "../pages/Products/Products";
import Cart from "../pages/Cart/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: (
          <TitleChange title="Login">
            <Login />
          </TitleChange>
        ),
      },
      {
        path: "/registration",
        element: (
          <TitleChange title="Register">
            <Register />
          </TitleChange>
        ),
      },
      {
        path: "/changepassword",
        element: (
          <TitleChange title="Change Password">
            <ChangePassword />
          </TitleChange>
        ),
      },
      {
        path: "/verifyotp",
        element: (
          <TitleChange title="Verify OTP">
            <VerifyOtp />
          </TitleChange>
        ),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/main",
            element: (
              <TitleChange title="Dashboard">
                <Dashboard />
              </TitleChange>
            ),
          },
          {
            path: "/page/articale",
            element: (
              <TitleChange title="Article Page">
                <Artical />
              </TitleChange>
            ),
          },
          {
            path: "/page/faq",
            element: (
              <TitleChange title="FAQ Page">
                <Faq />
              </TitleChange>
            ),
          },
          {
            path: "/page/freeshopnews",
            element: (
              <TitleChange title="Free shop news Page">
                <FreeshopNews />
              </TitleChange>
            ),
          },
          {
            path: "/page/careersopening",
            element: (
              <TitleChange title="Careers Openning Page">
                <CareersOpening />
              </TitleChange>
            ),
          },
          {
            path: "/page/products",
            element: (
              <TitleChange title="Products Page">
                <Products />
              </TitleChange>
            ),
          },
          {
            path: "/page/cart",
            element: (
              <TitleChange title="cart Page">
                <Cart />
              </TitleChange>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <TitleChange title="404 - Page Not Found">
        <PageNotFound />
      </TitleChange>
    ),
  },
]);

export default router;
