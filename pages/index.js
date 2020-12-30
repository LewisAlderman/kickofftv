import Head from 'next/head';
import Cors from 'cors';
import React, { useState } from 'react'
import debounce from 'lodash.debounce';

import { transformBody, URL } from '@data/index';
import usePageScroll from '../hooks/usePageScroll'
import { INITIAL_FILTERS } from 'contexts';

import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import Main from '@components/Main';
import Matches from '@components/Matches';
import Filters from '@components/Filters';
import ScrollUpButton from '@components/ScrollUpButton';
import dayjs from 'dayjs';

// Functionality
// ======
// @TODO nav component
// @TODO footer component


/**
 * @param {Object} props 
 * @param {import('@data/index').Match[]} props.data 
 * @param {string} props.lastUpdated Date string
 */
 
function Homepage(props) {    
  const [filters, setFilters] = useState(() => INITIAL_FILTERS);
  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const reset = () => setFilters(INITIAL_FILTERS)

  const [groups] = useState(() => groupByFilters(props.data))
  const [isScrollToTopVisible, setScrollToTopVisible] = useState(false);

  usePageScroll(debounce(({target: {documentElement, body}}) => {
    setScrollToTopVisible((documentElement.scrollTop || body.scrollTop) > documentElement.clientHeight * 0.5)
  }, 250, {maxWait: 500}))

  const toggleFilter = ({target: {id, value}}) => {
    setFilters(() => ({...filters, [id]: value}));
  }

  const [latestMatchRef, setLatestMatchRef] = useState(null);
  
  const matches = [].concat(groups.gender[filters.gender]).filter(cur => groups.youth[filters.youth].find(({id})=>id===cur.id) && groups.televised[filters.televised].find(({id}) => id===cur.id));

  const postponedMatches = props.data.filter(({postponed}) => !!postponed);
  
  return (
    <>
      <Head>
        <title>Kickoff | UK TV</title>
      </Head>
        
      <div className="flex flex-col min-h-screen ios-safari-full-height bg-blueGray-50 debug-screens">
        
      <Navigation isFiltersVisible={isFiltersVisible} onFilterToggleClick={() => setFiltersVisible(x => !x)} />

      {isFiltersVisible && (
          <Filters onFilterChange={toggleFilter} reset={reset} groups={groups} />
        )}
      
      <Main>
        <ScrollUpButton visible={isScrollToTopVisible} />

        <div>
          <div className="flex mb-4 space-x-3" style={{flex: 9999, flexBasis: 250}}>
            <div className="flex justify-between flex-grow space-x-3">
              <div className="items-baseline flex-grow w-full">
                <p className="flex flex-wrap items-baseline text-xs font-normal text-gray-300 md:font-extralight">
                  <span className="text-sm text-gray-400 whitespace-nowrap">
                  {dayjs().format('ddd D MMMM')}
                  &nbsp;
                  </span>
                  <span className="">
                  Last Updated: {dayjs(props.lastUpdated).format('HH:mm:ss')}
                  </span>
                </p>
              </div>
              
              <div className="flex space-x-3">
              <small className="flex items-center text-teal-500">
                <span className="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M14,12c-1.095,0-2-0.905-2-2c0-0.354,0.103-0.683,0.268-0.973C12.178,9.02,12.092,9,12,9c-1.642,0-3,1.359-3,3 c0,1.642,1.358,3,3,3c1.641,0,3-1.358,3-3c0-0.092-0.02-0.178-0.027-0.268C14.683,11.897,14.354,12,14,12z"></path><path d="M12,5c-7.633,0-9.927,6.617-9.948,6.684L1.946,12l0.105,0.316C2.073,12.383,4.367,19,12,19s9.927-6.617,9.948-6.684 L22.054,12l-0.105-0.316C21.927,11.617,19.633,5,12,5z M12,17c-5.351,0-7.424-3.846-7.926-5C4.578,10.842,6.652,7,12,7 c5.351,0,7.424,3.846,7.926,5C19.422,13.158,17.348,17,12,17z"></path></svg>
              </span>
              {matches?.length ?? 0}/{props.data?.length ?? 0}
              </small>
              <small className="flex items-center text-rose-400">
                <span className="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757C12.568 16.983 12.291 17 12 17c-5.351 0-7.424-3.846-7.926-5 .204-.47.674-1.381 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379-.069.205-.069.428 0 .633C2.073 12.383 4.367 19 12 19zM12 5c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657.069-.205.069-.428 0-.633C21.927 11.617 19.633 5 12 5zM16.972 15.558l-2.28-2.28C14.882 12.888 15 12.459 15 12c0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501C9.796 7.193 10.814 7 12 7c5.351 0 7.424 3.846 7.926 5C19.624 12.692 18.76 14.342 16.972 15.558z"></path></svg>
              </span>
              {postponedMatches?.length ?? 0}
              </small>
              </div>
            </div>
          </div>

          {/* SCROLL DOWN */}
          {latestMatchRef && (
            <div className="flex-1 px-0 my-4 md:px-12 md:my-8">
              <button
                style={{flexBasis: 300}}
                className="flex items-center flex-1 w-full px-12 py-3 mx-auto font-mono rounded bg-emerald-400 text-emerald-900 w-96 whitespace-nowrap hover:bg-emerald-300 md:border-2 md:border-emerald-300 md:bg-transparent"
                onClick={() => latestMatchRef?.scrollIntoView({behavior: 'smooth'})}>
                  <span className="relative mx-auto">
                    Scroll To Latest{' '}
                    <svg className="absolute top-1 -right-9 bg-none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path className="text-white fill-current md:text-emerald-400" d="M18 12L13 12 13 6 11 6 11 12 6 12 12 19z"></path></svg>
                  </span>
                </button>
            </div>
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
      lastUpdated: new Date().toJSON()
    },
    revalidate: 60*2
  }
}

export default Homepage;