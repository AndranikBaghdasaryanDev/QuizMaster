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

			{/* === Middle Section (Events + Top Students) === */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
				{/* Recent Events */}
				<div className="bg-[#14141c] rounded-xl border border-[#1e1c25] p-6 col-span-2">
					<h2 className="text-lg font-semibold mb-1">Recent Events</h2>
					<p className="text-sm text-gray-400 mb-4">
						Manage your upcoming and active quiz events
					</p>

					<div className="flex flex-col gap-3">
						{[
							{
								title: "Science Mid-term Quiz",
								time: "Today, 2:30 PM",
								participants: 32,
							},
							{
								title: "Mathematics Weekly Test",
								time: "Tomorrow, 10:00 AM",
								participants: 28,
							},
							{
								title: "History Final Exam",
								time: "May 20, 9:00 AM",
								participants: 45,
							},
						].map((event, i) => (
							<div
								key={i}
								className="bg-[#0e0e14] border border-[#1e1c25] rounded-lg p-4 flex justify-between items-center hover:border-[#8b5cf6]/40 transition"
							>
								<div className="flex items-start gap-3">
									<div className="p-2 bg-purple-600/20 rounded-md">
										<Calendar className="w-5 h-5 text-purple-400" />
									</div>
									<div>
										<h3 className="font-semibold text-white">{event.title}</h3>
										<p className="text-sm text-gray-400">{event.time}</p>
										<p className="text-xs text-gray-500 mt-1">
											{event.participants} participants
										</p>
									</div>
								</div>

								<button
									className={`${i === 0
											? "bg-purple-600 hover:bg-purple-700"
											: "bg-[#1e1c25] hover:bg-[#2c2a33]"
										} px-4 py-2 rounded-md text-sm font-medium transition`}
								>
									{i === 0 ? "View Live" : "Manage"}
								</button>
							</div>
						))}
					</div>
				</div>

				{/* Top Students */}
				<div className="bg-[#14141c] rounded-xl border border-[#1e1c25] p-6">
					<h2 className="text-lg font-semibold mb-1">Top Students</h2>
					<p className="text-sm text-gray-400 mb-4">
						Students with highest quiz scores
					</p>

					<div className="flex flex-col gap-4">
						{[
							{ name: "Alex John", subject: "Science", score: 950 },
							{ name: "Emma Watson", subject: "Mathematics", score: 920 },
							{ name: "Michael Clark", subject: "Physics", score: 980 },
							{ name: "Sophia Green", subject: "English", score: 890 },
							{ name: "Lucia Wilde", subject: "Science", score: 870 },
						].map((student, i) => (
							<div
								key={i}
								className="flex items-center justify-between bg-[#0e0e14] border border-[#1e1c25] rounded-lg px-4 py-3 hover:border-[#8b5cf6]/40 transition"
							>
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 bg-linear-to-r from-[#8b5cf6] to-[#ec4899] rounded-full flex items-center justify-center text-sm font-semibold">
										{i + 1}
									</div>
									<div>
										<h3 className="font-medium">{student.name}</h3>
										<p className="text-xs text-gray-400">{student.subject}</p>
									</div>
								</div>

								<div className="flex items-center gap-2 text-orange-400 font-semibold">
									<BarChart2 className="w-4 h-4" />
									{student.score}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* === Recent Quizzes Section === */}
			<div className="bg-[#14141c] rounded-xl border border-[#1e1c25] p-6">
				<h2 className="text-lg font-semibold mb-1">Recent Quizzes</h2>
				<p className="text-sm text-gray-400 mb-4">
					Your recently created quizzes
				</p>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{[75, 40, 90].map((rate, i) => (
						<div
							key={i}
							className="bg-[#0e0e14] border border-[#1e1c25] rounded-lg p-5 hover:border-[#8b5cf6]/40 transition flex flex-col justify-between"
						>
							<div className="flex justify-between items-center mb-3">
								<h3 className="font-medium">Introduction to Biology</h3>
								<BookOpen className="w-5 h-5 text-purple-400" />
							</div>
							<p className="text-sm text-gray-400 mb-3">
								15 questions • 28 completions
							</p>
							<div className="w-full bg-[#1e1c25] h-2 rounded-full mb-2">
								<div
									className="h-2 bg-purple-500 rounded-full transition-all"
									style={{ width: `${rate}%` }}
								></div>
							</div>
							<p className="text-xs text-gray-400">
								Completion Rate <span className="text-purple-400">{rate}%</span>
							</p>
						</div>
					))}

					{/* Create New Quiz */}
					<div className="bg-[#0e0e14] border border-dashed border-[#2c2a33] rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-[#8b5cf6]/50 transition cursor-pointer">
						<div className="bg-[#8b5cf6]/20 p-4 rounded-full mb-3">
							<PlusIcon className="w-6 h-6 text-purple-400" />
						</div>
						<p className="text-sm font-medium">Create New Quiz</p>
						<p className="text-xs text-gray-500">
							Add questions, set time limits and more
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

const PlusIcon = ({ className = "w-5 h-5" }) => (
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
	</svg>
)
