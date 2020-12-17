import Head from 'next/head';
import Cors from 'cors';

import { transformBody, URL } from '@data/index';

import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import Main from '@components/Main';
import Matches from '@components/Matches';
import Filters from '@components/Filters';
import { FiltersContextProvider, INITIAL_FILTERS, MatchesContextProvider } from 'contexts';
import { useState } from 'react';

// Functionality
// ======
// @TODO display total fixture count
// @TODO nav component
// @TODO footer component
// @TODO scroll-to-top
// @TODO filter checkboxes: mens | women | under Xs 
// @TODO search filter (team|competition|channel) (? could cmd+F)
// @TODO auto-scroll to nearest time (? perhaps annoying)
//
// Styling
// ======
// @TODO do something with dates formatting
// @TODO past/started match style
// @TODO auto-scroll to nearest time (? perhaps annoying)

/**
 * @param {Object} props 
 * @param {import('@data/index').Match[]} props.data 
 */
 
function Homepage(props) {    
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const matches = props?.data ?? [];

  const toggleFilter = ({target: {id, value}}) => {
    console.log(id, value)
    setFilters({...filters, [id]: value});
  }

  const filtered = matches
    .filter(({women}, _, arr) => {
      console.log('initial filter', arr.length, arr)
      return filters.gender === 'female' ? women : filters.gender === 'male' ? !women : (women || !women)
    })
    .filter(({youth}, _, arr) => {
      console.log('after gender', arr.length, arr)
      return filters.youth == youth
    })
    .filter(({televised}, _, arr) => {
      console.log('after youth', arr.length, arr)

      const out = filters.televised ? televised == true : filters.televised === false ? televised === false : !!televised;

      console.log('after televised', arr.length, arr)
      
      return out;
    })

  /*
  && (
    filters.youth
    ? youth 
    : !youth
  ) && (
    filters.televised
    ? televised
    : !televised
  )
  */
  
  return (
    <>
      <Head>
        <title>WhensTheMatch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen ios-safari-full-height bg-blueGray-50 debug-screens">
        <MatchesContextProvider values={matches}>
          <FiltersContextProvider value={filters}>
            <Navigation />
            <Main>
              <Filters onFilterChange={toggleFilter} />

              <div>
                <pre>{JSON.stringify(filters, null, 2)}</pre>
              </div>

              <p>
                Matches: <span>{filtered?.length ?? 0}</span>
              </p>
              
              <Matches items={filtered} />
            </Main>
            <Footer />
          </FiltersContextProvider>
        </MatchesContextProvider>
      </div>
    </>
  )
}

export async function getServerSideProps() {  
  const matches = await fetch(URL, {mode: Cors({methods: 'GET'})}).then(res => res.text()).then(body => {    
    const matches = transformBody(body);
    return matches;
  });
  
  return {
    props: {
      data: matches, 
    },
  }
}

export default Homepage;