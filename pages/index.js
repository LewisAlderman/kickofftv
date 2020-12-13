import Head from 'next/head'
import Cors from 'cors'
import { URL, transformBody } from '@data/index';
import Button from '@components/Button';

function Home(props) {    
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="px-12 py-12 text-sm font-extrabold text-red-800 uppercase bg-red-100">
        Page Header
      </h1>

      <Button>Press me</Button>

      <main>
        {props.data ? (
          <pre>
          {JSON.stringify(props.data, null, 2)}
          </pre>
        ) : (
          <h1>???</h1>
        ) }
      </main>
    </div>
  )
}

export async function getServerSideProps() {  
  const matches = await fetch(URL, {mode: Cors({methods: 'GET'})}).then(res => res.text()).then(body => {    
    const matches = transformBody(body);
    return matches
  });
  
  return {
    props: {
      data: matches, 
    },
  }
}

export default Home;