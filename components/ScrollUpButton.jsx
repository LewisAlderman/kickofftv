import React from 'react';

const ScrollUpButton = ({visible}) => {
	return visible && (
		<button className='fixed z-10 w-12 h-12 px-2 py-1 text-center rounded-full opacity-50 bg-emerald-200 text-emerald-500 right-3 bottom-20 lg:bottom-3 hover:opacity-100 lg:w-20 lg:h-20 scrollToTopBtn'
		onClick={() => typeof document !== 'undefined' && (document.documentElement.scrollTop ? document.documentElement.scrollTop = 0 : document.body.scrollTop = 0)}>
			<svg className="w-8 h-8 mx-auto fill-current lg:w-12 lg:h-12" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 4H18V6H6zM11 14L11 20 13 20 13 14 18 14 12 8 6 14z"></path></svg>
		</button>
	) || null;
}

export default ScrollUpButton