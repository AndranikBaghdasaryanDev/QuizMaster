// src/router.js
import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/general/auth/signup";
import { Login } from "./pages/general/auth/login";
import { Mail } from "./pages/general/main/main";
import { Verify } from "./pages/general/auth/verify";
import { ForgotPassword } from "./pages/general/auth/forgotPassword";
import { ForgotVerify } from "./pages/general/auth/forgotVerify";
import { OAuthSuccess } from "./pages/general/auth/oauthSuccess";
import { Layout } from "./pages/general/profileUser/layout";
import { Dashboard } from "./pages/general/profileUser/pagesUser/dashboard";
import { Quizes } from "./pages/general/profileUser/pagesUser/quizes";
import { PassQuiz } from "./pages/general/profileUser/pagesUser/passQuiz";
 
export const router = createBrowserRouter([
	{path:"",element:<Mail/> },
	{ path:"/signup",element:<SignUp/>},
	{ path: "/login", element: <Login/> },
	{path:"/verify",element:<Verify/>},
	{path:"/forgot",element:<ForgotVerify/>},
	{path:"/forgotPassword",element:<ForgotPassword/>},
	{path:"/auth/success",element:<OAuthSuccess/>},
	{path:"/profile",element:<Layout/>, children :[
		{ path: "", element: <Dashboard /> },
		{ path: "quizes", element: <Quizes />}
	]},
	{path:"/pass/quiz/:id", element:<PassQuiz/>}
]);
