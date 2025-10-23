// src/router.js
import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/general/auth/signup";
import { Login } from "./pages/general/auth/login";
import { Mail } from "./pages/general/main/main";
 
export const router = createBrowserRouter([
	{path:"",element:<Mail/> },
	{ path:"/signup",element:<SignUp/>},
	{ path: "/login", element: <Login/> }
]);
