import { FaBookOpen } from "react-icons/fa"

export const SectionCategories = () => {
	return <section id="categoris" className="min-h-screen bg-[#0b0b0f] text-white px-6 py-20">
		{/* Header */}
		<div className="text-center mb-16">
			<div className="bg-[#0d0d0f] py-20 flex items-center justify-center">
				<div className="flex items-center gap-3 bg-[#1a1a1a] px-8 py-3 rounded-full shadow-md border border-[#242424]">
					<FaBookOpen className="text-purple-500 text-2xl" />
					<span className="text-white text-xl font-medium">Categories</span>
				</div>
			</div>
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
}