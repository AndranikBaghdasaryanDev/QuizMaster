
import { Link } from "react-router-dom";
import type {ISignUp} from "../../../../../types/user"
import { useForm } from "react-hook-form";
export const SignUp = () => {
	const {register,handleSubmit,formState:{errors}} = useForm<ISignUp>()
	return (
		<div className="flex flex-col md:flex-row min-h-screen">

			{/* Left Side: Background + Logo */}
			<div className="md:flex-1 bg-gradient-to-b from-black to-gray-900 flex items-center justify-center relative overflow-hidden h-64 md:h-auto">
				<div className="absolute inset-0">
					<img
						className="w-full h-full object-cover"
						src="../../../images/signup-background-image.png"
						alt="Sign Up Background"
					/>
				</div>
				<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold z-10 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center px-4">
					QuizzMaster
				</h1>
			</div>

			{/* Right Side: Form */}
			<div className="md:flex-1 flex items-center justify-center bg-white px-4 py-8">
				<div className="w-full max-w-md p-6 rounded-lg shadow-lg">
					<h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">Create Account</h2>
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
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
						<div>
							{errors.name && (
								<p className="flex items-center text-red-600 text-sm mt-1">
									<span className="mr-1">⚠️</span>
									{errors.name.message}
								</p>
							)}

							<label className="block mt-2 py-1">Full Name</label>
							<input
							
								type="text"
								placeholder="John Doe"
								className="border border-gray-300 rounded-md px-3 py-2 opacity-70 w-full focus:outline-purple-500"
								{...register("name",{required:"Please input your Name"})}
							/>
						</div>
						<div>
							{errors.username && (
								<p className="flex items-center text-red-600 text-sm mt-1">
									<span className="mr-1">⚠️</span>
									{errors.username.message}
								</p>
							)}

							<label className="block mt-2 py-1">Username</label>
							<input
								type="text"
								placeholder="JohnDoe123"
								className="border border-gray-300 rounded-md px-3 py-2 opacity-70 w-full focus:outline-purple-500"
								{...register("username", { required: "Please input your UserName" })}

							/>
						</div>
					</div>

					{/* Email */}
					<div className="relative mb-3">
						{errors.email && (
							<p className="flex items-center text-red-600 text-sm mt-1">
								<span className="mr-1">⚠️</span>
								{errors.email.message}
							</p>
						)}

						<label className="block mt-2 py-1">Email</label>
						<input
							type="email"
							placeholder="name@example.com"
							className="border border-gray-300 rounded-md px-3 py-2 opacity-70 w-full focus:outline-purple-500"
							{...register("email", { required: "Please input your Email" })}

						/>
					</div>

					{/* Password */}
					<div className="mb-5">
						<label className="block mt-2 py-1">Password</label>
						<input
							type="password"
							placeholder="*************"
							className="border border-gray-300 rounded-md px-3 py-2 opacity-70 w-full focus:outline-purple-500"
							{...register("password", { required: "Please input your Password" })}
						/>
					</div>

					{/* Submit Button */}
					<button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition">
						Sign Up
					</button>

					{/* Footer */}
					<p className="text-center text-sm text-gray-500 mt-3">
						Already have an account?{" "}
						<Link to={"/auth/signin"} className="text-purple-600 font-medium hover:underline">
							Sign In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
