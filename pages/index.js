import React, { useState } from 'react';
import Head from 'next/head';
import Cors from 'cors';
import dayjs from 'dayjs';

import { transformBody, URL } from '@data/index';
import { getBadgeMap, BADGES_URL } from '@data/badges';
import { groupByFilters, isWithinHourAndHalf, scrollToTop } from 'utils';
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
import StatsBubble from '@components/StatsBubble';

/**
 * @param {Object} props
 * @param {import('@data/index').Match[]} props.data
 * @param {number} props.postponedMatchCount
 * @param {Object<string,string>} props.badges {teamName: url}
 */

function Homepage({ data, postponedMatchCount, badges }) {
  const document = useDocument();
  const window = useWindow();
  const [now] = useState(new Date());
  const [latestMatchRef, setLatestMatchRef] = useState(null);
  const [isBubbleVisible, setBubbleVisible] = useState(false);

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

  const matches = []
    .concat(groups.gender[filters.gender])
    .filter(
      (cur) =>
        groups.youth[filters.youth].find(({ id }) => id === cur.id) &&
        groups.televised[filters.televised].find(({ id }) => id === cur.id),
    )
    .map((details) => ({
      ...details,
      isPast: isWithinHourAndHalf(details.time, now),
    }));

  return (
    <>
      <Head>
        <title>Kickoff | UK TV</title>
      </Head>

      <div
        className="flex flex-col min-h-screen overflow-x-hidden ios-safari-full-height bg-blueGray-50 debug-screens"
        onPointerDown={({ target }) =>
          isBubbleVisible &&
          !document?.querySelector('.stats-bubble')?.contains(target)
            ? setBubbleVisible(false)
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
              className="flex space-x-3"
              style={{ flex: 9999, flexBasis: 250 }}>
              <div className="flex items-center justify-between flex-grow space-x-3">
                <p className="flex items-end text-blueGray-400 whitespace-nowrap">
                  <span className="mr-2">
                    <SVG.Calendar className="inline-block" />
                  </span>
                  <span className="text-sm font-light lg:text-base">
                    {dayjs().format('ddd D MMMM')}
                  </span>
                </p>

                <button
                  className="relative flex items-end px-10 py-5 space-x-3 text-sm cursor-pointer -right-10"
                  onPointerDown={() => setBubbleVisible(!isBubbleVisible)}>
                  <span className="flex items-center text-teal-500">
                    <span className="mr-1">
                      <SVG.Eye />
                    </span>
                    <span>
                      {matches?.length ?? 0}/{data?.length ?? 0}
                    </span>
                  </span>
                  {!!postponedMatchCount && (
                    <span className="flex items-center text-rose-400">
                      <span className="mr-1">
                        <SVG.EyeOff />
                      </span>
                      <span>{postponedMatchCount || 0}</span>
                    </span>
                  )}
                </button>
              </div>
            </div>

            {isBubbleVisible && (
              <StatsBubble
                groups={groups}
                postponedMatchCount={postponedMatchCount}
              />
            )}

            {/* SCROLL DOWN */}
            <div className="flex-1 px-0 mt-2 mb-4 md:px-12 md:mt-4 md:mb-8">
              <ScrollDownButton visible={showScrollDownBtn} />
            </div>
          </div>

          <br />

          <Matches
            items={matches}
            setLatestMatchRef={setLatestMatchRef}
            badges={badges}
          />

          {!!showScrollDownBtn && (
            <div className="hidden mt-20 lg:grid place-items-center">
              <button
                className="px-32 py-6 text-blueGray-300"
                onClick={scrollToTop}>
                Scroll Back To Top
              </button>
            </div>
          )}
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

  const badges = await fetch(BADGES_URL, { mode: Cors({ methods: 'GET' }) })
    .then((res) => res.text())
    .then((body) => {
      const matches = getBadgeMap(body);
      return matches;
    });

  return {
    props: {
      data: matches,
      postponedMatchCount,
      badges,
      // lastUpdated: new Date().toJSON(),
    },
  };
}

export default Homepage;
