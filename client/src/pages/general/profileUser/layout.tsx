import { NavLink, Outlet, useNavigate } from "react-router-dom"
import {
	Search,
	PlusCircle,
	LayoutDashboard,
	BookOpen,
	Calendar,
	Users,
	Settings,
} from "lucide-react"
import { useEffect, useState } from "react"
import type { IUser } from "../../../../../types/user"
import { Axios } from "../../../api"
import { AddQuiz } from "./pagesUser/addQuiz"

export const Layout = () => {
	const [account, setAccount] = useState<IUser | undefined>()
	const [active,setActive] = useState<boolean>(false)
	const navigate = useNavigate()
	useEffect(() => {
		Axios.get("/auth/user")
			.then((response) => {
				console.log(response.data.payload.user)
				setAccount(response.data.payload.user)
			})
			.catch(() => navigate("/login"))
	}, [])

	return (
		<div className="flex min-h-screen bg-[#0a0a0f] text-white font-inter">
			{/* === Sidebar === */}
			<aside className="w-64 bg-[#111016] border-r border-[#1e1c25] flex flex-col p-6">
				{/* Logo */}
				<h1 className="text-2xl font-bold bg-linear-to-r from-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent mb-10 tracking-wide">
					QuizMaster
				</h1>

				{/* Navigation */}
				<nav className="flex flex-col gap-2">
					{[
						{ name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, to: "" },
						{ name: "Quizzes", icon: <BookOpen className="w-5 h-5" />, to: "/profile/quizes" },
						{ name: "Events", icon: <Calendar className="w-5 h-5" />, to: "/profile/events" },
						{ name: "Books", icon: <Users className="w-5 h-5" />, to: "/profile/books" },
					].map((item) => (
						<NavLink
							key={item.name}
							to={item.to}
							className={({ isActive }) =>
								`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all ${isActive
									? "bg-[#8b5cf6]/25 text-[#c084fc] font-semibold"
									: "text-gray-400 hover:bg-[#1e1c25] hover:text-white"
								}`
							}
						>
							{item.icon}
							{item.name}
						</NavLink>
					))}
				</nav>

				{/* Manage section */}
				<div className="mt-auto pt-6 border-t border-[#1e1c25]">
					<p className="text-xs uppercase text-gray-500 mb-2 tracking-wider">Manage</p>
					<NavLink
						to="/settings"
						className={({ isActive }) =>
							`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all ${isActive
								? "bg-[#8b5cf6]/25 text-[#c084fc] font-semibold"
								: "text-gray-400 hover:bg-[#1e1c25] hover:text-white"
							}`
						}
					>
						<Settings className="w-5 h-5" />
						Settings
					</NavLink>
				</div>
			</aside>

			{/* === Main Section === */}
			<main className="flex-1 bg-[#0b0b12] p-8 overflow-y-auto relative">
				{/* === Top Bar === */}
				<div className="flex justify-between items-center mb-8">
					{/* Search bar */}
					<div className="flex items-center gap-3 bg-[#14141c] px-4 py-2 rounded-lg border border-[#1e1c25] w-[320px] shadow-inner focus-within:ring-2 focus-within:ring-[#8b5cf6]/40 transition">
						<Search className="w-4 h-4 text-gray-400" />
						<input
							type="text"
							placeholder="Search..."
							className="bg-transparent outline-none text-sm text-gray-300 w-full placeholder-gray-500"
						/>
					</div>

					{/* Create Quiz button */}
					<button className="
            flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm
            bg-linear-to-r from-[#7e3af2] via-[#a855f7] to-[#ec4899]
            hover:from-[#8b5cf6] hover:via-[#a855f7] hover:to-[#f472b6]
            transition-all duration-200
            shadow-[0_0_25px_rgba(168,85,247,0.45)]
          "
			onClick={() => setActive(true)}
		  >
						<PlusCircle className="w-5 h-5" />
						Create Quiz
					</button>
				</div>

				{/* === Page Content === */}
				<Outlet context={{account,setAccount}} />
				{active && (
					<div className="absolute inset-0 flex items-center justify-center z-50">
						<AddQuiz active={active} setActive={setActive}/>
					</div>
				)}
				{/* Optional soft ambient glow bottom-right */}
				<div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-linear-to-br from-[#ec4899]/30 to-[#f97316]/30 blur-[150px] pointer-events-none"></div>
			</main>
		</div>
	)
}
