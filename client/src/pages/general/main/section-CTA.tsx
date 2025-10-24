import { Link } from "react-router-dom"

export const SectionCTA = () => {
	return <section className="flex justify-center items-center bg-black py-20 px-6">
		<div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center gap-10 bg-linear-to-r from-[#6B21A8] via-[#9333EA] to-[#C2410C] rounded-3xl p-10 md:p-14 shadow-xl">

			{/* === Left Text Content === */}
			<div className="flex-1 text-white space-y-4">
				<h2 className="text-3xl md:text-4xl font-bold leading-snug">
					Ready to Start Your <br />
					<span className="text-white/90">Quiz Journey?</span>
				</h2>
				<p className="text-gray-200/90 max-w-md leading-relaxed">
					Join thousands of students and teachers. Sign up today and get access to all features.
				</p>

				{/* Buttons */}
				<div className="flex flex-wrap gap-4 pt-3">
					<Link
						to="/signup"
					>
						<button className="px-5 py-2.5 bg-white text-black font-semibold rounded-md shadow-md hover:shadow-white/20 hover:scale-[1.05] transition-all duration-300">
							Create Account
						</button>
					</Link>
					<Link
						to="/login"
					>
						<button className="px-5 py-2.5 border border-white text-white font-semibold rounded-md hover:bg-white/10 hover:scale-[1.05] transition-all duration-300">
							Log in
							
						</button>
					</Link>
				</div>
			</div>

			{/* === Right Illustration Box === */}
			<div className="flex-1 flex justify-center md:justify-end">
				<div className="bg-white rounded-2xl w-[280px] h-[180px] md:w-[340px] md:h-[220px] shadow-lg">
					<p className="text-center text-black">Take This image after</p>
				</div>
			</div>
		</div>
	</section>

}