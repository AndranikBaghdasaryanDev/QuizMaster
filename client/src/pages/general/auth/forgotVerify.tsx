import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import type { IResponse } from "../../../../../types/response"
import { Axios } from "../../../api"
import { useForm } from "react-hook-form"
import { FaArrowLeft, FaLock } from "react-icons/fa"

export const ForgotVerify = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const searchParams = new URLSearchParams(location.search)
	const token = searchParams.get("token")
	const [error, setError] = useState<IResponse<{} | undefined>>()
	const { register, handleSubmit, formState: { errors } } = useForm<{ password: string }>()
	useEffect(() => {
		if (!token) navigate("/forgotPassword")
	})
	const handleForgot = (data: { password: string }) => {
		console.log({ ...data, token: token })
		Axios
			.post("/user/reset", { ...data, token: token })
			.then(resposne => {
				setError(resposne.data)
				setTimeout(() => {
					navigate("/login")
				}, 4000)
			})
			.catch(error => {
				setError(error.response.data)
			})
		setError({ error: null, message: "Changing..." })
	}
	return <>
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
					<h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">Change Password</h2>

					{error && (
						<div className="mb-6">
							{error.error === null ? (
								// 🔵 Loading state
								<div className="flex items-center justify-center gap-3 bg-linear-to-r from-purple-700 via-fuchsia-600 to-pink-500 text-white font-medium py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(216,70,239,0.5)] animate-pulse">
									<svg
										className="w-5 h-5 animate-spin text-white/90"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8v8H4z"
										></path>
									</svg>
									<p className="text-sm tracking-wide">{error.message}</p>
								</div>
							) : error.error ? (
								// 🔴 Error message
								<div className="flex items-center gap-3 bg-linear-to-r from-red-900/70 via-red-800/60 to-red-700/70 border border-red-500/60 text-red-300 py-3 px-5 rounded-xl shadow-[0_0_15px_rgba(255,0,0,0.3)] backdrop-blur-md animate-fade-in">
									<span className="text-2xl animate-bounce">❌</span>
									<div>
										<p className="font-semibold text-red-300">{error.message}</p>
										<p className="text-xs text-red-400 mt-1">Please check your input and try again.</p>
									</div>
								</div>
							) : (
								// 🟢 Success message
								<div className="flex items-center gap-3 bg-linear-to-r from-emerald-900/70 via-green-800/60 to-teal-700/70 border border-green-500/60 text-green-300 py-3 px-5 rounded-xl shadow-[0_0_15px_rgba(0,255,120,0.4)] backdrop-blur-md animate-fade-in">
									<span className="text-2xl animate-bounce">✅</span>
									<div>
										<p className="font-semibold">{error.message}</p>
										<p className="text-xs text-green-400 mt-1">Redirecting you shortly...</p>
									</div>
								</div>
							)}
						</div>
					)}

					{/* Name & Username */}
					<form onSubmit={handleSubmit(handleForgot)}>

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
						<button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition cursor-pointer">
							Log in
						</button>
						<p className="text-center text-sm text-gray-500 mt-3">
							Already have an account?{" "}
							<Link to={"/login"} className="text-purple-600 font-medium hover:underline">
								Log In
							</Link>
						</p>
						{/* Submit Button */}
					</form>
				</div>

			</div>
			<div className="absolute right-0 top-0">
				<Link
					to="/forgotPassword"
				>
					<FaArrowLeft
						className=" mr-15 mt-10 text-gray-500 text-shadow-black text-3xl z-100 from-[#5813C1] to-[#C45037] bg-clip-text transition-transform duration-300 group-hover:-translate-x-1 drop-shadow-[0_0_8px_rgba(196,80,55,0.5)] cursor-pointer"
					/>
				</Link>
			</div>
		</div>
	</>
}