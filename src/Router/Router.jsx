
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "../Pages/Home";
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import Details from "../Pages/Details";
import AboutUs from "../Pages/AboutUs";
import FevoritePage from "../Pages/FevoritePage";

 function Router() {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/Login",
          element: <Login/>,
        },
        {
          path: "/SignUp",
          element: <SignUp/>,
        },
        {
          path: "/Details/:id",
          element: <Details/>,
        },
        {
          path: "/About",
          element: <AboutUs/>,
        },
        {
          path: "/Fevorite",
          element: <FevoritePage/>,
        },
      ]);
  return (
    <div>
         <RouterProvider router={router} />
    </div>
  )
}
export default Router
