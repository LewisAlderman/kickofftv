import { PROD } from "../constants.ts";
import PageWrapper from "./PageWrapper";

export default function Footer() {
	return (
		<footer className="flex items-center justify-center h-48 py-2 bg-emerald-400 text-emerald-800 pb-safe-bottom standalone:bg-transparent standalone:h-28">
			
			<PageWrapper className="flex flex-col items-center justify-center space-y-2">
			<div className="mb-2 text-sm text-center text-emerald-600 standalone:text-gray-400">
				All data for this site is curated for education purposes only
			</div>
			
			<div className="flex items-center standalone:hidden">
				<a href="https://github.com/LewisAlderman/televised-football" target="_blank" rel="noopener noreferrer" className="mx-3 text-xs font-bold uppercase">
					Github
				</a>
				<span className="text-emerald-500">|</span>
				<a href="https://app.netlify.com/sites/kickofftv/deploys" target="_blank" rel="noopener noreferrer" className="inline-block mx-3">
					<img src="https://api.netlify.com/api/v1/badges/dd2e281e-aaae-4491-a9d7-61fa3ac01594/deploy-status" alt="Netlify"/>
				</a>
			</div>
			</PageWrapper>
			
		</footer>
	)
}