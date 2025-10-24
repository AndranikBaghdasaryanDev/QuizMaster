import { Link } from "react-router-dom"

export const Header = () => {
	return <header className="z-1000 fixed top-0 left-0 w-full h-16 bg-black border-b border-[#1a0125]">
		<nav className="mx-auto h-full flex justify-between items-center px-6 md:px-12">
			{/* === Left: Logo === */}
			<h1 className="text-2xl font-bold bg-linear-to-r from-[#5813C1] to-[#C45037] bg-clip-text text-transparent tracking-wide drop-shadow-[0_0_10px_rgba(196,80,55,0.5)]">
				QuizMaster
			</h1>

			{/* === Center: Navigation (hidden on small screens) === */}
			<ul className="hidden md:flex gap-7 text-sm font-medium text-white/90">
				<li className="hover:text-[#C45037] transition duration-300 cursor-pointer"><a href="#quiz">Quiz</a></li>
				<li className="hover:text-[#C45037] transition duration-300 cursor-pointer">
					<a href="#categoris">Categories</a>
				</li>
				<li className="hover:text-[#C45037] transition duration-300 cursor-pointer"><a href="#about">About</a></li>
				<li className="hover:text-[#C45037] transition duration-300 cursor-pointer">
					<a href="#footerSection">Contacts</a>
				</li>
			</ul>

			{/* === Right: Buttons (hidden on small screens) === */}
			<div className="hidden md:flex gap-4">
				<Link to="/login">
					<button className="px-5 py-2 rounded-md bg-white text-black font-semibold shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:bg-gray-100 transition duration-300 cursor-pointer">
						Log In
					</button>
				</Link>
				<Link to="/signup">
					<button className="px-5 py-2 rounded-md bg-linear-to-r from-[#5813C1] to-[#C45037] text-white font-semibold shadow-[0_0_15px_rgba(196,80,55,0.5)] hover:opacity-90 transition duration-300 cursor-pointer">
						Sign Up
					</button>
				</Link>
			</div>

			{/* === Mobile Menu Button === */}
			<div className="md:hidden relative">
				<input id="menu-toggle" type="checkbox" className="peer hidden" />
				<label
					htmlFor="menu-toggle"
					className="flex flex-col justify-center items-center w-8 h-8 cursor-pointer space-y-1.5"
				>
					<span className="block w-6 h-0.5 bg-white"></span>
					<span className="block w-6 h-0.5 bg-white"></span>
					<span className="block w-6 h-0.5 bg-white"></span>
				</label>

				{/* === Dropdown Menu === */}
				<div className="absolute right-0 mt-3 w-52 bg-[#0f0f0f] border border-[#1a0125] rounded-lg shadow-lg opacity-0 translate-y-2 scale-95 peer-checked:opacity-100 peer-checked:translate-y-0 peer-checked:scale-100 transition-all duration-300 origin-top-right z-9999">
					<ul className="flex flex-col text-white text-sm p-3 space-y-2">
						<li className="hover:text-[#C45037] transition cursor-pointer">
							<a href="#quiz">Quiz</a>
						</li>
						<li className="hover:text-[#C45037] transition cursor-pointer">
							<a href="#categoris">Categories</a>
						</li>
						<li className="hover:text-[#C45037] transition cursor-pointer">
							<a href="#about">About</a>
						</li>
						<li className="hover:text-[#C45037] transition cursor-pointer">
							<a href="#footerSection">Contacts</a>
						</li>
					</ul>
					<div className="flex flex-col p-3 gap-2 border-t border-[#1a0125]">
						<Link to="/login">
							<button className="w-full px-4 py-2 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition duration-300">
								Log In
							</button>
						</Link>
						<Link to="/signup">
							<button className="w-full px-4 py-2 rounded-md bg-linear-to-r from-[#5813C1] to-[#C45037] text-white font-semibold hover:opacity-90 transition duration-300">
								Sign Up
							</button>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	</header>

}