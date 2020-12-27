import { PROD } from "../constants.ts";

export default function Footer() {
	return (
		<footer className="grid bg-emerald-200 text-emerald-900 h-28 place-items-center">
			{PROD() ? 'Footer' : <span><a href="https://github.com/LewisAlderman/televised-football" target="_blank" rel="noopener noreferrer">Github</a> | <a href="https://app.netlify.com/sites/naughty-jang-12b423/overview" target="_blank" rel="noopener noreferrer">Netlify</a></span>}
		</footer>
	)
}