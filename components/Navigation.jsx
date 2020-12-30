import { useEffect, useRef } from 'react';
import PageWrapper from './PageWrapper';

export default function Navigation({isFiltersVisible, onFilterToggleClick}) {
	return (
		<nav className="sticky top-0 z-20 flex flex-col py-2 lg:relative bg-emerald-400 text-emerald-900 pt-safe-top">
			<PageWrapper className="flex items-center flex-1 w-full h-full px-0">
				<div className="flex items-center justify-center flex-1 w-full h-full lg:justify-between">
				
					{/* LOGO */}
					<span className="text-2xl font-extrabold transform -skew-x-12 -skew-y-3 md:text-xl lg:text-lg logo">
						KICK
						<span className="text-white">OFF</span>

						<span className="absolute icon">
							<svg className="text-emerald-600" xmlns="http://www.w3.org/2000/svg" width=".75em" height=".75em" viewBox="0 0 24 24" fill="currentColor"><path d="M20,6h-5.586l2.293-2.293l-1.414-1.414L12,5.586L8.707,2.293L7.293,3.707L9.586,6H4C2.897,6,2,6.897,2,8v11 c0,1.103,0.897,2,2,2h16c1.103,0,2-0.897,2-2V8C22,6.897,21.103,6,20,6z"></path></svg>
							<span className="text-xs text-emerald-300">
								<small>TV</small>
							</span>
						</span>
					</span>
					
					{/* FILTER TOGGLE */}
					<button onClick={onFilterToggleClick} className={`absolute p-3 rounded-lg md:p-1.5 right-4 lg:relative lg:right-0 text-emerald-700 ${isFiltersVisible ? 'bg-emerald-600' : 'bg-emerald-500'}`}>
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill={isFiltersVisible ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={isFiltersVisible ? "1":"2.25"} strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
					</button>

				</div>
			</PageWrapper>
		</nav>
	)
}