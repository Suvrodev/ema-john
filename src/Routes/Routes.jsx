import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import Shop from "../Pages/Shop/Shop/Shop";
import Orders from "../components/Orders/Orders";
import Inventory from "../components/Inventory/Inventory";
import Login from "../Shared/Login/Login";
import SignUp from "../Shared/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/order",
        element: <Orders />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
