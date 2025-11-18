import { Calendar, BookOpen, Users, TrendingUp, BarChart2 } from "lucide-react"
import { useOutletContext } from "react-router-dom"
import type { IOutletContext } from "../../../../../../types/user"

export const Dashboard = () => {
	const {account,setAccount} = useOutletContext<IOutletContext>()
	
	return (
		<div className="min-h-screen bg-[#0a0a0f] text-white px-10 py-8 font-inter">
			{/* === Top Section === */}
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-3xl font-semibold">Dashboard</h1>
					<p className="text-gray-400 text-sm mt-1">
						Welcome back, {account?.name}! Here’s what’s happening with your quizzes
					</p>
				</div>
			</div>

			{/* === Stats Cards === */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
				{[
					{ title: "Total Quizzes", value: "2,543", icon: <BookOpen className="w-6 h-6" />, change: "+12.5%" },
					{ title: "Active Events", value: "2,543", icon: <Calendar className="w-6 h-6" />, change: "+12.5%" },
					{ title: "Students", value: "2,543", icon: <Users className="w-6 h-6" />, change: "+12.5%" },
					{ title: "Avg. Completion", value: "2,543", icon: <TrendingUp className="w-6 h-6" />, change: "-12.5%", negative: true },
				].map((item, i) => (
					<div
						key={i}
						className="bg-[#14141c] p-5 rounded-xl border border-[#1e1c25] hover:border-[#8b5cf6]/40 transition flex flex-col justify-between"
					>
						<div className="flex justify-between items-center">
							<p className="text-gray-400 text-sm">{item.title}</p>
							<div className="text-purple-400">{item.icon}</div>
						</div>
						<p className="text-3xl font-bold mt-3">{item.value}</p>
						<p
							className={`text-xs mt-1 ${item.negative ? "text-red-400" : "text-green-400"
								}`}
						>
							{item.change}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}