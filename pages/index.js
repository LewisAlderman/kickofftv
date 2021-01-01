import Head from 'next/head';
import Cors from 'cors';
import React, { useState } from 'react'
import dayjs from 'dayjs';

import { transformBody, URL } from '@data/index';
import { groupByFilters } from 'utils';
import { INITIAL_FILTERS } from 'contexts';
import useDocument from 'hooks/useDocument';
import useWindow from 'hooks/useWindow';

import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import Main from '@components/Main';
import Matches from '@components/Matches';
import Filters from '@components/Filters';
import ScrollUpButton from '@components/ScrollUpButton';
import ScrollDownButton from '@components/ScrollDownButton';
import SVG from '@components/SVG';

/**
 * @param {Object} props 
 * @param {import('@data/index').Match[]} props.data 
 * @param {string} props.lastUpdated Date string
 */
 
function Homepage({
  data, lastUpdated
}) {    
  const document = useDocument();
  const window = useWindow();
  
  const [filters, setFilters] = useState(() => INITIAL_FILTERS);
  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const reset = () => setFilters(INITIAL_FILTERS)

  const [groups] = useState(() => groupByFilters(data))
  const [isScrollToTopVisible, setScrollToTopVisible] = useState(false);

  const toggleFilter = ({target: {id, value}}) => {
    setFilters(() => ({...filters, [id]: value}));
  }

  const [latestMatchRef, setLatestMatchRef] = useState(null);
  
  const matches = [].concat(groups.gender[filters.gender]).filter(cur => groups.youth[filters.youth].find(({id})=>id===cur.id) && groups.televised[filters.televised].find(({id}) => id===cur.id));

  const postponedMatches = data.filter(({postponed}) => !!postponed);
  
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
        <ScrollUpButton visible={isScrollToTopVisible} setVisible={setScrollToTopVisible} />

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
                    <span className="">
                    Last Updated: {dayjs(lastUpdated).format('HH:mm:ss')}
                    </span>
                    {true /** DEV() */ && (
                      <>
                      <br/>
                      <span className="whitespace-nowrap">
                      Last Ran: {dayjs(new Date()).format('HH:mm:ss')}
                      </span>
                      </>
                    )}
                  </span>
                </p>
              </div>
              
              <div className="flex space-x-3">
              <small className="flex items-center text-teal-500">
                <span className="mr-1">
                  <SVG.Eye />
                </span>
                {matches?.length ?? 0}/{data?.length ?? 0}
              </small>
              <small className="flex items-center text-rose-400">
                <span className="mr-1">
                <SVG.EyeOff />
              </span>
              {postponedMatches?.length ?? 0}
              </small>
              </div>
            </div>
          </div>

          {/* SCROLL DOWN */}
          <div className="flex-1 px-0 my-4 md:px-12 md:my-8">
            <ScrollDownButton visible={!!(window && document) && document.body.scrollHeight > window.innerHeight*1.66 && latestMatchRef} />
          </div>
        </div>

        <br/>

        <Matches items={matches} setLatestMatchRef={setLatestMatchRef} />

      </Main>

      <Footer />
      
      </div>
    </>
  )
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
  }
}

export default Homepage;