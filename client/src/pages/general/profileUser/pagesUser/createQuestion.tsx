import { X, ChevronDown, Trash2, Plus, ChevronLeft } from "lucide-react"

import type {  ICraeteQuestion } from "../../../../../../types/quiz"

export const CreateQuestion = ({setNextActive,setActive} : ICraeteQuestion) => {

	return (
		<div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-9999 flex justify-center items-center">
			{/* === Modal Container === */}
			<div className="relative w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-5xl bg-[#141419] rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(123,63,228,0.4)] text-white p-8 overflow-y-auto max-h-[90vh]">
				{/* === Header === */}
				<div className="flex justify-between items-center mb-10 bg-[#141419] pb-2 z-10">
					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={() => setActive(false)}
							className="p-2 rounded-lg hover:bg-[#1e1c25] transition"
						>
							<X className="w-5 h-5 text-gray-400" />
						</button>
						<div>
							<h1 className="text-2xl font-semibold">Create New Quiz</h1>
							<p className="text-sm text-gray-400">
								Add questions, set answers and configure quiz settings
							</p>
						</div>
					</div>
				</div>

				{/* === Quiz Questions Section === */}
				<div className="bg-[#111016] rounded-2xl border border-[#1e1c25] p-8">
					<h2 className="text-lg font-semibold mb-1">Quiz Questions</h2>
					<p className="text-sm text-gray-400 mb-6">
						Create and manage your quiz questions
					</p>

					{/* === Question Card === */}
					<div className="rounded-xl border border-[#1e1c25] bg-[#0f0e13] p-6">
						{/* Header */}
						<div className="flex justify-between items-center mb-5">
							<h3 className="font-semibold text-lg">Question 1</h3>

							<div className="flex items-center gap-3">
								{/* Points */}
								<div className="flex items-center gap-2">
									<label className="text-sm text-gray-400">Points:</label>
									<div className="w-16 h-[34px] bg-[#14141c] border border-[#2a2a35] rounded-md text-center text-white text-sm flex items-center justify-center">
										10
									</div>
								</div>

								{/* Type */}
								<div className="flex items-center gap-1 bg-[#14141c] border border-[#2a2a35] rounded-md px-3 py-1 text-sm text-gray-300">
									<span>Multiple Choice</span>
									<ChevronDown className="w-4 h-4 ml-1" />
								</div>

								{/* Delete */}
								<button className="p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-[#1a1a20] transition">
									<Trash2 className="w-5 h-5" />
								</button>
							</div>
						</div>

						{/* Question Text */}
						<div className="mb-6">
							<label className="text-sm text-gray-400 mb-1 block">
								Question Text
							</label>
							<div className="w-full bg-[#14141c] border border-[#2a2a35] rounded-md px-3 py-3 text-sm text-gray-200">
								Which of the following is NOT a renewable energy source?
							</div>
						</div>

						{/* Answer Options */}
						<div>
							<h4 className="text-sm text-gray-400 mb-2">Answer Options</h4>
							<div className="flex flex-col gap-3">
								{[
									"Solar Power",
									"Wind Power",
									"Natural Gas",
									"Hydroelectric Power",
								].map((opt, i) => (
									<label
										key={i}
										className="flex items-center gap-3 bg-[#14141c] border border-[#2a2a35] rounded-md px-4 py-3 cursor-pointer hover:border-[#8b5cf6]/60 transition"
									>
										<div
											className={`w-4 h-4 border-2 border-[#8b5cf6] rounded-full ${opt === "Natural Gas" ? "bg-[#8b5cf6]" : ""
												}`}
										></div>
										<span className="text-sm text-gray-300">{opt}</span>
									</label>
								))}
							</div>
						</div>
					</div>

					{/* Add Question */}
					<div className="border border-dashed border-[#2a2a35] rounded-lg py-4 mt-6 flex justify-center">
						<button
							type="button"
							className="flex items-center gap-2 text-[#8b5cf6] font-medium hover:text-[#a78bfa] transition"
						>
							<Plus className="w-4 h-4" />
							Add Question
						</button>
					</div>
				</div>

				{/* === Footer Buttons === */}
				<div className="flex justify-between mt-8">
					<button onClick={() => setNextActive(false)} className="flex items-center gap-2 px-4 py-2 rounded-md border border-[#2a2a2f] text-gray-300 hover:bg-[#1a1a20] transition">
						<ChevronLeft className="w-4 h-4" />
						Prev
					</button>

					<button className="px-4 py-2 rounded-md font-semibold bg-linear-to-r from-[#8b5cf6] to-[#7c3aed] hover:opacity-90 transition shadow-[0_0_15px_rgba(139,92,246,0.4)]">
						Publish
					</button>
				</div>
			</div>
		</div>
	)
}