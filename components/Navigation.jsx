import {PROD} from '../constants.ts';
import PageWrapper from './PageWrapper';

export default function Navigation() {
	return (
		<nav className="flex flex-col h-16 bg-emerald-200 text-emerald-900">
			<PageWrapper className="flex-1 w-full h-full px-10 sm:px-8 md:px-4">
				<div className="flex items-center justify-between flex-1 w-full h-full">
				
				<span className="font-extrabold underline transform -skew-x-12 -skew-y-3">KICKOFF</span>
				
				<a href="https://naughty-jang-12b423.netlify.app" target="_blank" rel="noopener noreferrer nofollow">
					View Live Site
				</a>
				</div>
			</PageWrapper>
		</nav>
	)
}