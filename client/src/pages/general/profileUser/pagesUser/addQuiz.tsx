import { useState } from "react"
import { X, ChevronDown} from "lucide-react"
import type { IAddQuizProps } from "../../../../../../types/quiz"
import { useForm } from "react-hook-form"
import { CreateQuestion } from "./createQuestion"

export const AddQuiz = ({ setActive }: IAddQuizProps) => {
	const [quiz, setQuiz] = useState({
		error: false,
		message: "Quiz added successfully",
		payload: {
			title: "",
			description: "",
			owner_id: "",
			access: "",
			isActive: true,
			availableFrom: "",
			availableUntil: "",
			questions: [
				{
					text: "",
					type: "",
					points: "",
					options: [
						{ text: "", isCorrect: true },
						{ text: "", isCorrect: false },
						{ text: "", isCorrect: false },
					],
					inputAnswer: "string",
				},
			],
		},
	})

	const { register, handleSubmit } = useForm()
	const [nextActive, setNextActive] = useState(false)

	const handleAdd = (data: any) => {
		setQuiz({
			...quiz,
			payload: {
				...quiz.payload,
				title: data.title,
				description: data.description,
			},
		})
		setNextActive(true)
	}

	return (
		<>
			{nextActive ? (
				<CreateQuestion setNextActive={setNextActive} setActive={setActive} />
			) : (
				<div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-9999">
					<form
						onSubmit={handleSubmit(handleAdd)}
						className="w-full max-w-5xl bg-[#141419] rounded-2xl p-8 border border-white/10 shadow-[0_0_40px_rgba(123,63,228,0.4)] text-white"
					>
						{/* === Header === */}
						<div className="flex justify-between items-center mb-10">
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

						{/* === Quiz Details === */}
						<div className="bg-[#111016] rounded-2xl border border-[#1e1c25] p-8">
							<h2 className="text-lg font-semibold mb-1">Quiz Details</h2>
							<p className="text-sm text-gray-400 mb-6">
								Basic information about your quiz
							</p>

							<div className="space-y-5">
								{/* Title */}
								<div>
									<label className="text-sm text-gray-300">Quiz Title</label>
									<input
										{...register("title", { required: "Please enter quiz title" })}
										placeholder="e.g. Science Knowledge Test"
										className="w-full mt-1 px-3 py-2 bg-[#14141c] border border-[#2a2a35] rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6] transition"
									/>
								</div>

								{/* Description */}
								<div>
									<label className="text-sm text-gray-300">Description</label>
									<textarea
										{...register("description", { required: "Please enter description" })}
										rows={3}
										placeholder="Write a short description..."
										className="w-full mt-1 px-3 py-2 bg-[#14141c] border border-[#2a2a35] rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6] resize-none transition"
									/>
								</div>

								{/* Category / Difficulty */}
								<div className="grid grid-cols-2 gap-5">
									<div>
										<label className="text-sm text-gray-300">Category</label>
										<div className="relative mt-1">
											<select className="w-full px-3 py-2 appearance-none bg-[#14141c] border border-[#2a2a35] rounded-md text-sm text-white focus:outline-none focus:border-[#8b5cf6] cursor-pointer">
												<option>Science</option>
												<option>Mathematics</option>
												<option>History</option>
												<option>Technology</option>
											</select>
											<ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
										</div>
									</div>

									<div>
										<label className="text-sm text-gray-300">Difficulty Level</label>
										<div className="relative mt-1">
											<select className="w-full px-3 py-2 appearance-none bg-[#14141c] border border-[#2a2a35] rounded-md text-sm text-white focus:outline-none focus:border-[#8b5cf6] cursor-pointer">
												<option>Easy</option>
												<option>Medium</option>
												<option>Hard</option>
											</select>
											<ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* === Footer Buttons === */}
						<div className="flex justify-end mt-8">

							<button
								type="submit"
								className="px-6 py-2 rounded-md font-semibold bg-linear-to-r from-[#8b5cf6] to-[#7c3aed] hover:opacity-90 transition shadow-[0_0_15px_rgba(139,92,246,0.4)]"
							>
								Next Step
							</button>
						</div>
					</form>
				</div>
			)}
		</>
	)
}
