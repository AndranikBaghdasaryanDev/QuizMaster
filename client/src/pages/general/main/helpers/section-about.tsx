import { FaBrain, FaGift, FaUser, FaChartBar, FaTrophy, FaMobileAlt, FaRegStar } from "react-icons/fa"

export const SectionAbout = () => {
	const features = [
		{
			icon: <FaBrain className="text-purple-500 text-3xl" />,
			title: "Personalized Learning",
			desc: "Adaptive quizzes that adjust to your knowledge level and learning pace",
		},
		{
			icon: <FaGift className="text-red-500 text-3xl" />,
			title: "Reward System",
			desc: "Earn points, badges, and real rewards for your achievements",
		},
		{
			icon: <FaUser className="text-blue-500 text-3xl" />,
			title: "Teacher Dashboard",
			desc: "Comprehensive tools for educators to create and manage quizzes",
		},
		{
			icon: <FaChartBar className="text-green-500 text-3xl" />,
			title: "Progress Tracking",
			desc: "Track your learning journey and monitor performance over time",
		},
		{
			icon: <FaTrophy className="text-yellow-500 text-3xl" />,
			title: "Competitive Leaderboards",
			desc: "Compete with peers and climb the ranks in various categories",
		},
		{
			icon: <FaMobileAlt className="text-purple-500 text-3xl" />,
			title: "Mobile Friendly",
			desc: "Access quizzes anytime, anywhere on any device",
		},
	]

	return (
		<section id="about" className="bg-black text-white py-20 px-6 md:px-16" >
			{/* Header */}
			<div className="text-center mb-16">
				<div className="bg-black py-20 flex items-center justify-center">
					<div className="flex items-center gap-3 bg-[#1a1a1a] px-8 py-3 rounded-full shadow-md border border-[#242424]">
						<FaRegStar className="text-purple-500 text-2xl" />
						<span className="text-white text-xl font-medium">Features</span>
					</div>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-4">
					Why{" "}
					<span className="bg-linear-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
						Quizzy
					</span>
				</h2>
				<p className="text-gray-400 text-lg max-w-2xl mx-auto">
					Discover quizzes across various subjects to test and expand your knowledge
				</p>
			</div>

			{/* Feature Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
				{features.map((f, index) => (
					<div
						key={index}
						className="bg-[#121212] border border-gray-800 rounded-2xl p-6 flex flex-col gap-4 hover:translate-y-[-	6px] hover:border-gray-700 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
					>
						<div>{f.icon}</div>
						<div>
							<h3 className="text-lg font-semibold mb-1">{f.title}</h3>
							<p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
