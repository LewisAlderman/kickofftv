import React from 'react';

import { DEV } from '../constants.ts';
import useWindow from 'hooks/useWindow';

import PageWrapper from './PageWrapper';
import SVG from './SVG';

export default function Navigation({ isFiltersVisible, onFilterToggleClick }) {
  const window = useWindow();

  return (
    <nav className="sticky top-0 z-40 flex flex-col py-2 lg:relative bg-emerald-400 text-emerald-900 pt-safe-top">
      <PageWrapper className="flex items-center flex-1 w-full h-full px-0">
        <div className="flex items-center justify-center flex-1 w-full h-full lg:justify-between">
          {/* LOGO */}
          <span className="text-2xl font-extrabold transform -skew-x-12 -skew-y-3 md:text-xl logo">
            KICK
            <span className="text-white">OFF</span>
            <span className="absolute icon">
              <SVG.TV
                className="text-emerald-600"
                width=".75em"
                height=".75em"
              />
              <span className="text-xs text-emerald-300">
                <small>TV</small>
              </span>
            </span>
          </span>

          {/* FILTER TOGGLE */}
          <button
            onClick={onFilterToggleClick}
            className={`absolute p-3 rounded-lg md:p-1.5 right-4 lg:relative lg:right-0 text-emerald-700 ${
              isFiltersVisible ? 'bg-emerald-600' : 'bg-emerald-500'
            }`}>
            <SVG.Filter
              width="22"
              height="22"
              fill={isFiltersVisible ? 'currentColor' : 'none'}
              strokeWidth={isFiltersVisible ? '1' : '2.25'}
            />
          </button>
        </div>
      </PageWrapper>

      {/* REFRESH ICON */}
      {window && (
        <button
          onClick={() => window.location.reload()}
          disabled={!window?.navigator?.onLine}
          style={!window?.navigator?.onLine ? { pointerEvents: 'none' } : null}
          className={`absolute p-3 rounded-md hover:bg-emerald-300 active:bg-emerald-500 bottom-1 left-4 ${
            DEV() ? 'block' : 'standalone:block hidden'
          }`}>
          {window?.navigator.onLine ? (
            <SVG.Refresh
              className="text-emerald-700 animate-spin animate-1"
              width="33"
              height="33"
            />
          ) : (
            <SVG.WifiOff
              className="text-emerald-800 animate-pulse animate-3"
              width="33"
              height="33"
            />
          )}
        </button>
      )}
    </nav>
  );
}
