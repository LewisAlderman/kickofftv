import Head from 'next/head'
import Cors from 'cors'
import { URL, transformBody } from '@data/index';
import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import Main from '@components/Main';
import Matches from '@components/Matches';

// @TODO nav component
// @TODO footer component

/**
 * @param {Object} props 
 * @param {import('@data/index').Match[]} props.data 
 */

function Homepage(props) {    
  console.log(props)
  
  return (
    <>
      <Head>
        <title>WhensTheMatch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navigation/>

        <Main>
          <Matches items={props?.data}/>
        </Main>
        
        <Footer/>
      </div>
    </>
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

export default Homepage;