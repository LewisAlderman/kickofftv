import React from 'react';

const ScrollDownButton = ({visible}) => {
	if (!visible) return null;

	return (
		<button
			style={{flexBasis: 300}}
			className="flex items-center flex-1 w-full px-12 py-3 mx-auto font-mono rounded bg-emerald-400 text-emerald-900 w-96 whitespace-nowrap hover:bg-emerald-300 md:border-2 md:border-emerald-300 md:bg-transparent"
			onClick={() => visible?.scrollIntoView({behavior: 'smooth'})}>
				<span className="relative mx-auto">
					Scroll To Latest{' '}
					<svg className="absolute top-1 -right-9 bg-none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path className="text-white fill-current md:text-emerald-400" d="M18 12L13 12 13 6 11 6 11 12 6 12 12 19z"></path></svg>
				</span>
			</button>
	)
}

export default ScrollDownButton