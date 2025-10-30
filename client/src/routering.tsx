// src/router.js
import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/general/auth/signup";
import { Login } from "./pages/general/auth/login";
import { Mail } from "./pages/general/main/main";
import { Verify } from "./pages/general/auth/verify";
import { ForgotPassword } from "./pages/general/auth/forgotPassword";
import { ForgotVerify } from "./pages/general/auth/forgotVerify";
import { Layout } from "./pages/general/profileUser/layout";
import { Dashboard } from "./pages/general/profileUser/pagesUser/dashboard";
 
export const router = createBrowserRouter([
	{path:"",element:<Mail/> },
	{ path:"/signup",element:<SignUp/>},
	{ path: "/login", element: <Login/> },
	{path:"/verify",element:<Verify/>},
	{path:"/forgot",element:<ForgotVerify/>},
	{path:"/forgotPassword",element:<ForgotPassword/>},
	{path:"/profile",element:<Layout/>, children :[
		{ path: "", element: <Dashboard /> }
	]}
]);
