const { useState, useEffect } = require( "react" );
const { default: useDocument } = require( "./useDocument" );


export default function usePageScroll(cb) {
	const [scrollTop, set] = useState();

  const doc = useDocument();
	
  useEffect(() => {
    if (typeof doc?.documentElement !== 'undefined') {      
      doc.documentElement.scrollTop = 0,
      doc.body.scrollTop = 0;
      
      const handler = (e) => {
        set(() => (doc.documentElement.scrollTop || doc.body.scrollTop))
        cb(e);
      }

      doc.addEventListener('scroll', handler, {passive: true})

      return () => doc.removeEventListener('scroll', handler)
    }
  }, [doc])

  return scrollTop;
}