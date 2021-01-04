import React, { useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import dayjs from 'dayjs';

import useWindowResize from 'hooks/useWindowResize';
import SVG from './SVG';
import { findClosestTeamName } from 'utils';

/**
 * @param {Object} props
 * @param {import('@data/index').Match[]} props.items
 */

export default function Matches({ items, setLatestMatchRef, badges }) {
  const alreadySetLatestMatchRef = useRef(false);

  const [imgSize, setImgSize] = useState('100px');

  useWindowResize(
    debounce((w) => {
      if (w.innerWidth >= 1536) setImgSize('130px');
      else if (w.innerWidth <= 640) setImgSize('85px');
      else setImgSize('100px');
    }, 250),
  );

  if (!items) return null;

  return (
    <>
      <div className="space-y-8 sm:space-y-10 md:space-y-12">
        {items.map(
          (
            {
              id,
              teams,
              channels,
              competition,
              time,
              event,
              women,
              postponed,
              isPast,
            },
            i,
          ) => {
            const [homeTeam, awayTeam] = teams;

            const prevDiffTime = i === 0 || items[i - 1].time !== time;
            const nextSameTime = items[i + 1]?.time === time;

            return (
              <div key={id}>
                <div
                  className="flex flex-row"
                  ref={(r) => {
                    if (!isPast && !alreadySetLatestMatchRef.current) {
                      console.log(r);
                      alreadySetLatestMatchRef.current = true;
                      return setLatestMatchRef(r);
                    }
                    return null;
                  }}>
                  {/**
                   * Time
                   */}
                  <div className="w-20 md:w-28 xl:w-36 sm:mt-1 md:mt-2">
                    <div className="relative w-full h-full">
                      {/* text */}
                      {Boolean(i === 0 || prevDiffTime) && (
                        <p
                          className={`relative z-10 text-xs leading-10 uppercase sm:text-sm bg-blueGray-50 ${
                            isPast
                              ? 'text-blueGray-400 md:text-blueGray-300'
                              : 'text-blueGray-600 md:text-blueGray-500'
                          }`}>
                          {dayjs(time).format('h:mmA')}
                        </p>
                      )}
                      {/* vertical bar */}
                      <div
                        className={`absolute bottom-0 top-0 left-6 w-0.5 bg-blueGray-200 rounded-sm ${
                          nextSameTime ? 'top-0 -bottom-16' : 'bottom-4'
                        } ${
                          !prevDiffTime && !nextSameTime
                            ? 'max-h-8'
                            : prevDiffTime && !nextSameTime
                            ? 'max-h-16'
                            : ''
                        }`}
                      />
                      {/* dash */}
                      <div className="absolute w-3 h-0.5 bg-blueGray-200 rounded-full left-6 top-8" />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 sm:flex-row">
                    {/**
                     * Team names
                     */}
                    <div className="flex-1 space-y-2 md:space-y-3 lg:space-y-4">
                      {[homeTeam, awayTeam].map((team) => {
                        if (!team) return null;
                        const [teamName, ageGroup] = getTeamNameAndAgeGroup(
                          team,
                        );

                        return (
                          <p
                            className="relative flex items-start text-xl font-bold tracking-wide uppercase 2xl:text-2xl md:text-2xl text-blueGray-900"
                            key={team}>
                            <span className="inline-flex w-10 lg:w-14">
                              <Badge
                                className="relative w-6 h-6 lg:w-8 lg:h-8 lg:-top-0.5 md:top-0.5"
                                teamName={teamName}
                                badges={badges}
                              />
                            </span>
                            <span>
                              <span className="mr-2">{teamName}</span>
                              {women ? (
                                <sup className="inline-block px-1 font-mono text-xs tracking-tight text-pink-400 bg-pink-100 rounded-full md:text-sm">
                                  <small>
                                    {window.innerWidth > 600 ? 'LADIES' : 'L'}
                                  </small>
                                </sup>
                              ) : ageGroup ? (
                                <sup className="inline-block px-1 font-mono text-xs text-teal-500 bg-teal-200 rounded-full md:text-sm">
                                  <small>{ageGroup}</small>
                                </sup>
                              ) : null}
                            </span>
                          </p>
                        );
                      })}

                      {!!(event || postponed) && (
                        <p className="pl-10 text-xs font-medium tracking-wide lg:pl-14 strike sm:text-sm">
                          {!!event && (
                            <span
                              className={`rounded-full inline-block mr-2 px-3 py-0.5 text-blueGray-700 bg-blueGray-400 ${
                                postponed && 'strike'
                              }`}>
                              {event}
                            </span>
                          )}
                          {!!postponed && (
                            <span>
                              <small className="inline-block px-2 font-semibold tracking-normal uppercase rounded-full text-rose-500 bg-rose-100">
                                Postponed
                              </small>
                            </span>
                          )}
                        </p>
                      )}

                      {/* competition */}
                      <p className="pl-10 text-sm font-normal lg:pl-14 md:text-base text-warmGray-500">
                        {' '}
                        {competition}{' '}
                      </p>
                    </div>

                    {/**
                     * Channels
                     */}
                    <div className="mt-4 pl-7 sm:mt-0 sm:ml-6 sm:pl-0">
                      <div
                        className="flex flex-wrap items-center sm:flex-nowrap sm:space-y-2 sm:flex-col"
                        style={{ minHeight: 20 }}>
                        {channels.map(({ src, title }) => {
                          return (
                            <div
                              className="mb-1 mr-2 sm:mr-0 sm:mb-0"
                              key={title}>
                              <img
                                src={src}
                                alt={title}
                                title={title}
                                loading="lazy"
                                width={imgSize}
                                height={
                                  title.match(/now\s?tv/i) ? '35px' : '19px'
                                }
                                className="transform-gpu blend-mode-darken"
                              />
                            </div>
                          );
                        })}
                        {!!postponed && (
                          <div className="flex justify-center text-center sm:w-24 text-rose-500">
                            <SVG.Postponed className="w-6 h-6 sm:w-8 sm:h-8 xl:w-10 xl:h-10" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          },
        )}
      </div>
    </>
  );
}

/** @param {string} str */
function getTeamNameAndAgeGroup(str) {
  const rx = /(u|under)\s?\d\d('s|s)?/gi;
  const match = str.match(rx);
  return match?.[0]
    ? [str.replace(rx, '').trim(), match[0].replace(/.+(\d\d).+/, 'U$1')]
    : [str];
}

function Badge({ teamName, badges, className = '', ...restProps }) {
  const match = findClosestTeamName(teamName, badges);

  return (
    <span
      className={`inline-flex items-center w-10 text-blueGray-400 ${className}`}
      {...restProps}>
      {match ? (
        <img
          src={badges[match]}
          className="inline-block h-full"
          alt={match}
          title={teamName}
        />
      ) : (
        <svg
          fill="currentColor"
          className="inline-block h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path d="M21.881,5.223c-0.015-0.378-0.421-0.603-0.747-0.412c-0.672,0.392-1.718,0.898-2.643,0.898 c-0.421,0-0.849-0.064-1.289-0.198c-0.265-0.08-0.532-0.178-0.808-0.309c-1.338-0.639-2.567-1.767-3.696-2.889 C12.506,2.122,12.253,2.027,12,2.023c-0.253,0.004-0.506,0.099-0.698,0.29c-1.129,1.122-2.358,2.25-3.696,2.889c0,0,0,0-0.001,0 C7.33,5.333,7.063,5.431,6.798,5.511c-0.44,0.134-0.869,0.198-1.289,0.198c-0.925,0-1.971-0.507-2.643-0.898 C2.54,4.62,2.134,4.845,2.119,5.223c-0.061,1.538-0.077,4.84,0.688,7.444c1.399,4.763,4.48,7.976,8.91,9.292L11.857,22l0.14-0.014 V22v-0.014H12L12.143,22l0.14-0.041c4.43-1.316,7.511-4.529,8.91-9.292C21.958,10.063,21.941,6.761,21.881,5.223z"></path>
        </svg>
      )}
    </span>
  );
}
