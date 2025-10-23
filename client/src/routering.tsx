// src/router.js
import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/general/auth/signup";
import { Login } from "./pages/general/auth/login";
 
export const router = createBrowserRouter([
	{path:"/",children:[
		{ path:"signup",element:<SignUp/>},
		{ path: "login", element: <Login/> }

	]}
]);
