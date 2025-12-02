import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import Coverage from "../pages/coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/auth/register/Register";
import Login from "../pages/auth/login/Login";
import BeARider from "../pages/rider/BeARider";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../pages/sendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/dashboard/myParcels/MyParcels";
import Payment from "../pages/dashboard/payment/Payment";
import PaymentSuccessfull from "../pages/dashboard/payment/PaymentSuccessfull";
import PaymentCancelled from "../pages/dashboard/payment/PaymentCancelled";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "services",
        element: <h1>Services</h1>,
      },
      {
        path: "coverage",
        loader: () => fetch("/warehouses.json"),
        Component: Coverage,
      },
      {
        path: "about-us",
        element: <h1>About Us</h1>,
      },
      {
        path: "send-parcel",
        loader: () => fetch("/warehouses.json"),
        Component: SendParcel,
      },
      {
        path: "blog",
        element: <h1>Blog</h1>,
      },
      {
        path: "contact",
        element: <h1>Contact</h1>,
      },
      {
        path: "be-a-rider",
        element: (
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:id",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccessfull,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
    ],
  },
]);

export default router;
