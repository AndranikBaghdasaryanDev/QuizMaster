export const Loader = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-[#0a0016] via-[#120022] to-[#1a0125] text-white relative overflow-hidden">
			{/* Animated glowing ring */}
			<div className="relative w-24 h-24 mb-8">
				<div className="absolute inset-0 rounded-full border-4 border-transparent border-t-fuchsia-500 animate-spin"></div>
				<div className="absolute inset-2 rounded-full border-4 border-transparent border-t-purple-500 animate-[spin_3s_linear_infinite_reverse]"></div>
				<div className="absolute inset-0 blur-lg rounded-full bg-linear-to-r from-fuchsia-500 to-purple-500 opacity-30 animate-pulse"></div>
			</div>

			{/* Glowing text */}
			<h1 className="text-3xl sm:text-4xl font-bold tracking-wide bg-linear-to-r from-purple-400 via-pink-400 to-fuchsia-500 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_15px_rgba(255,0,150,0.4)]">
				QuizMaster
			</h1>

			{/* Animated subtext */}
			<p className="mt-3 text-sm sm:text-base text-gray-300 animate-fade-in">
				Loading your universe of quizzes...
			</p>

			{/* Floating gradient orbs */}
			<div className="absolute -top-24 -left-20 w-72 h-72 bg-fuchsia-600 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
			<div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-700 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
		</div>
	)
}