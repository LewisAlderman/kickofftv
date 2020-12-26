import { useEffect, useState } from 'react';

export default function useWindow(onWindowLoad = null) {
	/** @type {[Window, import('react').Dispatch<Window>]} */
	const [wind, set] = useState(null);

	useEffect(() => {
		if (!wind && window) {
			set(window);
			if (onWindowLoad && typeof onWindowLoad === 'function') {
				onWindowLoad(window);
			}
		}
	});

	return wind || null;
}