import Head from 'next/head';
import Cors from 'cors';
import React, { useState } from 'react'

import { transformBody, URL } from '@data/index';
import { DEV } from '../constants.ts';

import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import Main from '@components/Main';
import Matches from '@components/Matches';
import Filters from '@components/Filters';
import { FiltersContextProvider, INITIAL_FILTERS, MatchesContextProvider } from 'contexts';


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
  const [filters, setFilters] = useState(() => INITIAL_FILTERS);
  const [matches, setMatches] = useState(() => props?.data ?? [])

  const reset = () => setFilters(INITIAL_FILTERS)

  const toggleFilter = ({target: {id, value}}) => {
    setFilters(() => ({...filters, [id]: value}));
  }

  const filtered = [].concat(matches
    .reduce((out, cur, _, arr) => {
      const {women, youth, televised} = cur;
      if (filters.gender === 'male' && women) return out;
      if (filters.youth && !youth) return out;
      if (filters.televised && !televised) return out;
      return out.concat(cur)
    }, []))
  
  return (
    <>
      <Head>
        <title>WhensTheMatch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen ios-safari-full-height bg-blueGray-50 debug-screens">
      <Navigation />
      <Main>
        <Filters onFilterChange={toggleFilter} reset={reset} />

        <p>
          Matches: <span>{filtered?.length ?? 0}</span>
        </p>
        
        {DEV() && <div>
          <pre>{JSON.stringify(filters, null, 2)}</pre>
        </div>}
        
        <Matches items={filtered} />
      </Main>
      <Footer />
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