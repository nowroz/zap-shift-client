import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";

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
        path: "/services",
        element: <h1>Services</h1>,
      },
      {
        path: "/coverage",
        element: <h1>Coverage</h1>,
      },
      {
        path: "/about-us",
        element: <h1>About Us</h1>,
      },
      {
        path: "/pricing",
        element: <h1>Pricing</h1>,
      },
      {
        path: "/blog",
        element: <h1>Blog</h1>,
      },
      {
        path: "/contact",
        element: <h1>Contact</h1>,
      },
    ],
  },
]);

export default router;
