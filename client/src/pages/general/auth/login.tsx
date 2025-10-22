
import { Link } from "react-router-dom";

export const Login = () => {
	return (
		<div className="flex min-h-screen">

			{/* Left Side: Background + Logo */}
			<div className="flex-1 bg-gradient-to-b from-black to-gray-900 flex items-center justify-center relative overflow-hidden">
				<div className="absolute inset-0">
					<img
						className="w-full h-full object-cover"
						src="../../../images/signup-background-image.png"
						alt="Sign Up Background"
					/>
				</div>
				<h1 className="text-6xl font-bold z-10 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
					QuizzMaster
				</h1>
			</div>

			{/* Right Side: Form */}
			<div className="flex-1 flex items-center justify-center bg-white">
				<div className="w-[500px] p-6 rounded-lg shadow-lg">
					<h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome back</h2>
					<p className="text-gray-500 text-sm mb-4">
						Enter your credentials to access your account
					</p>

					{/* Social Login */}
					<div className="flex justify-center mb-4 gap-2">
						<button className="w-[48%] border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition">
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
					<div className="grid grid-cols-2 gap-3 mb-3">
						<div>
							<label className="block mt-2 py-3">Full Name</label>
							<input
								type="text"
								placeholder="John Doe"
								className="border border-gray-300 rounded-md px-3 py-2 opacity-70 w-full focus:outline-purple-500 "
							/>
						</div>
						<div>

							<label className="block mt-2 py-3">Username</label>
							<input
								type="text"
								placeholder="John Doe"
								className="border border-gray-300 rounded-md px-3 py-2 opacity-70 w-full focus:outline-purple-500"
							/>
						</div>
					</div>

					{/* Email */}
					<div className="relative mb-3">
						<label className="block mt-2 py-3">Email</label>
						<input
							type="email"
							placeholder="name@example.com"
							className=" border border-gray-300 rounded-md px-3 py-2 opacity-70 w-full focus:outline-purple-500"
						/>

					</div>

					{/* Password */}
					<div className="mb-5">
						<label className="block mt-2 py-3">Password</label>
						<input
							type="password"
							placeholder="*************"
							className="border border-gray-300 rounded-md px-3 py-2 opacity-70 w-full focus:outline-purple-500"
						/>
					</div>

					{/* Submit Button */}
					<button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition">
						Sign Up
					</button>

					{/* Footer */}
					<p className="text-center text-sm text-gray-500 mt-3">
						Already have an account?{" "}
						<Link to={"/auth/signin"} className="text-purple-600 font-medium hover:underline">Sign In</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
