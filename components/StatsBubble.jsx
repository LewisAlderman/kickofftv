import dayjs from 'dayjs';
import React from 'react';

const StatsBubble = ({ groups, postponedMatchCount }) => {
  return (
    <div className="relative z-20 flex justify-end">
      <div className="absolute py-6 pl-8 pr-12 rounded bg-blueGray-300 text-blueGray-300 stats-bubble">
        <ul className="space-y-2 text-blueGray-700">
          {!!groups?.gender?.male?.length && (
            <li>
              <span className="inline-flex items-center justify-center w-12 py-0.5 mr-2 font-medium font-mono text-sm rounded-full text-blueGray-200 bg-blueGray-600">
                {groups.gender.male.length}
              </span>
              <span>mens</span>
            </li>
          )}
          {!!groups?.gender?.female?.length && (
            <li>
              <span className="inline-flex items-center justify-center w-12 py-0.5 mr-2 font-medium font-mono text-sm rounded-full text-blueGray-200 bg-blueGray-600">
                {groups.gender.female.length}
              </span>
              <span>womens</span>
            </li>
          )}
          {!!groups?.youth?.true?.length && (
            <li>
              <span className="inline-flex items-center justify-center w-12 py-0.5 mr-2 font-medium font-mono text-sm rounded-full text-blueGray-200 bg-blueGray-600">
                {groups.youth.true.length}
              </span>
              <span>youth players</span>
            </li>
          )}
          {!!postponedMatchCount && (
            <li>
              <span className="inline-flex items-center justify-center w-12 py-0.5 mr-2 font-medium font-mono text-sm rounded-full text-blueGray-200 bg-blueGray-600">
                {postponedMatchCount}
              </span>
              <span>postponed</span>
              {/* postponed details */}
              {groups?.televised?.false?.find(({ postponed }) => postponed) && (
                <ul className="mt-3">
                  {(groups?.televised?.false ?? [])
                    .filter(({ postponed }) => postponed)
                    .map((game) => (
                      <li
                        className="text-xs opacity-75 mb-0.5 ml-4 mt-1"
                        // style={{ listStyleType: 'initial' }}
                        key={game.id}>
                        ↳ {dayjs(game.time).format('h:mmA')}:{' '}
                        {game.teams.join(' v ')}
                      </li>
                    ))}
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StatsBubble;
