import { Header } from "./helpers/header"
import { Footer } from "./helpers/footer"
import { SectionBanner } from "./helpers/section-banner"
import { SectionCategories } from "./helpers/section-categories"
import { SectionAbout } from "./helpers/section-about"
import { SectionCTA } from "./section-CTA"

export const Mail = () => {
	return <>
		
		<Header/>



		<main className=" text-white font-sans">
			{/* === Section 1 === */}
			<SectionBanner/>
			{/* === Section 2–4 (placeholders) === */}
			<SectionCategories/>

			<SectionAbout/>
			<SectionCTA/>
		</main>

		<Footer/>

	</>
}