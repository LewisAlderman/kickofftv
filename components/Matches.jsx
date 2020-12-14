/**
 * @param {Object} props 
 * @param {import('@data/index').Match[]} props.items 
 */

export default function Matches ({items}) {	
	if (!items) return null;
	
	return (
		<div className="mt-12 mb-40 space-y-12">
			{items.map(({teams, channels, competition, time}, i) => {
				const [homeTeam, awayTeam] = teams;
				const prevDiffTime = i === 0 || items[i-1].time !== time;
				const nextSameTime = items[i+1]?.time === time;
				
				return (
					<div key={teams.join()}>
						<div className="flex max-w-screen-sm mx-auto">
							{/* Time */}
							<div className='w-28'>
								<div className="relative w-full h-full">
									{/* text */}
									{Boolean(i === 0 || prevDiffTime) && (
										<p className="relative z-10 text-sm leading-10 uppercase text-blueGray-500">{time}</p>
									)}
									{/* vertical bar */}
									<div className={
										`absolute bottom-0 top-0 left-6 w-0.5 bg-blueGray-200 rounded-sm ${nextSameTime ? 'top-0 -bottom-16' : 'bottom-4'} ${!prevDiffTime && !nextSameTime ? 'max-h-8' : prevDiffTime && !nextSameTime ? 'max-h-16' : ''}`
									} />
									{/* dash */}
									<div className="absolute w-3 h-0.5 bg-blueGray-200 rounded-full left-6 top-8" />
								</div>
							</div>
							
							{/* Team names */}
							<div className="flex-1 space-y-2">
								<p className="text-2xl font-bold tracking-wide uppercase text-blueGray-900">{homeTeam}</p>
								<p className="text-2xl font-bold tracking-wide uppercase text-blueGray-900">{awayTeam}</p>

								{/* competition */}
								<p className="font-normal text-warmGray-500"> {competition} </p>
							</div>

							{/* Channels */}
							<div className="ml-6">
								<div className="space-y-2">
										{channels.map(({src, title}) => {
											return (
												<div className="" key={title}>
													<img src={src} alt={title} title={title} loading="lazy" width="100px" height={title.match(/now\s?tv/i) ? "35px" : "19px"} className="transform-gpu blend-mode-darken" />
												</div>
											)
										})}
									</div>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}