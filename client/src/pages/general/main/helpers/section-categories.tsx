import { useEffect, useState } from "react"
import { FaBookOpen } from "react-icons/fa"
import { Axios } from "../../../../api"
import type {ICategories} from "../../../../../../types/categories"
export const SectionCategories = () => {
	const [categories,setCategories] = useState<ICategories[] | undefined>()

	useEffect(() => {
		Axios
		.get<ICategories>("/category")
		.then(response => {
			console.log(response.data)
			setCategories(response.data.payload)
		})
	},[])

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
			
			{
				categories?.map(category => <div key={category._id} className="bg-[#1a1a1e] border-t-4 border-blue-500 p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-blue-500/20">
					<div className="flex items-center mb-4 space-x-3">
						<div className={`bg-[${category.color}] p-3 rounded-full`}>
							<i className={`fas fa-${category.icon} text-white text-xl`}></i>
						</div>
						<h3 className="text-lg font-semibold">{category.name}</h3>
					</div>
					<p className="text-gray-400 text-sm mb-4">
						Test your knowledge in science & tech with our challenging quizzes
					</p>
					<a
						href=""
						className="text-blue-400 text-sm font-medium hover:underline flex items-center space-x-1"
					>
						<span>Explore Quizzes</span>
						<i className="fas fa-arrow-right text-xs"></i>
					</a>
				</div> )
			}
			
		</div>
	</section>
}