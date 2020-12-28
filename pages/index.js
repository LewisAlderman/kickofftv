import Head from 'next/head';
import Cors from 'cors';
import React, { useEffect, useRef, useState } from 'react'

import { transformBody, URL } from '@data/index';
import { DEV } from '../constants.ts';

import usePageScroll from '../hooks/usePageScroll'

import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import Main from '@components/Main';
import Matches from '@components/Matches';
import Filters from '@components/Filters';
import { FiltersContextProvider, INITIAL_FILTERS, MatchesContextProvider } from 'contexts';
import debounce from 'lodash.debounce';
import ScrollUpButton from '@components/ScrollUpButton';

// Functionality
// ======
// @TODO nav component
// @TODO footer component


/**
 * @param {Object} props 
 * @param {import('@data/index').Match[]} props.data 
 */
 
function Homepage(props) {    
  const [filters, setFilters] = useState(() => INITIAL_FILTERS);
  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const [groups] = useState(() => groupByFilters(props.data))
  const [isScrollToTopVisible, setScrollToTopVisible] = useState(false);

  usePageScroll(debounce(({target: {documentElement, body}}) => {
    setScrollToTopVisible((documentElement.scrollTop || body.scrollTop) > documentElement.clientHeight * 0.5)
  }, 250, {maxWait: 500}))

  const reset = () => setFilters(INITIAL_FILTERS)

  const toggleFilter = ({target: {id, value}}) => {
    setFilters(() => ({...filters, [id]: value}));
  }

  const [latestMatchRef, setLatestMatchRef] = useState(null);
  
  const matches = [].concat(groups.gender[filters.gender]).filter(cur => groups.youth[filters.youth].find(({id})=>id===cur.id) && groups.televised[filters.televised].find(({id}) => id===cur.id))
  
  return (
    <>
      <Head>
        <title>Kickoff | UK TV</title>
      </Head>
        
      <div className="flex flex-col min-h-screen ios-safari-full-height bg-blueGray-50 debug-screens">
        
      <Navigation onFilterToggleClick={() => setFiltersVisible(x => !x)} />

      {isFiltersVisible && (
          <Filters onFilterChange={toggleFilter} reset={reset} groups={groups} />
        )}
      
      <Main>
        <ScrollUpButton visible={isScrollToTopVisible} />

        <div className="flex flex-wrap items-center justify-between">
          <div className="mb-3 mr-4" style={{flex: 9999, flexBasis: 250}}>
            <span className="inline-block px-8 py-3 font-mono text-gray-500 bg-gray-100 rounded shadow-inner whitespace-nowrap">
              Displaying: <span className="px-2 py-0.5 bg-yellow-400 rounded-full text-yellow-700 text-sm font-semibold">{matches?.length ?? 0}/{props.data?.length ?? 0}</span>
            </span>
          </div>

          {/* SCROLL DOWN */}
          {latestMatchRef && (
            <button
            style={{flex: 1, flexBasis: 300}}
            className="flex items-center px-12 py-3 mb-3 font-mono rounded text-emerald-900 bg-emerald-400 w-96 whitespace-nowrap hover:bg-emerald-300"
            onClick={() => latestMatchRef?.scrollIntoView({behavior: 'smooth'})}>
              <span className="relative mx-auto">
                View Latest Game{' '}
                <svg className="absolute top-1 -right-9 bg-none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path className="text-white fill-current" d="M18 12L13 12 13 6 11 6 11 12 6 12 12 19z"></path></svg>
              </span>
            </button>
          )}
        </div>

        <br/>

        <Matches items={matches} setLatestMatchRef={setLatestMatchRef} />

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

export async function getStaticProps() {  
  const matches = await fetch(URL, {mode: Cors({methods: 'GET'})}).then(res => res.text()).then(body => {    
    const matches = transformBody(body);
    return matches;
  });
  
  return {
    props: {
      data: matches, 
    },
    revalidate: 60
  }
}

export default Homepage;