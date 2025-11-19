import { Link } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import { Axios } from "../../../api";

export const OAuthFail = () => {

	const handleRetry = () => {
		const apiUrl = Axios.defaults.baseURL || "http://localhost:4002";
		window.location.href = `${apiUrl}/auth/google`;
	};

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

			{/* Right Side: Error Message */}
			<div className="md:flex-1 flex items-center justify-center bg-white px-4 py-8">
				<div className="w-full max-w-md p-6 rounded-lg shadow-lg">
					{/* Error Icon */}
					<div className="flex justify-center mb-4">
						<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
							<FaExclamationTriangle className="w-8 h-8 text-red-600" />
						</div>
					</div>

					<h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
						Authentication Failed
					</h2>
					<p className="text-gray-500 text-sm mb-6 text-center">
						We couldn't complete your Google sign-in. This might be due to:
					</p>

					{/* Error Reasons */}
					<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
						<ul className="text-sm text-gray-700 space-y-2">
							<li className="flex items-start">
								<span className="text-red-600 mr-2">•</span>
								<span>You denied access to your Google account</span>
							</li>
							<li className="flex items-start">
								<span className="text-red-600 mr-2">•</span>
								<span>Your session expired or was interrupted</span>
							</li>
							<li className="flex items-start">
								<span className="text-red-600 mr-2">•</span>
								<span>A temporary error occurred</span>
							</li>
						</ul>
					</div>

					{/* Action Buttons */}
					<div className="space-y-3">
						<button
							onClick={handleRetry}
							className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition cursor-pointer"
						>
							Try Again with Google
						</button>

						<Link
							to="/login"
							className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition cursor-pointer flex items-center justify-center gap-2"
						>
							<FaArrowLeft className="w-4 h-4" />
							Back to Login
						</Link>
					</div>

					{/* Help Text */}
					<p className="text-center text-xs text-gray-400 mt-6">
						Need help?{" "}
						<Link to="/login" className="text-purple-600 hover:text-purple-700 underline">
							Contact Support
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

