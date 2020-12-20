import React from 'react';
import {fields} from '../contexts'

const Filters = ({onFilterChange, reset, groups}) => {	
	return (
		<div className="my-5">
			<div className="flex px-6 py-5 rounded-lg justify-evenly bg-blueGray-200">
				{Object.entries(fields).map(([id, {renderLabel, options}]) => {
					return (
						<span key={id}>
							<label htmlFor={id}>{renderLabel}</label>
							<select name={id} id={id} onChange={onFilterChange}>
								{options.map(({value, render}) => {
									return <option value={value}>{render} ({groups[id][value].length})</option>
								})}
							</select>
						</span>
					)
				})}

				<button onClick={reset} type="reset">
					Reset
				</button>
			</div>
		</div>
	)
}

export default Filters