import { Link } from "react-router-dom"


export const Mail = () => {
	return <>
		
		<header className="w-full h-[64px] bg-black border-b border-[#1a0125]">
			<nav className=" mx-auto h-full flex justify-between items-center px-12">

				{/* Left: Logo */}
				<h1 className="text-2xl font-bold bg-gradient-to-r from-[#5813C1] to-[#C45037] bg-clip-text text-transparent tracking-wide drop-shadow-[0_0_10px_rgba(196,80,55,0.5)]">
					QuizMaster
				</h1>

				{/* Center: Navigation */}
				<ul className="flex gap-7 text-sm font-medium text-white/90">
					<li className="hover:text-[#C45037] transition duration-300">Quiz</li>
					<li className="hover:text-[#C45037] transition duration-300">Categories</li>
					<li className="hover:text-[#C45037] transition duration-300">About</li>
				</ul>

				{/* Right: Buttons */}
				<div className="flex gap-4">
					<Link
						to="/login"
					>
						<button className="px-5 py-2 rounded-md bg-white text-black font-semibold shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:bg-gray-100 transition duration-300 cursor-pointer">
							Sign In
						</button>
					</Link>
					<Link
						to="/signup"
					>
						<button className="px-5 py-2 rounded-md bg-gradient-to-r from-[#5813C1] to-[#C45037] text-white font-semibold shadow-[0_0_15px_rgba(196,80,55,0.5)] hover:opacity-90 transition duration-300 cursor-pointer">
							Register
						</button>
					</Link>
				</div>
			</nav>
		</header>



		<main>
			<section></section>{/* Section 1*/ }
			<section></section>{/* Section 2*/}
			<section></section>{/* Section 3*/}
			<section></section>{/* Section 4*/}
		</main>
	</>
}