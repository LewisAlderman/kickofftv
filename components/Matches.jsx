import useWindowResize from 'hooks/useWindowResize';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import { DEV } from '../constants.ts';
import useWindow from 'hooks/useWindow';

/**
 * @param {Object} props 
 * @param {import('@data/index').Match[]} props.items 
 */
 
export default function Matches ({items, setLatestMatchRef}) {		
	const [now] = useState(new Date());
	
	useWindow(() => (window.dayjs = dayjs))
	
	useEffect(() => {
		console.log('items.length changed', items);
	}, [items.length])

	const [imgSize, setImgSize] = useState('100px');
	
	useWindowResize(debounce((w) => {
		if (w.innerWidth >= 1536) setImgSize('130px');
		else if (w.innerWidth <= 640) setImgSize('85px');
		else setImgSize('100px');
	}, 250));
	
	if (!items) return null;
	
	return (
		<>
		<div className="space-y-8 sm:space-y-10 md:space-y-12">
			{items
				.map(({id, teams, channels, competition, time, event, women, postponed}, i) => {
				const [homeTeam, awayTeam] = teams;
				
				const prevDiffTime = i === 0 || items[i-1].time !== time;
				const nextSameTime = items[i+1]?.time === time;
				const isPast = now > dayjs(time).add(105, 'minute');
				
				return (
					<div key={id}>
						<div className="flex flex-row" ref={isPast ? setLatestMatchRef : null}>
							{/**
							 * Time
							 */}
							<div className='w-20 md:w-28 xl:w-36 sm:mt-1 md:mt-2'>
								<div className="relative w-full h-full">
									{/* text */}
									{Boolean(i === 0 || prevDiffTime) && (
										<p className={`relative z-10 text-xs leading-10 uppercase sm:text-sm bg-blueGray-50 ${isPast ? 'text-blueGray-400 md:text-blueGray-300' : 'text-blueGray-600 md:text-blueGray-500'}`}>
											{dayjs(time).format('h:mmA')}
										</p>
									)}
									{/* vertical bar */}
									<div className={
										`absolute bottom-0 top-0 left-6 w-0.5 bg-blueGray-200 rounded-sm ${nextSameTime ? 'top-0 -bottom-16' : 'bottom-4'} ${!prevDiffTime && !nextSameTime ? 'max-h-8' : prevDiffTime && !nextSameTime ? 'max-h-16' : ''}`
									} />
									{/* dash */}
									<div className="absolute w-3 h-0.5 bg-blueGray-200 rounded-full left-6 top-8" />
								</div>
							</div>
								
							<div className="flex flex-col flex-1 sm:flex-row">
								{/**
								 * Team names
								 */}
								<div className="flex-1 space-y-2">
									{[homeTeam, awayTeam].map((team) => {
										if (!team) return null;
										const [teamName, ageGroup] = getTeamNameAndAgeGroup(team);
										
										return (
											<p className="relative text-xl font-bold tracking-wide uppercase 2xl:text-2xl md:text-2xl text-blueGray-900" key={team}>
												<span className="mr-2">{teamName}</span>
												{women ? (
													<sup className="inline-block px-1 font-mono text-xs tracking-tight text-pink-400 bg-pink-100 rounded-full md:text-sm">
													<small>
														{window.innerWidth > 600 ? 'LADIES' : "L"}
													</small>
												</sup>
												) : ageGroup ? (
													<sup className="inline-block px-1 font-mono text-xs text-teal-500 bg-teal-200 rounded-full md:text-sm">
														<small>
															{ageGroup}
														</small>
													</sup>
												) : null}
											</p>
										);
									})}
	
									{!!(event || postponed) && (
										<p className="text-xs font-medium tracking-wide strike sm:text-sm">
											{!!event && (
												<span className={`rounded-full inline-block mr-2 px-3 py-0.5 text-blueGray-700 bg-blueGray-400 ${postponed && 'strike'}`}>
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
									<p className="text-sm font-normal md:text-base text-warmGray-500"> {competition} </p>
								</div>
	
								{/**
								 * Channels
								 */}
								<div className="mt-4 sm:mt-0 sm:ml-6">
									<div className="flex flex-wrap items-center sm:flex-nowrap sm:space-y-2 sm:flex-col" style={{minHeight: 20}}>
											{channels.map(({src, title}) => {
												return (
													<div className="mb-1 mr-2 sm:mr-0 sm:mb-0" key={title}>
														<img src={src} alt={title} title={title} loading="lazy" width={imgSize} height={title.match(/now\s?tv/i) ? "35px" : "19px"} className="transform-gpu blend-mode-darken" />
													</div>
												)
											})}
											{!!postponed && (
												<div className="flex justify-center text-center sm:w-24 text-rose-500">
													<svg xmlns="http://www.w3.org/2000/svg" className="w-6 sm:w-8 xl:w-10" fill="currentColor" viewBox="0 0 24 24"><path d="M4 19h10.879L2.145 6.265C2.054 6.493 2 6.74 2 7v10C2 18.103 2.897 19 4 19zM18 7c0-1.103-.897-2-2-2H6.414L3.707 2.293 2.293 3.707l18 18 1.414-1.414L18 16.586v-2.919L22 17V7l-4 3.333V7z"></path></svg>
												</div>
											)}
										</div>
								</div>
							</div>

						</div>
					</div>
				)
			})}
		</div>
		</>
	)
}

/** @param {string} str */
function getTeamNameAndAgeGroup (str) {
	const rx = /(u|under)\s?\d\d('s|s)?/gi;
	const match = str.match(rx);
	return match?.[0] ? [str.replace(rx, '').trim(), match[0].replace(/.+(\d\d).+/, 'U$1')] : [str];
};