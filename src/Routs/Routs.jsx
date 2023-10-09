import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AboutUS from "../Pages/AboutUS/AboutUS";
import Purchased from "../Pages/Purchased/Purchased";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivetRouts from "./PrivetRout";
import Services from "../Pages/Services/Services";
import ServiceDetails from "../Pages/ServiceDetails/ServiceDetails";
import Contact from "../Pages/Contact/Contact";


export const Routs = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            path: '/',
            element: <Home></Home>,
            loader: ()=>fetch('/cultural.json')
        },
        {
            path: '/services',
            element: <Services></Services>,
            loader: ()=>fetch('/cultural.json')

        },
        {
            path: '/purchased',
            element: <PrivetRouts><Purchased></Purchased></PrivetRouts>
        },
        {
            path: '/about',
            element: <AboutUS></AboutUS>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/signUp',
            element: <SignUp></SignUp>,
        },
        {
            path: '/cultural/:id',
            element: <PrivetRouts><ServiceDetails></ServiceDetails></PrivetRouts>,
            loader: ()=> fetch('/cultural.json'),
        },
        {
            path: '/contact',
            element: <Contact></Contact>,
        },
    ]
  },
]);

export default Routs;
