import { NavLink, Outlet, useNavigate } from "react-router-dom"
import {
	Search,
	PlusCircle,
	LayoutDashboard,
	BookOpen,
	Calendar,
	Users,
	Settings
} from "lucide-react"
import { useEffect, useState } from "react"
import type { IUser } from "../../../../../types/user"
import { Axios } from "../../../api"
import { AddQuiz } from "./pagesUser/addQuiz"

export const Layout = () => {
	const [account, setAccount] = useState<IUser | undefined>()
	const [active, setActive] = useState<boolean>(false)
	const [mobileSidebar, setMobileSidebar] = useState(false)

	const navigate = useNavigate()

	useEffect(() => {
		Axios.get("/auth/user")
			.then((response) => setAccount(response.data.payload.user))
			.catch(() => navigate("/login"))
	}, [])

	const menu = [
		{ name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, to: "/profile" },
		{ name: "Quizzes", icon: <BookOpen className="w-5 h-5" />, to: "/profile/quizes" },
		{ name: "Events", icon: <Calendar className="w-5 h-5" />, to: "/profile/events" },
		{ name: "Students", icon: <Users className="w-5 h-5" />, to: "/profile/students" },
	]

	// Reusable sidebar menu component
	const SidebarContent = () => (
		<>
			<h1 className="text-2xl font-bold bg-linear-to-r from-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent mb-10">
				QuizMaster
			</h1>

			<nav className="flex flex-col gap-2">
				{menu.map((item) => (
					<NavLink
						key={item.name}
						to={item.to}
						end
						onClick={() => setMobileSidebar(false)}
						className={({ isActive }) =>
							`flex items-center gap-3 px-3 py-2 rounded-md text-sm w-full transition-all ${isActive
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

			{/* ✅ Mobile Create Quiz Button */}
			<button
				onClick={() => {
					setMobileSidebar(false);
					setActive(true);
				}}
				className="lg:hidden mt-4 mb-4 flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold
      bg-linear-to-r from-[#7e3af2] via-[#a855f7] to-[#ec4899]
      hover:from-[#8b5cf6] hover:via-[#a855f7] hover:to-[#f472b6]
      shadow-[0_0_18px_rgba(168,85,247,0.45)] transition-all duration-200 text-white"
			>
				<PlusCircle className="w-5 h-5" />
				Create Quiz
			</button>

			<div className="mt-auto pt-6 border-t border-[#1e1c25]">
				<p className="text-xs uppercase text-gray-500 mb-2 tracking-wider">Manage</p>
				<NavLink
					to="/settings"
					onClick={() => setMobileSidebar(false)}
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
		</>
	);


	return (
		<div className="flex min-h-screen bg-[#0a0a0f] text-white font-inter">

			{/* Desktop Sidebar */}
			<aside className="hidden lg:flex w-64 bg-[#111016] border-r border-[#1e1c25] flex-col p-6">
				<SidebarContent />
			</aside>

			{/* Mobile Sidebar */}
			<div
				className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden transition ${mobileSidebar ? "opacity-100 visible" : "opacity-0 invisible"
					}`}
				onClick={() => setMobileSidebar(false)}
			>
				<div
					className={`absolute top-0 left-0 h-full w-64 bg-[#111016] border-r border-[#1e1c25] p-6 transition-transform duration-300 ${mobileSidebar ? "translate-x-0" : "-translate-x-full"
						}`}
					onClick={(e) => e.stopPropagation()}
				>
					<SidebarContent />
				</div>
			</div>

			{/* Main Content */}
			<main className="flex-1 bg-[#0b0b12] p-8 overflow-y-auto relative">

				{/* Top Bar */}
				<div className="flex justify-between items-center mb-8">

					{/* Mobile menu btn */}
					<button
						onClick={() => setMobileSidebar(true)}
						className="lg:hidden bg-[#1a1a24] p-2 rounded-md border border-[#2a2a34] hover:bg-[#22222e] transition"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>

					{/* Search */}
					<div className="flex items-center gap-3 bg-[#14141c] px-4 py-2 rounded-lg border border-[#1e1c25] w-[300px] lg:w-[320px] shadow-inner">
						<Search className="w-4 h-4 text-gray-400" />
						<input
							type="text"
							placeholder="Search..."
							className="bg-transparent outline-none text-sm text-gray-300 w-full"
						/>
					</div>

					{/* Create Button */}
					<button
						onClick={() => setActive(true)}
						className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm bg-linear-to-r from-[#7e3af2] via-[#a855f7] to-[#ec4899] hover:from-[#8b5cf6] hover:via-[#a855f7] hover:to-[#f472b6] shadow-[0_0_25px_rgba(168,85,247,0.45)] transition-all duration-200"
					>
						<PlusCircle className="w-5 h-5" />
						Create Quiz
					</button>
				</div>

				<Outlet context={{ account, setAccount }} />

				{active && (
					<div className="absolute inset-0 flex items-center justify-center z-50">
						<AddQuiz active={active} setActive={setActive} />
					</div>
				)}

				<div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-linear-to-br from-[#ec4899]/30 to-[#f97316]/30 blur-[150px] pointer-events-none"></div>
			</main>
		</div>
	)
}
