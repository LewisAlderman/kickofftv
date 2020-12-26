import { useEffect, useState } from 'react';

export default function useDocument(onDocumentLoad = null) {
	/** @type {[HTMLDocument, import('react').Dispatch<HTMLDocument>]} */
	const [doc, set] = useState(null);

	useEffect(() => {
		if (!doc && document) {
			set(document);
			if (onDocumentLoad && typeof onDocumentLoad === 'function') {
				onDocumentLoad(document);
			}
		}
	});

	return doc || null;
}