
import { Link } from "react-router-dom";
import type { ISignUp } from "../../../../../types/user"
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaLock, } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

export const Login = () => {
	const { register, handleSubmit, formState: { errors } } = useForm<ISignUp>()
	const handleSignIn = (data: ISignUp) => {
		//Axios request in backend api 
		console.log(data)
	}
	return (
		<div className="flex flex-col md:flex-row min-h-screen">

			{/* Left Side: Background + Logo */}
			<div className="md:flex-1 bg-linear-to-b from-black to-gray-900 flex items-center justify-center relative overflow-hidden h-64 md:h-auto">
				<div className="absolute inset-0">
					<img
						className="w-full h-full object-cover"
						src="../../../images/signup-background-image.png"
						alt="Sign Up Background"
					/>
				</div>
				<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold z-10 bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center px-4">
					QuizMaster
				</h1>
			</div>

			{/* Right Side: Form */}
			<div className="md:flex-1 flex items-center justify-center bg-white px-4 py-8">
				<div className="w-full max-w-md p-6 rounded-lg shadow-lg">
					<h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">Welcome Back</h2>
					<p className="text-gray-500 text-sm mb-4 text-center">
						Choose your account type and start your journey with us
					</p>

					{/* Social Login */}
					<div className="flex flex-col sm:flex-row justify-center mb-4 gap-2">
						<button className="flex-1 border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition">
							<img
								src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
								className="w-5 h-5"
								alt="Google"
							/>
							Google
						</button>
					</div>

					{/* Divider */}
					<div className="flex items-center justify-center text-gray-400 text-sm mb-4">
						<span className="border-t w-1/3"></span>
						<span className="px-2">OR</span>
						<span className="border-t w-1/3"></span>
					</div>

					{/* Name & Username */}
					<form onSubmit={handleSubmit(handleSignIn)}>
						{/* Email */}
						<div className="relative mb-3">
							{errors.email && (
								<div className="flex items-start bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded-lg shadow-md animate-slide-fade max-w-md">
									<span className="mr-3 text-xl animate-pulse">⚠️</span>
									<div className="flex-1">
										<p className="font-semibold">{errors.email.message}</p>
										<p className="text-xs mt-1 text-red-600">Please correct this error to continue</p>
									</div>
								</div>
							)}




							<div className="relative">
								<FaEnvelope className="absolute left-3 top-11 text-gray-400" />
								<label className="block mt-2 py-1">Email</label>
								<input
									type="email"
									placeholder="name@example.com"
									className={`border border-gray-300 rounded-md px-10 py-2  placeholder-gray-400  w-full ${errors.email ? "outline-red-500" : "focus:outline-purple-500"}`}
									{...register("email", { required: "Please input your Email" })}

								/>
							</div>
						</div>

						{/* Password */}
						<div className="mb-5">
							{errors.password && (
								<div className="flex items-start bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded-lg shadow-md animate-slide-fade max-w-md">
									<span className="mr-3 text-xl animate-pulse">⚠️</span>
									<div className="flex-1">
										<p className="font-semibold">{errors.password.message}</p>
										<p className="text-xs mt-1 text-red-600">Please correct this error to continue</p>
									</div>
								</div>
							)}
							<div className="relative">
								<FaLock className="absolute left-3 top-11 text-gray-400" />
								<label className="block mt-2 py-1">Password</label>
								<input
									type="password"
									placeholder="*************"
									className={`border border-gray-300 rounded-md px-10 py-2  placeholder-gray-400  w-full ${errors.password ? "outline-red-500" : "focus:outline-purple-500"}`}
									{...register("password", { required: "Please input your Password" })}
								/>
							</div>
						</div>

						{/* Submit Button */}
						<button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition">
							Sign Up
						</button>
					</form>

					{/* Footer */}
					<p className="text-center text-sm text-gray-500 mt-3">
						Already have an account?{" "}
						<Link to={"/signup"} className="text-purple-600 font-medium hover:underline">
							Sign Up
						</Link>
					</p>
				</div>
			</div>
			<div className="absolute right-0 top-0">
				<Link
					to="/"
				>
					<FaArrowLeft
						className=" mr-15 mt-10 text-gray-500 text-shadow-black text-3xl z-100 from-[#5813C1] to-[#C45037] bg-clip-text transition-transform duration-300 group-hover:-translate-x-1 drop-shadow-[0_0_8px_rgba(196,80,55,0.5)] cursor-pointer"
					/>
				</Link>
			</div>
		</div>
	);
};
