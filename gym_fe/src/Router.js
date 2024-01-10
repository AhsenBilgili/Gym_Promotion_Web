import { createBrowserRouter } from "react-router-dom";
import Courses from "./courses/Courses";
import Facilities from "./facilities/Facilities";
import HomePage from "./homepage/HomePage";
import Prices from "./Prices/Prices"
import App from "./App";
import Login from "./account/Login";
import Register from "./account/Register";
import CourseDetails from "./courses/CourseDetails";

export const router=  createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children:[
            {path:"",element:<HomePage/>},
            {path:"facilities",element:<Facilities/>},
            {path:"courses",element:<Courses/>},
            {path:"prices",element:<Prices/>},
            {path:"login",element:<Login/>},
            {path:"register",element:<Register/>},
            {path:"specialcourses/:id" ,element:<CourseDetails/>},
            {path:"courses/:id" ,element:<Prices/>}


        ]
    }
])