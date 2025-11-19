import { X, Trash2, Plus, ChevronLeft } from "lucide-react"

import type { IAnswerFront, ICraeteQuestion } from "../../../../../../types/quiz"
import { useState } from "react";
import { Axios } from "../../../../api";
export const CreateQuestion = ({ quizData, setQuiz, setNextActive, setActive }: ICraeteQuestion) => {
	const [error, setError] = useState<{ error: boolean, message: string } | null>()
	const handleAddQuestion = () => {
		setQuiz({
			...quizData,
			questions: [
				...quizData.questions,
				{
					_id: `${Date.now()}`,
					text: "",
					type: "single",
					image: null,
					options: [
						{
							id: Date.now(),
							text: "",
							isCorrect: false
						}
					],
					inputAnswer: null,
					points: 10
				}
			]
		});
	};
	const handleAddAnswer = (questionId: string) => {
		setQuiz({ ...quizData, questions: quizData.questions.map(question => question._id == questionId ? { ...question, options: [...question.options, { id: Date.now(), text: "", isCorrect: false }] } : question) })
	}
	const handleDeleteQuestion = (questionId: string) => {
		setQuiz({ ...quizData, questions: quizData.questions.filter(question => question._id != questionId) })
	}
	const handleDeleteAnswer = (questionId: string, answerId: number) => {
		setQuiz({ ...quizData, questions: quizData.questions.map(question => question._id == questionId ? { ...question, options: question.options.filter((option: IAnswerFront) => option.id != answerId) } : question) })
	}
	const handleInputAnswer = (questionId: string, answerId: number, value: string) => {
		setQuiz({ ...quizData, questions: quizData.questions.map(question => question._id == questionId ? { ...question, inputAnswer: value, options: question.options.map((option: IAnswerFront) => option.id == answerId ? { ...option, text: value } : option) } : question) })
	}
	const handleAddQuestionName = (questionId: string, value: string) => {
		setQuiz({ ...quizData, questions: quizData.questions.map(question => question._id == questionId ? { ...question, text: value } : question) })
	}
	const handleAddPoint = (questionId: string, value: string) => {
		setQuiz({ ...quizData, questions: quizData.questions.map(question => question._id == questionId ? { ...question, points: Number(value) } : question) })
	}
	const handleAddQuestionType = (questionId: string, value: string) => {
		setQuiz({
			...quizData,
			questions: quizData.questions.map(question =>
				question._id == questionId
					? {
						...question,
						type: value,
						inputAnswer: value === "input" ? "" : null,
						options: value === "input"
							? []
							: question.options.length > 0
								? question.options.map((option: IAnswerFront) => ({ id: option.id, text: "", isCorrect: false }))
								: [{ id: Date.now(), text: "", isCorrect: false }]
					}
					: question
			)
		})
	}
	const handleSingleChoice = (questionId: string, answerId: number) => {
		setQuiz({ ...quizData, questions: quizData.questions.map(question => question._id == questionId ? { ...question, options: question.options.map((option: IAnswerFront) => option.id == answerId ? { ...option, isCorrect: true } : { ...option, isCorrect: false }) } : question) })
	}
	const handleMultipleChoice = (questionId: string, anserId: number) => {
		setQuiz({ ...quizData, questions: quizData.questions.map(question => question._id == questionId ? { ...question, options: question.options.map((option: IAnswerFront) => option.id == anserId ? { ...option, isCorrect: !option.isCorrect } : option) } : question) })
	}

	const handleFill = () => {
		for (let i = 0; i < quizData.questions.length; ++i) {
			const question = quizData.questions[i]

			if (!question.text.trim()) {
				setError({ error: true, message: `Please fill question ${i + 1} text` })
				return false
			}

			if (question.type === "input") {
				if (!question.inputAnswer || !question.inputAnswer.trim()) {
					setError({ error: true, message: `Please fill the correct answer for question ${i + 1}` })
					return false
				}
			} else {
				if (!question.options || question.options.length === 0) {
					setError({ error: true, message: `Please add at least one answer option for question ${i + 1}` })
					return false
				}

				let hasCorrectAnswer = false
				for (let j = 0; j < question.options.length; ++j) {
					if (!question.options[j].text.trim()) {
						setError({ error: true, message: `Please fill question ${i + 1} answer ${j + 1} text` })
						return false
					}
					if (question.options[j].isCorrect === true) {
						hasCorrectAnswer = true
					}
				}

				if (!hasCorrectAnswer) {
					setError({ error: true, message: `Please mark at least one correct answer for question ${i + 1}` })
					return false
				}
			}
		}
		setError(null)
		return true
	}


	const handleAdd = () => {
		if (handleFill()) {
			console.log(quizData, "quizData")
			Axios
				.post("/quiz", { quizData })
				.then(response => {
					console.log(response)
				})
				.catch(error => {
					console.log(error.response.data)
				})
		}
	}
	return (
		<div className="fixed inset-0 bg-black/60 backdrop-blur-md z-9999 flex justify-center items-center px-4">
			<div className="relative w-full max-w-4xl bg-[#141419] rounded-2xl border border-white/10 shadow-[0_0_35px_rgba(123,63,228,0.3)] text-white p-6 sm:p-8 overflow-y-auto max-h-[92vh]">

				<div className="flex justify-between items-center mb-8">
					<div className="flex items-center gap-3">
						<button
							onClick={() => setActive(false)}
							className="p-2 rounded-lg hover:bg-[#1e1c25] transition cursor-pointer"
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

				<div className="bg-[#111016] rounded-2xl border border-[#1e1c25] p-6 sm:p-8">

					<h2 className="text-lg font-semibold mb-1">Quiz questions</h2>

					<p className="text-sm text-gray-400 mb-6">
						Create and manage your quiz questions
					</p>

					{quizData.questions.map((question, index) => (
						<div
							key={question._id}
							className="rounded-xl border border-[#1e1c25] bg-[#0f0e13] p-5 sm:p-6 mb-6 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] transition-all"
						>
							<div className="flex flex-col sm:flex-row justify-between sm:items-center mb-5 gap-3">

								<h3 className="font-semibold text-lg">Question {index + 1}</h3>

								<div className="flex items-center gap-3">

									<div className="flex items-center gap-2">
										<label className="text-sm text-gray-400">Points:</label>
										<input
											type="number"
											value={question.points}
											onChange={(e) => handleAddPoint(question._id, e.target.value)}
											className="w-16 bg-[#14141c] border border-[#2a2a35] rounded-md px-2 py-2 text-center text-sm text-white focus:ring-2 focus:ring-[#8b5cf6]/40 focus:border-[#8b5cf6] outline-none transition"
										/>
									</div>

									<select
										onChange={(e) => handleAddQuestionType(question._id, e.target.value)}
										value={question.type}
										className="bg-[#14141c] border border-[#2a2a35] rounded-md px-3 py-2 text-sm text-gray-300 focus:ring-2 focus:ring-[#8b5cf6]/40 outline-none"
									>
										<option>single</option>
										<option>multiple</option>
										<option>input</option>
									</select>

									<button
										onClick={() => handleDeleteQuestion(question._id)}
										className="p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-[#1a1a20] transition cursor-pointer"
									>
										<Trash2 className="w-5 h-5" />
									</button>
								</div>
							</div>

							<label className="block text-sm text-gray-400 mb-2">
								Question Text
							</label>

							<input
								type="text"
								value={question.text}
								onChange={(e) => handleAddQuestionName(question._id, e.target.value)}
								className="w-full bg-[#14141c] border border-[#2a2a35] rounded-lg px-3 py-3 mb-6 text-sm text-gray-200 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/40 outline-none transition"
							/>

							<h4 className="text-sm text-gray-400 mb-3">
								{question.type === "input" ? "Correct Answer" : "Answer Options"}
							</h4>

							<div className="flex flex-col gap-3">
								{question.type === "input" ? (
									<div className="flex items-center gap-3 bg-[#14141c] border border-[#2a2a35] rounded-lg px-4 py-3">
										<input
											type="text"
											value={question.inputAnswer || ""}
											onChange={(e) => {
												setQuiz({
													...quizData,
													questions: quizData.questions.map(q =>
														q._id === question._id
															? { ...q, inputAnswer: e.target.value }
															: q
													)
												})
											}}
											placeholder="Enter the correct answer for this question"
											className="flex-1 bg-transparent border border-[#3a3a45] rounded-md px-3 py-2 text-sm text-gray-200 focus:ring-2 focus:ring-[#8b5cf6]/40 outline-none transition"
										/>
									</div>
								) : (
									question?.options.map((answer: IAnswerFront) => (
										<div
											key={answer.id}
											className="flex items-center gap-3 bg-[#14141c] border border-[#2a2a35] rounded-lg px-4 py-3 hover:border-[#8b5cf6]/60 transition shadow-sm"
										>
											<input
												type="text"
												value={answer.text}
												onChange={(e) =>
													handleInputAnswer(question._id, answer.id, e.target.value)
												}
												className="flex-1 bg-transparent border border-[#3a3a45] rounded-md px-3 py-2 text-sm text-gray-200 focus:ring-2 focus:ring-[#8b5cf6]/40 outline-none transition"
											/>

											{question.type === "single" && (
												<input
													type="radio"
													checked={answer.isCorrect as boolean}
													onChange={() => handleSingleChoice(question._id, answer.id)}
												/>
											)}

											{question.type === "multiple" && (
												<input
													type="checkbox"
													checked={answer.isCorrect as boolean}
													onChange={() => handleMultipleChoice(question._id, answer.id)}
												/>
											)}

											<button
												onClick={() => handleDeleteAnswer(question._id, answer.id)}
												className="p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-[#1a1a20] transition cursor-pointer"
											>
												<Trash2 className="w-5 h-5" />
											</button>
										</div>
									))
								)}

								{question.type !== "input" && (
									<div className="border border-dashed border-[#3a3a45] rounded-xl py-4 mt-4 flex justify-center hover:border-[#8b5cf6]/50 transition cursor-pointer">
										<button
											onClick={() => handleAddAnswer(question._id)}
											className="flex items-center gap-2 text-[#8b5cf6] font-medium hover:text-[#a78bfa] transition"
										>
											<Plus className="w-4 h-4" />
											Add Answer
										</button>
									</div>
								)}
							</div>
						</div>
					))}
					<div className="flex justify-center items-center w-full">
						{error && 
							(error.error == true ? 
							<div
								className="
        px-5 py-3
        rounded-xl
        bg-green-500/10
        border border-green-500/30
        text-green-400
        text-lg
        font-medium
        shadow-[0_0_15px_rgba(0,255,0,0.25)]
        backdrop-blur-md
      "
							>
								{error.message}
							</div>
							: error.error == false ?
								<div
									className="
			px-5 py-3 
			rounded-xl 
			bg-red-500/10 
			border border-red-500/30 
			text-red-400 
			text-lg 
			font-medium 
			shadow-[0_0_15px_rgba(255,0,0,0.25)]
			backdrop-blur-md
			animate-shake
		"
								>
									{error.message}
								</div>
								: <div className="flex justify-center py-3">
									<div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
								</div>)
						}
					</div>

					<div className="border border-dashed border-[#2a2a35] rounded-xl py-4 mt-6 flex justify-center hover:border-[#8b5cf6]/50 transition cursor-pointer">
						<button
							onClick={handleAddQuestion}
							className="flex items-center gap-2 text-[#8b5cf6] font-medium hover:text-[#a78bfa] transition "
						>
							<Plus className="w-4 h-4" />
							Add Question
						</button>
					</div>
				</div>

				<div className="flex justify-between mt-8">

					<button
						onClick={() => setNextActive(false)}
						className="flex items-center gap-2 px-4 py-2 rounded-md border border-[#2a2a2f] text-gray-300 hover:bg-[#1a1a20] hover:border-[#444] transition cursor-pointer"
					>
						<ChevronLeft className="w-4 h-4" />
						Prev
					</button>

					<button
						onClick={handleAdd}
						className="px-6 py-2 rounded-md font-semibold bg-linear-to-r from-[#8b5cf6] to-[#7c3aed] hover:opacity-90 transition shadow-[0_0_20px_rgba(139,92,246,0.4)] cursor-pointer"
					>
						Publish
					</button>
				</div>
			</div>
		</div>
	)
}