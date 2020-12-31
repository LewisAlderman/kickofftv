import { useEffect, useRef } from 'react';
import { Loader } from './Loader';
import PageWrapper from './PageWrapper';
import {useRouter} from 'next/router'
import { DEV } from '../constants.ts';

export default function Navigation({isFiltersVisible, onFilterToggleClick}) {
	
	return (
		<nav className="sticky top-0 z-20 flex flex-col py-2 lg:relative bg-emerald-400 text-emerald-900 pt-safe-top">
			<PageWrapper className="flex items-center flex-1 w-full h-full px-0">
				<div className="flex items-center justify-center flex-1 w-full h-full lg:justify-between">
				
					{/* LOGO */}
					<span className="text-2xl font-extrabold transform -skew-x-12 -skew-y-3 md:text-xl logo">
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

			{/* REFRESH ICON */}
			<button
			onClick={() => window.location.reload()}
			className={`absolute p-3 rounded-md hover:bg-emerald-300 active:bg-emerald-500 bottom-1 left-4 ${DEV() ? 'block' : 'hidden'}`}>
				<svg className="text-emerald-700" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24"><path d="M10 11H7.101c0-.003 0-.006.001-.009.065-.319.163-.634.291-.937.126-.297.281-.583.461-.85.178-.264.384-.513.61-.74C8.691 8.238 8.94 8.032 9.206 7.853c.266-.18.551-.334.848-.46.302-.128.617-.226.938-.291.658-.135 1.357-.135 2.018 0 .318.065.634.163.937.291.296.125.581.281.85.461.266.179.514.384.738.609l1.416-1.412c-.314-.316-.664-.604-1.036-.855-.373-.252-.773-.47-1.188-.646-.425-.18-.868-.317-1.315-.408-.923-.189-1.899-.189-2.819 0-.449.092-.892.229-1.316.409C8.858 5.727 8.458 5.944 8.086 6.196 7.716 6.445 7.368 6.733 7.05 7.05S6.445 7.716 6.197 8.085c-.252.373-.47.773-.646 1.19-.18.424-.317.867-.408 1.315C5.115 10.725 5.1 10.863 5.08 11H2l4 4L10 11zM14 13h2.899c-.001.003 0 .006-.001.008-.066.324-.164.639-.292.938-.123.293-.278.579-.459.848-.179.264-.385.514-.613.742-.225.225-.473.43-.739.61-.268.18-.553.335-.849.461-.303.128-.618.226-.938.291-.657.135-1.357.135-2.017 0-.319-.065-.634-.163-.937-.291-.297-.126-.583-.281-.85-.461-.264-.178-.513-.384-.74-.61L7.05 16.95c.317.317.666.605 1.035.854.373.252.773.47 1.19.646.424.18.867.317 1.315.408C11.051 18.952 11.525 19 12 19s.949-.048 1.408-.142c.449-.091.893-.229 1.317-.409.415-.176.815-.393 1.188-.645.372-.251.722-.54 1.035-.854.317-.317.605-.666.855-1.037.254-.377.472-.777.645-1.187.178-.42.315-.863.408-1.316.027-.135.043-.273.063-.41H22l-4-4L14 13z"></path></svg>
			</button>
		</nav>
	)
}