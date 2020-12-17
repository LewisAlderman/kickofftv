import React from 'react';
import {fields} from '../contexts'

const Filters = ({onFilterChange}) => {	
	return (
		<div className="my-5">
			<div className="flex px-6 py-5 rounded-lg justify-evenly bg-blueGray-200">
				{Object.entries(fields).map(([id, {renderLabel, options}]) => {
					return (
						<span>
							<label htmlFor={id}>{renderLabel}</label>
							<select name={id} id={id} onChange={onFilterChange}>
								{options.map(({value, render}) => (
									<option value={value}>{render}</option>
								))}
							</select>
						</span>
					)
				})}
			</div>
		</div>
	)
}

export default Filters