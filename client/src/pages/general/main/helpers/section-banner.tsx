import { Link } from "react-router-dom"

export const SectionBanner = () => {
	return <section id="quiz" className="relative h-[700px] flex items-center justify-center text-center overflow-hidden">
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
			<div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#242424] rounded-full px-5 py-2 backdrop-blur-md">
				{/* Gradient Star Icon */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					strokeWidth={2}
					stroke="url(#grad1)"
					className="w-10 h-10"
					style={{ paddingTop: "10px" }}

				>
					<defs>
						<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="#8B5CF6" /> {/* Purple-500 */}
							<stop offset="100%" stopColor="#A855F7" /> {/* Purple-400 */}
						</linearGradient>
					</defs>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 2l1.4 3.6L17 7l-3 2.6.9 3.8L12 11.8l-2.9 1.6.9-3.8L7 7l3.6-1.4L12 2z"
					/>
				</svg>

				{/* Text */}
				<span className="text-sm text-gray-200 font-medium">
					The ultimate quiz experience
				</span>
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

}