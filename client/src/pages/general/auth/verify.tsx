import { AnimatePresence, motion } from "framer-motion"
import { CheckCircleIcon, Loader2, XCircleIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { Axios } from "../../../api"
import type { IResponse } from "../../../../../types/response"
useParams
export const Verify = ( ) => {
	const location = useLocation()
	const navigate = useNavigate()
	const [verify,setVerify] = useState<IResponse<{} | undefined>>()
	const searchParams = new URLSearchParams(location.search)
	const token = searchParams.get("token")
	useEffect(() => {
		{/* Read token with URL */}
		console.log(token)
		if(!token) navigate("/signup")
		Axios
		.post<IResponse<{}>>("/user/verify",{token:token})
		.then(resposne => {
			console.log(resposne.data)
			setVerify(resposne.data)
			setTimeout(() => {
				navigate("/login")
			},2000)
		})
		.catch(error => {
			console.log(error.response.data)
			setVerify(error.response.data)
		})

		setVerify({error:null, message:"Loading..."})

	},[])
	const handleResend = () => {
		console.log("No Covering")
		{/* NO Covering */}
	}
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-[#060014] to-[#1a0125] text-white relative overflow-hidden">
			{/* Animated background gradient blobs */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#5813C1]/30 blur-[150px] rounded-full"></div>
			<div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[400px] h-[400px] bg-[#C45037]/30 blur-[150px] rounded-full"></div>

			{/* Content */}
			<AnimatePresence mode="wait">
				{verify === null && (
					<motion.div
						key="loading"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.4 }}
						className="flex flex-col items-center space-y-6"
					>
						<Loader2 className="w-16 h-16 text-purple-400 animate-spin" />
						<h1 className="text-2xl font-bold">Verifying your account...</h1>
						<p className="text-gray-400">Please wait a moment</p>
					</motion.div>
				)}

				{verify?.error === false && (
					<motion.div
						key="success"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.4 }}
						className="flex flex-col items-center space-y-6"
					>
						<CheckCircleIcon className="w-20 h-20 text-green-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]" />
						<h1 className="text-3xl font-bold bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
							Verification Successful
						</h1>
						<p className="text-gray-400 max-w-sm text-center">
							Your email has been successfully verified. You can now log in and start using QuizMaster!
						</p>
						
						<Link
							to="/login"
							className="z-10000"
						>
							<button
								className=" px-6 py-2 rounded-md bg-linear-to-r from-green-500 to-emerald-600 font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
								onClick={() => navigate("/login")}
							>
								Go to Login
							</button>
						</Link>

					</motion.div>
				)}

				{verify?.error === true && (
					<motion.div
						key="fail"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.4 }}
						className="flex flex-col items-center space-y-6"
					>
						<XCircleIcon className="w-20 h-20 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
						<h1 className="text-3xl font-bold bg-linear-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
							Verification Failed
						</h1>
						<p className="text-gray-400 max-w-sm text-center">
							{verify.message}
						</p>
						<div className="flex gap-10">
							<Link
								to="/login"
								className="z-10000"
							>
								<button
									className=" px-6 py-2 rounded-md bg-linear-to-r from-green-500 to-emerald-600 font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
									onClick={() => navigate("/login")}
								>
									Go to Login
								</button>
							</Link>
							<button
								className="z-10000 px-6 py-2 rounded-md bg-linear-to-r from-red-500 to-pink-600 font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
								onClick={handleResend}
							>
								Resend Email
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}