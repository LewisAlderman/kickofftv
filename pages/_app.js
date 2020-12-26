import '@styles/tailwind.css';
import '@styles/globals.css';

// kick off the polyfill!
import smoothscroll from 'smoothscroll-polyfill';
import useWindow from 'hooks/useWindow';

function App({ Component, pageProps }) {
  useWindow(() => {
    smoothscroll.polyfill();
  })
  
  return <Component {...pageProps} />
}

export default App
