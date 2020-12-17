import {PROD} from '../constants.ts';

export default function Navigation() {
	return (
		<nav className="grid h-16 bg-red-200 place-items-center">
			{PROD() ? (
				<div>
					<h1>Nav</h1>
				</div>
			) : (
				<a href="https://naughty-jang-12b423.netlify.app" target="_blank" rel="noopener noreferrer nofollow">
				View Live Site
			</a>
			)}
		</nav>
	)
}