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
  const [groups] = useState(() => groupByFilters(props.data))

  const reset = () => setFilters(INITIAL_FILTERS)

  const toggleFilter = ({target: {id, value}}) => {
    setFilters(() => ({...filters, [id]: value}));
  }
  
  const matches = [].concat(groups.gender[filters.gender]).filter(cur => groups.youth[filters.youth].find(({id})=>id===cur.id) && groups.televised[filters.televised].find(({id}) => id===cur.id))
  
  return (
    <>
      <Head>
        <title>WhensTheMatch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen ios-safari-full-height bg-blueGray-50 debug-screens">
      <Navigation />
      <Main>
        <Filters onFilterChange={toggleFilter} reset={reset} groups={groups} />

        <p>
          Matches: <span>{matches?.length ?? 0}</span>
        </p>
        
        {DEV() && <div>
          <pre>{JSON.stringify(filters, null, 2)}</pre>
        </div>}
        
        <Matches items={matches} />
      </Main>
      <Footer />
      </div>
    </>
  )
}

function groupByFilters (matches) {
  return matches.reduce((groups, cur) => {
    groups.gender.both.push(cur);
    if (cur.women) groups.gender.female.push(cur);
    else groups.gender.male.push(cur);
    
    if (cur.youth) groups.youth.true.push(cur);
    else groups.youth.false.push(cur);
    
    groups.televised.both.push(cur);
    if (cur.televised) groups.televised.true.push(cur);
    else groups.televised.false.push(cur);
  
    return groups;
    
  }, {gender: {male: [], female: [], both: []}, youth: {true: [], false: []}, televised: {true: [], false: [], both: []}})
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