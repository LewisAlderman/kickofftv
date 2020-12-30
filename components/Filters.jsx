import React from 'react';
import {fields} from '../contexts'
import PageWrapper from './PageWrapper';

const Filters = ({onFilterChange, reset, groups}) => {	
	return (
		<div className="sticky z-20 border-t border-emerald-300 bg-emerald-200" ref={(ref) => {
			if (ref) {
				ref.style.top = `${ref.parentElement.querySelector('nav').clientHeight}px`
			}
		}}>
		<PageWrapper>
			<div className="flex flex-col flex-wrap px-6 py-5 md:flex-row justify-evenly">
				{Object.entries(fields).map(([id, {renderLabel, options}]) => {
					return (
						<span key={id}>
							<label className="mr-1 text-sm font-bold tracking-tight uppercase text-emerald-600" htmlFor={id}>{renderLabel}</label>
							<select className="p-1 bg-transparent" name={id} id={id} onChange={onFilterChange}>
								{options.map(({value, render}) => {
									return <option value={value} key={value}>{render} ({groups[id][value].length})</option>
								})}
							</select>
						</span>
					)
				})}

				<button className="px-2 py-3 mt-3 text-sm font-bold tracking-tight uppercase rounded-md md:mt-0 md:py-0 bg-emerald-300 text-emerald-600" onClick={reset} type="reset">
					Reset
				</button>
			</div>
		</PageWrapper>
		</div>
	)
}

export default Filters