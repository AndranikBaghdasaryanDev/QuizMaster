import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Axios } from "../../../../api"
import type { IAnswerFront, IQuestion, IQuizFront } from "../../../../../../types/quiz"
import { ArrowLeft, Loader2, Sparkles } from "lucide-react"

type TAnswer =
	{
		questionId: string
		answer: string | string[]
	}

export const PassQuiz = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [quiz, setQuiz] = useState<IQuizFront | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [result, setResult] = useState<{
		totalScore: number
		maxScore: number
		percentage: number
		correctAnswers: number
		totalQuestions: number
	} | null>(null)

	const submissionRef = useRef<{ quizId: string | undefined; answers: TAnswer[] }>({
		quizId: id,
		answers: []
	})

	const upsertAnswer = (questionId: string, answer: string | string[]) => {
		const answers = submissionRef.current.answers
		const existingIndex = answers.findIndex(item => item.questionId === questionId)
		if (existingIndex >= 0) {
			answers[existingIndex] = { questionId, answer }
		} else {
			answers.push({ questionId, answer })
		}
	}

	const removeAnswer = (questionId: string) => {
		submissionRef.current.answers = submissionRef.current.answers.filter(item => item.questionId !== questionId)
	}
	useEffect(() => {
		Axios.get("/auth/user")
			.catch(() => navigate("/login"))
	}, [])
	useEffect(() => {
		setIsLoading(true)
		Axios.get("/quiz/" + id)
			.then(response => {
				const fetchedQuiz = response.data.payload
				const remappedQuestions = fetchedQuiz.questions.map((question: IQuestion) => ({
					...question,
					_id: question._id?.toString() || question._id || "",
					options: question.options?.map((option, idx) => ({
						...option,
						id: option.id || idx,
						isClicked: false
					})) || [],
					inputAnswer: question.type === "input" ? "" : null
				}))
				setQuiz({ ...fetchedQuiz, questions: remappedQuestions })
				setError(null)
			})
			.catch(err => {
				setError(err.response?.data?.message ?? "Failed to load quiz. Please try again.")
				window.scrollTo({ top: 0, behavior: 'smooth' })

			})
			.finally(() => setIsLoading(false))
	}, [id])

	const handleClickSingleAnswer = (questionId: string, answerId: string | number, answerText: string) => {
		if (!quiz) return
		const updatedQuestions = quiz.questions.map((question: IQuestion) => {
			if (question._id !== questionId) return question
			return {
				...question,
				options: question.options.map((option: IAnswerFront) => ({
					...option,
					isClicked: option.id === answerId
				}))
			}
		})
		setQuiz({ ...quiz, questions: updatedQuestions })
		upsertAnswer(questionId, answerText)
	}

	const handleClickMultiAnswer = (questionId: string, answerId: string | number) => {
		if (!quiz) return
		const updatedQuestions = quiz.questions.map((question: IQuestion) => {
			if (question._id !== questionId) return question
			const updatedOptions = question.options.map((option: IAnswerFront) => {
				if (option.id !== answerId) return option
				return { ...option, isClicked: !option.isClicked }
			})
			const selected = updatedOptions
				.filter((option: IAnswerFront) => option.isClicked)
				.map((option: IAnswerFront) => option.text)
			if (selected.length) {
				upsertAnswer(questionId, selected)
			} else {
				removeAnswer(questionId)
			}
			return { ...question, options: updatedOptions }
		})
		setQuiz({ ...quiz, questions: updatedQuestions })
	}

	const handleInputAnswer = (questionId: string, value: string) => {
		if (!quiz) return
		const updatedQuestions = quiz.questions.map((question: IQuestion) => {
			if (question._id !== questionId) return question
			return { ...question, inputAnswer: value }
		})
		setQuiz({ ...quiz, questions: updatedQuestions })
		if (value.trim()) {
			upsertAnswer(questionId, value)
		} else {
			removeAnswer(questionId)
		}
	}

	const handleCancelAnswers = (questionId: string, isInput?: boolean) => {
		if (!quiz) return
		const updatedQuestions = quiz.questions.map((question: IQuestion) => {
			if (question._id !== questionId) return question
			return {
				...question,
				options: question.options.map((option: IAnswerFront) => ({ ...option, isClicked: false })),
				inputAnswer: isInput ? "" : question.inputAnswer
			}
		})
		setQuiz({ ...quiz, questions: updatedQuestions })
		removeAnswer(questionId)
	}

	const handleSubmitQuiz = () => {
		if (!quiz) return
		const answeredCount = submissionRef.current.answers.length
		if (answeredCount < quiz.questions.length) {
			setError("Please answer all questions before submitting.")
			window.scrollTo({ top: 0, behavior: 'smooth' })
			return
		}
		setIsSubmitting(true)
		setError(null)


		const submitData = {
			quizId: id,
			answers: submissionRef.current.answers
		}

		Axios.post("/quiz/submit", submitData)
			.then(response => {
			
				setResult(response.data.payload)
				setError(null)

				window.scrollTo({ top: 0, behavior: 'smooth' })
			})
			.catch(err => {
				setError(err.response?.data?.message ?? "Unable to submit quiz. Please try again.")
			})
			.finally(() => setIsSubmitting(false))
	}

	const renderAnswerButton = (question: IQuestion, answer: IAnswerFront) => {
		const baseStyle = "w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer"
		const activeStyle = "bg-linear-to-r from-[#7e3af2] to-[#ec4899] border-transparent text-white shadow-[0_8px_25px_rgba(123,63,228,0.35)]"
		const inactiveStyle = "bg-[#15151f] border-[#242433] text-gray-300 hover:border-[#8b5cf6]/40 hover:-translate-y-0.5"

		if (question.type === "single") {
			return (
				<button
					disabled={!!result}
					key={answer.id}
					onClick={() => handleClickSingleAnswer(question._id, answer.id, answer.text)}
					className={`${baseStyle} ${answer.isClicked ? activeStyle : inactiveStyle}`}
				>
					<p className="text-sm font-medium">{answer.text}</p>
				</button>
			)
		}

		if (question.type === "multiple") {
			return (
				<button
					disabled={!!result}
					key={answer.id}
					onClick={() => handleClickMultiAnswer(question._id, answer.id)}
					className={`${baseStyle} ${answer.isClicked ? activeStyle : inactiveStyle}`}
				>
					<p className="text-sm font-medium">{answer.text}</p>
				</button>
			)
		}

		return null
	}

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#05050a]">
				<div className="flex items-center gap-3 text-gray-300">
					<Loader2 className="w-5 h-5 animate-spin text-[#8b5cf6]" />
					<span>Loading quiz...</span>
				</div>
			</div>
		)
	}
	const getAccuracyColor = (percentage: number) => {
		if (percentage <= 20) return "text-red-500 animate-pulse";
		if (percentage <= 50) return "text-orange-400";
		if (percentage <= 80) return "text-yellow-400";
		return "text-[#7ee787]";
	};


	return (
		<div className="min-h-screen bg-[#05050a] text-white relative overflow-hidden">
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute w-[500px] h-[500px] bg-[#8b5cf6]/15 blur-[180px] -top-32 -right-32"></div>
				<div className="absolute w-[350px] h-[350px] bg-[#ec4899]/15 blur-[160px] bottom-0 left-0"></div>
			</div>

			<div className="relative z-10 max-w-4xl mx-auto px-4 py-12 space-y-8">
				<button
					onClick={() => navigate("/profile/quizes")}
					className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition cursor-pointer"
				>
					<ArrowLeft className="w-4 h-4" />
					Back to quizzes
				</button>

				<div className="bg-[#0f0f18]/90 border border-[#2a2a34] rounded-3xl p-8 shadow-[0_25px_60px_rgba(8,8,15,0.95)] backdrop-blur-xl relative overflow-hidden">
					<div className="absolute inset-y-0 right-0 w-1/2 opacity-20 pointer-events-none">
						<div className="absolute inset-0 bg-linear-to-br from-[#7c3aed] via-transparent to-[#ec4899] blur-[120px]"></div>
					</div>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">Featured Quiz</p>
							<h1 className="text-2xl sm:text-3xl font-semibold text-white mb-3">{quiz?.title}</h1>
							<p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">{quiz?.description}</p>
						</div>
						<div className="bg-[#141424] border border-[#2a2a38] rounded-2xl px-6 py-4 text-center shadow-inner">
							<p className="text-xs uppercase text-gray-500 tracking-widest">Questions</p>
							<p className="text-3xl font-bold text-white">{quiz?.questions.length ?? 0}</p>
						</div>
					</div>
				</div>

				{result && (
					<div className="bg-[#101020]/90 border border-[#292940] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<p className="text-sm text-gray-400 uppercase tracking-wide">Your Result</p>
							<h2 className="text-2xl font-semibold mt-2 text-white">
								{result.totalScore} / {result.maxScore} pts
							</h2>
							<p className="text-sm text-gray-400 mt-1">
								{result.correctAnswers} of {result.totalQuestions} correct
							</p>
						</div>

						<div className="flex items-center gap-4">
							<div className="text-center">
								<p className="text-xs uppercase text-gray-500">Accuracy</p>

								<p className={`text-2xl font-semibold ${getAccuracyColor(Math.round(result.percentage))}`}>
									{Math.round(result.percentage)}%
								</p>
							</div>

							<button
								onClick={() => navigate("/profile/quizes")}
								className="px-5 py-2 rounded-xl bg-linear-to-r from-[#7e3af2] to-[#ec4899] font-semibold shadow-[0_15px_35px_rgba(123,63,228,0.35)] cursor-pointer"
							>
								View my quizzes
							</button>
						</div>
					</div>
				)}


				{error && (
					<div className="bg-[#2c1c27]/50 border border-[#ff4d6d]/40 rounded-2xl p-4 flex items-start gap-3 text-sm text-[#ff9ab5]">
						<Sparkles className="w-4 h-4 mt-1 text-[#ff4d6d]" />
						<div>
							<p className="font-medium">Heads up</p>
							<p>{error}</p>
						</div>
					</div>
				)}

				<div className="space-y-6">
					{quiz?.questions.map((question: IQuestion, index: number) => (
						<div
							key={question._id}
							className="rounded-3xl bg-[#0f0f19]/80 border border-[#1f1f2e] p-6 shadow-[0_25px_55px_rgba(5,5,10,0.85)]"
						>
							<div className="flex flex-wrap items-center gap-4 mb-5">
								<div className="px-3 py-1 rounded-full bg-[#1f1f2e] border border-[#2c2c3f] text-xs uppercase tracking-widest text-gray-400">
									Question {index + 1}
								</div>
								<span className="text-sm text-gray-400">Worth <span className="text-white font-semibold">{question.points} pts</span></span>
								<span className="px-3 py-1 text-xs rounded-full bg-[#141426] border border-[#262645] text-[#8b5cf6] font-medium">
									{question.type === "single" ? "Single Choice" : question.type === "multiple" ? "Multiple Choice" : "Input"}
								</span>
							</div>

							<p className="text-lg font-semibold text-white leading-relaxed mb-5">{question.text}</p>

							{question.type === "input" ? (
								<div className="bg-[#141423] border border-[#262637] rounded-2xl p-4">
									<input
										type="text"
										disabled={!!result}
										value={question.inputAnswer as string || ""}
										onChange={(e) => handleInputAnswer(question._id, e.target.value)}
										placeholder="Type your answer..."
										className="w-full bg-transparent outline-none text-sm text-white placeholder:text-gray-500"
									/>
								</div>
							) : question.options && question.options.length > 0 ? (
								<div className="grid sm:grid-cols-2 gap-3">
									{question.options.map((answer: IAnswerFront) => renderAnswerButton(question, answer))}
								</div>
							) : (
								<div className="bg-[#141423] border border-[#262637] rounded-2xl p-4 text-center text-gray-400 text-sm">
									No answer options available
								</div>
							)}

							<div className="flex flex-wrap gap-3 mt-5">
								<button
									onClick={() => handleCancelAnswers(question._id, question.type === "input")}
									className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
								>
									Clear answer
								</button>
							</div>
						</div>
					))}
				</div>

				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-[#171727]">
					<p className="text-sm text-gray-400">
						Answered{" "}
						<span className="text-white font-semibold">{submissionRef.current.answers.length}</span> /
						<span className="text-white font-semibold"> {quiz?.questions.length ?? 0}</span>
					</p>
					<button
						onClick={handleSubmitQuiz}
						disabled={isSubmitting || !!result}
						className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-semibold bg-linear-to-r from-[#7e3af2] via-[#a855f7] to-[#ec4899] shadow-[0_20px_40px_rgba(123,63,228,0.45)] hover:shadow-[0_25px_45px_rgba(236,72,153,0.35)] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
					>
						{isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
						Submit answers
					</button>
				</div>
			</div>
		</div>
	)
}

