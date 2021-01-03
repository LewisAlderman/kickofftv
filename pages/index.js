import React, { useState } from 'react';
import Head from 'next/head';
import Cors from 'cors';
import dayjs from 'dayjs';

import { transformBody, URL } from '@data/index';
import { groupByFilters, isWithinHourAndHalf } from 'utils';
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
 * @param {number} props.postponedMatchCount
 */

function Homepage({ data, lastUpdated, postponedMatchCount }) {
  const document = useDocument();
  const window = useWindow();

  const [now] = useState(new Date());

  const [
    isAllMatchesFinishedIconVisible,
    setAllMatchesFinishedIconVisible,
  ] = useState(true);
  const [latestMatchRef, setLatestMatchRef] = useState(null);

  const [filters, setFilters] = useState(() => INITIAL_FILTERS);
  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const reset = () => setFilters(INITIAL_FILTERS);

  const [groups] = useState(() => groupByFilters(data));
  const [isScrollToTopVisible, setScrollToTopVisible] = useState(false);

  const toggleFilter = ({ target: { id, value } }) => {
    setFilters(() => ({ ...filters, [id]: value }));
  };

  const showScrollDownBtn =
    !!(window && document) &&
    document.body.scrollHeight > window.innerHeight * 1.66 &&
    latestMatchRef;

  let isAllMatchesFinished = false;

  const matches = []
    .concat(groups.gender[filters.gender])
    .filter(
      (cur) =>
        groups.youth[filters.youth].find(({ id }) => id === cur.id) &&
        groups.televised[filters.televised].find(({ id }) => id === cur.id),
    )
    .map((details) => {
      const isPast = isWithinHourAndHalf(details.time, now);
      if (!isAllMatchesFinished && isPast) isAllMatchesFinished = true;
      return { ...details, isPast };
    });

  return (
    <>
      <Head>
        <title>Kickoff | UK TV</title>
      </Head>

      <div
        className="flex flex-col min-h-screen ios-safari-full-height bg-blueGray-50 debug-screens"
        onClick={() =>
          isAllMatchesFinishedIconVisible
            ? setAllMatchesFinishedIconVisible(false)
            : null
        }>
        <Navigation
          isFiltersVisible={isFiltersVisible}
          onFilterToggleClick={() => setFiltersVisible((x) => !x)}
        />

        {isFiltersVisible && (
          <Filters
            onFilterChange={toggleFilter}
            reset={reset}
            groups={groups}
          />
        )}

        <Main>
          <ScrollUpButton
            visible={isScrollToTopVisible}
            setVisible={setScrollToTopVisible}
          />

          {/* Date stuff */}
          <div>
            <div
              className="flex mb-4 space-x-3"
              style={{ flex: 9999, flexBasis: 250 }}>
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
                          <br />
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
                  {!!postponedMatchCount && (
                    <small className="flex items-center text-rose-400">
                      <span className="mr-1">
                        <SVG.EyeOff />
                      </span>
                      {postponedMatchCount || 0}
                    </small>
                  )}
                </div>
              </div>
            </div>

            {/* SCROLL DOWN */}
            <div className="flex-1 px-0 my-4 md:px-12 md:my-8">
              <ScrollDownButton visible={showScrollDownBtn} />
            </div>
          </div>

          <br />

          <div className="relative">
            {!!(isAllMatchesFinished && isAllMatchesFinishedIconVisible) && (
              <div className="absolute top-0 z-20 w-full mb-4 text-center isAllMatchesFinished">
                <span className="relative inline-flex items-center justify-center w-48 h-48 overflow-hidden delay-1000 rounded-full -top-2">
                  <span className="z-10 inline-flex flex-col items-center pt-1 text-xl">
                    <span className="inline-block icon text-emerald-600">
                      <SVG.CalendarCheck width="3rem" height="3rem" />
                    </span>
                    <span className="inline-block text-base font-bold uppercase text text-emerald-600">
                      Done
                    </span>
                  </span>
                  <span className="absolute top-0 bottom-0 left-0 right-0 opacity-80 bg-emerald-100 background"></span>
                </span>
              </div>
            )}

            <div
              style={{
                opacity:
                  isAllMatchesFinished && isAllMatchesFinishedIconVisible
                    ? 0.2
                    : 1,
                transition: 'opacity 300ms ease-in-out',
              }}>
              <Matches items={matches} setLatestMatchRef={setLatestMatchRef} />
            </div>
          </div>
        </Main>

        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const matches = await fetch(URL, { mode: Cors({ methods: 'GET' }) })
    .then((res) => res.text())
    .then((body) => {
      const matches = transformBody(body);
      return matches;
    });

  const postponedMatchCount =
    matches.filter(({ postponed }) => !!postponed)?.length ?? 0;

  return {
    props: {
      data: matches,
      lastUpdated: new Date().toJSON(),
      postponedMatchCount,
    },
  };
}

export default Homepage;
