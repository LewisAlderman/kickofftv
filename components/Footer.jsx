import { PROD } from "../constants.ts";

export default function Footer() {
	return (
		<footer className="grid py-2 bg-emerald-400 text-emerald-900 h-28 place-items-center pb-safe-bottom">
			{
			PROD()
			? 'Footer'
			: <span className="flex items-center">
				<a href="https://github.com/LewisAlderman/televised-football" target="_blank" rel="noopener noreferrer" className="mx-3">
					Github
				</a> | <a href="https://app.netlify.com/sites/kickofftv/deploys" target="_blank" rel="noopener noreferrer" className="inline-block mx-3">
					<img src="https://api.netlify.com/api/v1/badges/dd2e281e-aaae-4491-a9d7-61fa3ac01594/deploy-status" alt="Netlify"/>
				</a>
			</span>
			}
			
		</footer>
	)
}