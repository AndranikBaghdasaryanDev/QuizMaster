import { Link } from "react-router-dom"

export const Mail = () => {
	return <>
		
		<header  className="fixed top-0 left-0 w-full h-[64px] bg-black border-b border-[#1a0125]">
			<nav className=" mx-auto h-full flex justify-between items-center px-12">

				{/* Left: Logo */}
				<h1 className="text-2xl font-bold bg-gradient-to-r from-[#5813C1] to-[#C45037] bg-clip-text text-transparent tracking-wide drop-shadow-[0_0_10px_rgba(196,80,55,0.5)]">
					QuizMaster
				</h1>

				{/* Center: Navigation */}
				<ul className="flex gap-7 text-sm font-medium text-white/90">
					<li className="hover:text-[#C45037] transition duration-300 cursor-pointer">Quiz</li>
					<li className="hover:text-[#C45037] transition duration-300 cursor-pointer">Categories</li>
					<li className="hover:text-[#C45037] transition duration-300 cursor-pointer">About</li>
					<li className="hover:text-[#C45037] transition duration-300 cursor-pointer"><a href="#footerSection">Contacts</a></li>

				</ul>

				{/* Right: Buttons */}
				<div className="flex gap-4">
					<Link
						to="/login"
					>
						<button className="px-5 py-2 rounded-md bg-white text-black font-semibold shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:bg-gray-100 transition duration-300 cursor-pointer">
							Log In
						</button>
					</Link>
					<Link
						to="/signup"
					>
						<button className="px-5 py-2 rounded-md bg-gradient-to-r from-[#5813C1] to-[#C45037] text-white font-semibold shadow-[0_0_15px_rgba(196,80,55,0.5)] hover:opacity-90 transition duration-300 cursor-pointer">
							Sign Up
						</button>
					</Link>
				</div>
			</nav>
		</header>



		<main className="bg-black h-[2500px]">
			<section></section>{/* Section 1*/ }
			<section></section>{/* Section 2*/}
			<section></section>{/* Section 3*/}
			<section></section>{/* Section 4*/}
		</main>

		<footer className="w-full bg-black border-t border-[#2A2A2A] pt-16 pb-8 text-gray-300">
			<section id="footerSection">
				<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-10">

					{/* === Column 1 === */}
					<div>
						<h2 className="text-2xl font-bold bg-gradient-to-r from-[#5813C1] to-[#C45037] bg-clip-text text-transparent tracking-wide mb-3">
							QuizMaster
						</h2>

						<p className="text-sm text-white leading-relaxed mb-6">
							The ultimate quiz platform for students and teachers. Learn, compete, and earn rewards.
						</p>
						<div className="flex gap-4">
							<Link to="https://facebook.com" className="hover:opacity-80 transition cursor-pointer">
								<img src="../../../../images/Icons/facebook.png" alt="facebook" className="w-5 h-5" />
							</Link>
							<Link to="https://twitter.com" className="hover:opacity-80 transition cursor-pointer">
								<img src="../../../../images/Icons/twitter.png" alt="twitter" className="w-5 h-5" />
							</Link>
							<Link to="https://instagram.com" className="hover:opacity-80 transition cursor-pointer">
								<img src="../../../../images/Icons/instagram.png" alt="instagram" className="w-5 h-5" />
							</Link>
							<Link to="https://linkedin.com" className="hover:opacity-80 transition cursor-pointer">
								<img src="../../../../images/Icons/linkedin.png" alt="linkedin" className="w-5 h-5" />
							</Link>
							<Link to="https://youtube.com" className="hover:opacity-80 transition cursor-pointer">
								<img src="../../../../images/Icons/youtube.png" alt="youtube" className="w-5 h-5" />
							</Link>
						</div>
					</div>

					{/* === Column 2 === */}
					<div>
						<p className="font-semibold text-[#CCCCCC] mb-4">Quick Links</p>
						<ul className="space-y-2 text-sm text-[#A1A1AA]">
							<li className="hover:text-[#C45037] hover:cursor-pointer transition">Home</li>
							<li className="hover:text-[#C45037] hover:cursor-pointer transition">About Us</li>
							<li className="hover:text-[#C45037] hover:cursor-pointer transition">Features</li>
							<li className="hover:text-[#C45037] hover:cursor-pointer transition">Pricing</li>
							<li className="hover:text-[#C45037] hover:cursor-pointer transition">Contact</li>
						</ul>
					</div>

					{/* === Column 3 === */}
					<div>
						<p className="font-semibold text-[#CCCCCC] mb-4">For Teachers</p>
						<ul className="space-y-2 text-sm text-[#A1A1AA]">
							<li className="hover:text-[#C45037] hover:cursor-pointer transition">About</li>
							<li className="hover:text-[#C45037] hover:cursor-pointer transition">Contact Us</li>
							<li className="hover:text-[#C45037] hover:cursor-pointer transition">Careers</li>
							<li className="hover:text-[#C45037] hover:cursor-pointer transition">Culture</li>
							<li className="hover:text-[#C45037] hover:cursor-pointer transition">Blog</li>
						</ul>
					</div>

					{/* === Column 4 === */}
					<div>
						<p className="font-semibold text-[#CCCCCC] mb-4">Contacts</p>
						<ul className="space-y-3 text-sm text-white">
							<li className="flex items-center gap-2 hover:cursor-pointer hover:text-[#C45037] transition">
								<img src="../../../../images/Icons/email.png" alt="email" className="w-5 h-5" />
								quizzmasterofficial@gmail.com
							</li>
							<li className="flex items-center gap-2 hover:cursor-pointer hover:text-[#C45037] transition">
								<img src="../../../../images/Icons/phone.png" alt="phone" className="w-5 h-5" />
								+374 10 48-48-48
							</li>
							<li className="flex items-start gap-2 hover:cursor-pointer hover:text-[#C45037] transition">
								<img src="../../../../images/Icons/location.png" alt="location" className="w-5 h-5 mt-1" />
								<span>Picsart Academy<br />Yerevan</span>
							</li>
						</ul>
					</div>

				</div>

				{/* === Footer Bottom === */}
				<div className="border-t border-[#2A2A2A] mt-12 pt-6 flex flex-col md:flex-row justify-between items-center px-10 text-sm text-white	">
					<p>Copyright © 2025 PicsartAcademy Students</p>
					<p>
						All Rights Reserved |{" "}
						<a className="text-[#5813C1] hover:text-[#C45037] transition hover:cursor-pointer">Terms and Conditions</a> |{" "}
						<a className="text-[#5813C1] hover:text-[#C45037] transition hover:cursor-pointer">Privacy Policy</a>
					</p>
				</div>
	
			</section>		
		</footer>

	</>
}