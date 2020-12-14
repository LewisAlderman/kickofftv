import { useEffect, useState } from 'react';

/** @param {function(Window): void} callback */
export default function useWindowResize(callback) {
	/** @type {[Window, import('react').Dispatch<Window>]} */
	const [wind, set] = useState(null);
	
	useEffect(() => {
		if (!wind && window) set(window);
	}, [typeof window])

	useEffect(() => {
		if (wind) {
			const x = () => callback(wind);

			wind.addEventListener('resize', x, {passive: true});

			wind.dispatchEvent(new Event('resize')); 
			
			return () => wind.removeEventListener('resize', x);
		}
	}, [wind])

	return wind ?? null;
}