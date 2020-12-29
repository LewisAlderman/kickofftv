import Head from 'next/head'
import '@styles/tailwind.css';
import '@styles/globals.css';

// kick off the polyfill!
import smoothscroll from 'smoothscroll-polyfill';
import useWindow from 'hooks/useWindow';

function App({ Component, pageProps }) {
  useWindow(() => {
    smoothscroll.polyfill();
  })
  
  return <>
  <Head>
    {/* https://realfavicongenerator.net/ */}
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#34d399" />
    <meta name="apple-mobile-web-app-title" content="Kickoff" />
    <meta name="application-name" content="Kickoff" />
    <meta name="msapplication-TileColor" content="#34d399" />
    <meta name="theme-color" content="#34d399" />

    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
    />
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />
    <meta name="description" content="Description" />
    <meta name="keywords" content="Keywords" />
  </Head>
  <Component {...pageProps} />
  </>
}

export default App
