import { useEffect, useState } from "react"
import type { ICategories } from "../../../../../../types/categories"
import { Axios } from "../../../../api"
import { useForm } from "react-hook-form"
import { type ILevels } from "../../../../../../types/levels"
import { Link, useOutletContext } from "react-router-dom"
import type { IOutletContext } from "../../../../../../types/user"
import type { IQuiz } from "../../../../../../types/quiz"
export const Quizes = () => {
	const [categories,setCategories] = useState<ICategories[] | null>(null)
	const [levels,setLevels] = useState<ILevels[] | null>(null)
	const {register,handleSubmit,formState:{errors}} = useForm<{category:string,level:string}>()
	const {account} = useOutletContext<IOutletContext>()
	const [quizes,setQuizes] = useState<IQuiz[] | null>(null)
	console.log(quizes)
	useEffect(() => {
		Axios
		.get("/category")
		.then(response => {
			setCategories(response.data.payload)
		})

		Axios
		.get("/level")
		.then(response => {
			console.log(response.data.payload)
			setLevels(response.data.payload)
		})
	},[])
	console.log(account)
	const handleGetQuizes = (data:{category:string,level:string}) => {
		console.log(data)
		Axios.get("/quiz", {
			params: {
				owner_id: account._id,
				access: "free",
				level: data.level,
				category: data.category,
				limit: 0,
				offset: 0
			}
		})
		.then(response => {
			console.log(response.data.payload,"categories")
			setQuizes(response.data.payload)
		})
		.catch(error => {
			setQuizes(error.response.data.payload)
		})
	}
	console.log(categories)
	return <>
		<div className="text-white">

			{/* TITLE */}
			<h1 className="text-3xl font-bold mb-8 bg-linear-to-r from-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
				Quizzes
			</h1>

			{/* FILTER CARD */}
			<form
				onSubmit={handleSubmit(handleGetQuizes)}
				className="w-full max-w-xl bg-[#111016] border border-[#1e1c25] rounded-2xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.15)] mb-10"
			>
				<h2 className="text-lg font-semibold mb-4 text-gray-200">Filter Quizzes</h2>

				{/* CATEGORY */}
				<div className="mb-5">
					<label className="text-sm text-gray-400 mb-1 block">Category</label>
					<select
						{...register("category", { required: "please input" })}
						className="w-full bg-[#14141c] border border-[#2a2a34] text-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#8b5cf6] outline-none"
					>
						<option value="">None</option>
						{categories?.map((cat) => (
							<option key={cat._id} value={cat._id}>
								{cat.name}
							</option>
						))}
					</select>
					{errors.category && (
						<p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
					)}
				</div>

				{/* LEVEL */}
				<div className="mb-5">
					<label className="text-sm text-gray-400 mb-1 block">Level</label>
					<select
						{...register("level", { required: "please input" })}
						className="w-full bg-[#14141c] border border-[#2a2a34] text-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ec4899] outline-none"
					>
						<option value="">None</option>
						{levels?.map((level) => (
							<option key={level._id} value={level.name}>
								{level.name}
							</option>
						))}
					</select>
					{errors.level && (
						<p className="text-red-500 text-sm mt-1">{errors.level.message}</p>
					)}
				</div>

				{/* BUTTON */}
				<button
					className="w-full mt-3 py-2.5 rounded-lg font-semibold bg-linear-to-r 
        from-[#7e3af2] via-[#a855f7] to-[#ec4899]
        hover:from-[#8b5cf6] hover:via-[#a855f7] hover:to-[#f472b6]
        shadow-[0_0_20px_rgba(168,85,247,0.35)] 
        transition-all duration-200 active:scale-95"
				>
					Apply Filter
				</button>
			</form>

			{/* QUIZES LIST */}
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{quizes?.map((quiz) => (
					
					<div
						key={quiz._id}
						className="bg-[#111016] border border-[#1e1c25] rounded-2xl p-6 
          shadow-lg hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]
          hover:-translate-y-1 transition-all duration-300"
					>
						<h3 className="text-xl font-bold text-gray-200">{quiz.title}</h3>
						<p className="text-sm text-gray-400 mt-2">Level: {quiz.level}</p>
						<p className="text-sm text-gray-400 mt-2">Level: {quiz?.category?.name}</p>



						<Link
							to={"/pass/quiz/" + quiz._id}
						>
							<div className="mt-4 text-right">
								<button
									className="px-4 py-1.5 text-sm rounded-md bg-[#1a1a24] border border-[#2a2a34]
              hover:bg-[#22222e] transition text-gray-300"
								>
									Open
								</button>
							</div>
						</Link>
					</div>
				))}
			</div>

		</div>
	</>
}