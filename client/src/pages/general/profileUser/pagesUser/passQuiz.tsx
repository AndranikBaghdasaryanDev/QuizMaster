import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Axios } from "../../../../api"
import type { IAnswerFront, IQuestion, IQuizFront } from "../../../../../../types/quiz"

export const PassQuiz = () => {
	const { id } = useParams()
	const [quiz, setQuiz] = useState<IQuizFront>()
	const [error,setError] = useState("")
	const navigate = useNavigate()
	useEffect(() => {
		Axios.get("/quiz/" + id)
			.then(response => {
				console.log(response.data.payload)
				let gettedQuiz = response.data.payload
				console.log(gettedQuiz)
				let data = gettedQuiz.questions.map((question: IQuestion) => ({ ...question, _id: `${crypto.randomUUID()}`, options: question.options.map(option => ({ ...option, id: crypto.randomUUID() })) }))
				 console.log(data)
					setQuiz({...gettedQuiz,questions:data})
				})
			.catch(error => {
				console.log(error)
				// setError(error.response.data.message)
			})
	}, [])
	const handleClickSingleAnswer = (questionId:string,answerId:number) => {
		if(quiz){
			let questions1 = quiz.questions.map(question => question._id == questionId ? { ...question, options: question.options.map((option: IAnswerFront) => option.id == answerId ? { ...option, isClicked: true } : {...option,isClicked:false}) } : question)
			setQuiz({ ...quiz, questions: questions1 })
		}
	} 
	const handleClickMultiAnswer = (questionId:string,answerId:number) => {
		if(quiz){
			let question1 = quiz.questions.map(question => question._id == questionId ? {...question,options:question.options.map((options:IAnswerFront) => options.id == answerId ? {...options,isClicked:true}: options)} : question)
			setQuiz({...quiz,questions:question1})
		}
	}
	const handleInputAnswer = (questionId: string,value:string) => {
		if (quiz) {
			let question1 = quiz.questions.map(question => question._id == questionId ? { ...question, inputAnswer:value } : question)
			setQuiz({ ...quiz, questions: question1 })
		}
	}
	const handleCancleAnswers = (questionId:string) => {
		if(quiz){
			let question1 = quiz.questions.map(question => question._id == questionId ? { ...question, options: question.options.map((option:IAnswerFront) => ({...option,isClicked:false})) } : question)
			setQuiz({...quiz,questions:question1})
		}
	}
	const handleCancleInputAnswers = (questionId: string) => {
		if (quiz) {
			let question1 = quiz.questions.map(question => question._id == questionId ? { ...question, inputAnswer:""}: question)
			setQuiz({ ...quiz, questions: question1 })
		}
	}
	console.log(quiz)
	return <>
		{error ? <div className="
        fixed inset-0 z-999 
        flex items-center justify-center
        bg-black/60 backdrop-blur-md
        animate-fadeIn
    ">

			<div className="
            w-[90%] max-w-md 
            bg-[#111016]/90 
            border border-[#2a2a34]
            rounded-xl p-6
            shadow-[0_0_30px_rgba(0,0,0,0.45)]
            relative
        ">
				{/* Glow decoration */}
				<div className="absolute -top-10 -right-10 w-[200px] h-[200px] 
                bg-linear-to-br from-[#ec4899]/30 to-[#8b5cf6]/30 
                blur-[120px] pointer-events-none">
				</div>

				<div className="flex items-center gap-3 mb-3">
					<svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" strokeWidth="2"
						viewBox="0 0 24 24">
						<circle cx="12" cy="12" r="10"></circle>
						<line x1="12" y1="8" x2="12" y2="12"></line>
						<line x1="12" y1="16" x2="12.01" y2="16"></line>
					</svg>
					<h2 className="text-lg font-semibold text-gray-200">Error</h2>
				</div>

				<p className="text-gray-400 text-sm">
					{error}
				</p>

				<button
					onClick={() => navigate("/profile/quizes")}
					className="
                    mt-6 w-full py-2.5 rounded-md 
                    bg-linear-to-r from-[#7e3af2] via-[#a855f7] to-[#ec4899]
                    hover:from-[#8b5cf6] hover:to-[#f472b6]
                    transition shadow-[0_0_20px_rgba(168,85,247,0.45)]
                    font-semibold text-white text-sm
                "
				>
					Close
				</button>

			</div>
		</div>
:
		<div className="p-4 max-w-2xl mx-auto">
			<h1 className="text-xl font-semibold mb-3 text-gray-200">Pass Quiz</h1>

			<div className="bg-[#15151d] border border-[#24242f] rounded-lg p-4 mb-6">
				<h2 className="text-lg font-semibold text-gray-100">{quiz?.title}</h2>
				<p className="text-sm text-gray-400 mt-1">{quiz?.description}</p>
			</div>

			{quiz?.questions.map((question: IQuestion) => (
				<div
					key={question._id}
					className="mb-4 bg-[#1b1b25] border border-[#2a2a34] p-4 rounded-lg"
				>
					<div className="flex justify-between items-center">
						<p className="text-gray-200 text-sm font-medium">{question.text}</p>
						<span className="text-xs text-gray-400">{question.points} pts</span>
					</div>

					<div className="mt-3 space-y-2">
						{question.options[0] ? question.options.map((answer: IAnswerFront) => (
							question.type == "single" ? <div
								onClick={() => handleClickSingleAnswer(question._id, answer.id)}
								key={answer.id}
								className={`p-2 rounded-md ${answer.isClicked ? "bg-[#5ac0ff]" : "bg-[#242432]"} hover:${answer.isClicked ? "bg-[#5ac0ff]" : "bg-[#2c2c3a]"} transition border border-[#323245]`}
							>
								<p className="text-sm text-gray-300">{answer.text}</p>
							</div> : question.type == "multiple" ? <div
								onClick={() => handleClickMultiAnswer(question._id, answer.id)}
								key={answer.id}
								className={`p-2 rounded-md ${answer.isClicked ? "bg-[#5ac0ff]" : "bg-[#242432]"} hover:${answer.isClicked ? "bg-[#5ac0ff]" : "bg-[#2c2c3a]"} transition border border-[#323245]`}
							>
								<p className="text-sm text-gray-300">{answer.text}</p>
							</div> : null
						)) :
							<div
								className={`p-2 rounded-md "bg-[#242432]" hover:"bg-[#2c2c3a]" transition border border-[#323245]`}
							>
								<input value={question.inputAnswer as string} className="text-white" type="text" onChange={(e) => handleInputAnswer(question._id, e.target.value)} />
							</div>
						}
					</div>
					<button className="text-white" onClick={question.inputAnswer ? () => handleCancleInputAnswers(question._id) : () => handleCancleAnswers(question._id)}>Cancle Answers</button>
				</div>
			))}
		</div>
		
		}
	</>
}

