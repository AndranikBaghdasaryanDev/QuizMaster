import { Link } from "react-router-dom"

export const Mail = () => {
	return <>
		
		<header  className="z-1000 fixed top-0 left-0 w-full h-[64px] bg-black border-b border-[#1a0125]">
			<nav className=" mx-auto h-full flex justify-between items-center px-12">

				{/* Left: Logo */}
				<h1 className="text-2xl font-bold bg-linear-to-r from-[#5813C1] to-[#C45037] bg-clip-text text-transparent tracking-wide drop-shadow-[0_0_10px_rgba(196,80,55,0.5)]">
					QuizMaster
				</h1>

				{/* Center: Navigation */}
				<ul className="flex gap-7 text-sm font-medium text-white/90">
					<li className="hover:text-[#C45037] transition duration-300 cursor-pointer">Quiz</li>
					<li className="hover:text-[#C45037] transition duration-300 cursor-pointer"><a href="#categoris">Categories</a></li>
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
						<button className="px-5 py-2 rounded-md bg-linear-to-r from-[#5813C1] to-[#C45037] text-white font-semibold shadow-[0_0_15px_rgba(196,80,55,0.5)] hover:opacity-90 transition duration-300 cursor-pointer">
							Sign Up
						</button>
					</Link>
				</div>
			</nav>
		</header>



		<main className=" text-white font-sans">
			{/* === Section 1 === */}
			<section className="relative h-[700px] flex items-center justify-center text-center overflow-hidden">
				{/* Background image */}
				<img
					className="absolute inset-0 w-full h-full object-cover "
					src="../../../../images/section1-backgorund-Image.png"
					alt="Background Grid"
				/>

				{/* Overlay gradient for smooth fade */}
				<div className="absolute inset-0 bg-linear-to-r"></div>

				{/* Content */}
				<div className="relative z-10 max-w-3xl mx-auto px-6">
					{/* Tag */}
					<div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1 mb-6 backdrop-blur-md">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="url(#grad1)"
							className="w-4 h-4"
						>
							<defs>
								<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
									<stop offset="0%" stopColor="#5813C1" />
									<stop offset="100%" stopColor="#C45037" />
								</linearGradient>
							</defs>
							<path strokeLinecap="round" strokeLinejoin="round" d="M11.7 2.3l1.6 1.6-9.9 9.9 1.6 1.6 9.9-9.9 1.6 1.6 2.1-6.8-6.9 2z" />
						</svg>
						<span className="text-sm text-gray-300">The ultimate quiz experience</span>
					</div>

					{/* Title */}
					<h1 className="text-6xl font-extrabold leading-tight mb-6">
						Learn, Quiz,{" "}
						<span className="bg-linear-to-r from-[#5813C1] to-[#C45037] bg-clip-text text-transparent">
							Earn Rewards
						</span>
					</h1>

					{/* Subtitle */}
					<p className="text-gray-300 text-lg mb-10 leading-relaxed">
						Join thousands of students and teachers on the ultimate quiz platform.
						Test your knowledge, compete with peers, and win exciting rewards.
					</p>

					{/* Buttons */}
					<div className="flex justify-center gap-4 mb-10">
						<Link
							to="/signup"
						>
							<button className="px-6 py-3 rounded-md bg-linear-to-r from-[#5813C1] to-[#C45037] font-semibold shadow-[0_0_15px_rgba(196,80,55,0.5)] hover:opacity-90 transition duration-300 cursor-pointer">
								Get Started
							</button>
						</Link>
						<Link
							to="#categories"
						>
							<button className="px-6 py-3 rounded-md bg-white text-black font-semibold shadow hover:bg-gray-100 transition duration-300 cursor-pointer">
								Explore Quizzes
							</button>
						</Link>
					</div>

					{/* Avatars + Text */}
					<div className="flex justify-center items-center gap-3">
						<div className="flex -space-x-3">
							<img
								src="../../../../images/people/girl1.jpg"
								alt="student1"
								className="w-10 h-10 rounded-full border-2 border-black"
							/>
							<img
								src="../../../../images/people/girl2.jpeg"
								alt="student2"
								className="w-10 h-10 rounded-full border-2 border-black"
							/>
							<img
								src="../../../../images/people/girl3.jpeg"
								alt="student3"
								className="w-10 h-10 rounded-full border-2 border-black"
							/>
						</div>
						<p className="text-gray-400 text-sm">
							<span className="text-[#5813C1] font-semibold">5,000+</span> students joined this week
						</p>
					</div>
				</div>
			</section>

			{/* === Section 2–4 (placeholders) === */}
			<section id="#categories" className="min-h-screen bg-[#0b0b0f] text-white px-6 py-20">
				{/* Header */}
				<div className="text-center mb-16">
					<button className="bg-gray-800 text-gray-300 px-5 py-2 rounded-full text-sm mb-5 flex items-center mx-auto space-x-2 hover:bg-gray-700 transition">
						<span className="material-icons text-sm">view_module</span>
						<span>Categories</span>
					</button>
					<h1 className="text-5xl font-extrabold">
						Explore{" "}
						<span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
							Quiz Categories
						</span>
					</h1>
					<p className="text-gray-400 mt-4">
						Discover quizzes across various subjects to test and expand your knowledge
					</p>
				</div>

				{/* Categories Grid */}
				<div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 max-w-6xl mx-auto">
					{/* Card 1 */}
					<div className="bg-[#1a1a1e] border-t-4 border-blue-500 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-blue-500/20">
						<div className="flex items-center mb-4 space-x-3">
							<div className="bg-blue-600 p-3 rounded-full">
								<i className="fas fa-atom text-white text-xl"></i>
							</div>
							<h3 className="text-lg font-semibold">Science & Tech</h3>
						</div>
						<p className="text-gray-400 text-sm mb-4">
							Test your knowledge in science & tech with our challenging quizzes
						</p>
						<a
							href="#"
							className="text-blue-400 text-sm font-medium hover:underline flex items-center space-x-1"
						>
							<span>Explore Quizzes</span>
							<i className="fas fa-arrow-right text-xs"></i>
						</a>
					</div>

					{/* Card 2 */}
					<div className="bg-[#1a1a1e] border-t-4 border-green-500 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-green-500/20">
						<div className="flex items-center mb-4 space-x-3">
							<div className="bg-green-600 p-3 rounded-full">
								<i className="fas fa-square-root-alt text-white text-xl"></i>
							</div>
							<h3 className="text-lg font-semibold">Mathematics</h3>
						</div>
						<p className="text-gray-400 text-sm mb-4">
							Test your knowledge in mathematics with our challenging quizzes
						</p>
						<a
							href="#"
							className="text-green-400 text-sm font-medium hover:underline flex items-center space-x-1"
						>
							<span>Explore Quizzes</span>
							<i className="fas fa-arrow-right text-xs"></i>
						</a>
					</div>

					{/* Card 3 */}
					<div className="bg-[#1a1a1e] border-t-4 border-purple-500 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-purple-500/20">
						<div className="flex items-center mb-4 space-x-3">
							<div className="bg-purple-600 p-3 rounded-full">
								<i className="fas fa-flask text-white text-xl"></i>
							</div>
							<h3 className="text-lg font-semibold">Chemistry</h3>
						</div>
						<p className="text-gray-400 text-sm mb-4">
							Test your knowledge in chemistry with our challenging quizzes
						</p>
						<a
							href="#"
							className="text-purple-400 text-sm font-medium hover:underline flex items-center space-x-1"
						>
							<span>Explore Quizzes</span>
							<i className="fas fa-arrow-right text-xs"></i>
						</a>
					</div>

					{/* Card 4 */}
					<div className="bg-[#1a1a1e] border-t-4 border-pink-500 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-pink-500/20">
						<div className="flex items-center mb-4 space-x-3">
							<div className="bg-pink-600 p-3 rounded-full">
								<i className="fas fa-dna text-white text-xl"></i>
							</div>
							<h3 className="text-lg font-semibold">Biology</h3>
						</div>
						<p className="text-gray-400 text-sm mb-4">
							Test your knowledge in biology with our challenging quizzes
						</p>
						<a
							href="#"
							className="text-pink-400 text-sm font-medium hover:underline flex items-center space-x-1"
						>
							<span>Explore Quizzes</span>
							<i className="fas fa-arrow-right text-xs"></i>
						</a>
					</div>

					{/* Card 5 */}
					<div className="bg-[#1a1a1e] border-t-4 border-yellow-500 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-yellow-500/20">
						<div className="flex items-center mb-4 space-x-3">
							<div className="bg-yellow-600 p-3 rounded-full">
								<i className="fas fa-globe text-white text-xl"></i>
							</div>
							<h3 className="text-lg font-semibold">General Knowledge</h3>
						</div>
						<p className="text-gray-400 text-sm mb-4">
							Test your knowledge in general knowledge with our challenging quizzes
						</p>
						<a
							href="#"
							className="text-yellow-400 text-sm font-medium hover:underline flex items-center space-x-1"
						>
							<span>Explore Quizzes</span>
							<i className="fas fa-arrow-right text-xs"></i>
						</a>
					</div>

					{/* Card 6 */}
					<div className="bg-[#1a1a1e] border-t-4 border-red-500 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-red-500/20">
						<div className="flex items-center mb-4 space-x-3">
							<div className="bg-red-600 p-3 rounded-full">
								<i className="fas fa-newspaper text-white text-xl"></i>
							</div>
							<h3 className="text-lg font-semibold">Current Affairs</h3>
						</div>
						<p className="text-gray-400 text-sm mb-4">
							Test your knowledge in current affairs with our challenging quizzes
						</p>
						<a
							href="#"
							className="text-red-400 text-sm font-medium hover:underline flex items-center space-x-1"
						>
							<span>Explore Quizzes</span>
							<i className="fas fa-arrow-right text-xs"></i>
						</a>
					</div>
				</div>
			</section>

			<section></section>
			<section></section>
		</main>

		<footer className="w-full bg-black border-t border-[#2A2A2A] pt-16 pb-8 text-gray-300">
			<section id="footerSection">
				<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-10">

					{/* === Column 1 === */}
					<div>
						<h2 className="text-2xl font-bold bg-linear-to-r from-[#5813C1] to-[#C45037] bg-clip-text text-transparent tracking-wide mb-3">
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