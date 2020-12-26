const { useState, useEffect } = require( "react" );
const { default: useDocument } = require( "./useDocument" );


export default function usePageScroll(cb) {
	const [scrollTop, set] = useState();

	const doc = useDocument();
	
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const handler = (e) => {
        set(() => (document.documentElement.scrollTop || document.body.scrollTop))
        cb(e);
      }

      document.addEventListener('scroll', handler, {passive: true})

      return () => document.removeEventListener('scroll', handler)
    }
  }, [doc])

  return scrollTop;
}