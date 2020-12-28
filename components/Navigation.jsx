import {PROD} from '../constants.ts';
import PageWrapper from './PageWrapper';

export default function Navigation({onFilterToggleClick}) {
	return (
		<nav className="flex flex-col h-16 bg-emerald-200 text-emerald-900">
			<PageWrapper className="flex-1 w-full h-full pl-10 pr-4 sm:pl-8 sm:px-4 md:pl-2 md:pr-2 xl:px-0">
				<div className="flex items-center justify-center flex-1 w-full h-full lg:justify-between">
				
					{/* LOGO */}
					<span className="text-xl font-extrabold underline transform -skew-x-12 -skew-y-3 lg:text-lg">KICKOFF</span>
					
					{/* FILTER TOGGLE */}
					<button onClick={onFilterToggleClick} className="absolute p-3 rounded-lg md:p-1.5 right-2 lg:relative lg:right-0 text-emerald-700 bg-emerald-300">
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
					</button>

				</div>
			</PageWrapper>
		</nav>
	)
}