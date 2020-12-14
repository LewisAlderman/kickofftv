import { useEffect, useState } from 'react';

export default function useDocument() {
	/** @type {[HTMLDocument, import('react').Dispatch<HTMLDocument>]} */
	const [doc, set] = useState(null);

	useEffect(() => {
		if (!doc && document) {
			set(document);
		}
	});

	return doc || null;
}