import { createContext, useContext } from 'react';

const MatchesContext = createContext([]);
export const useMatchesContext = () => useContext(MatchesContext);
export const MatchesContextProvider = ({children, ...rest}) => {
  return <MatchesContext.Provider {...rest}>{children}</MatchesContext.Provider>
}

export const INITIAL_FILTERS = {
	gender: 'male',
  youth: false,
  televised: true,
}

export const fields = {
	gender: {
		renderLabel: 'Gender:',
		options: [
			{value: 'male', render: 'Male'},
			{value: 'female', render: 'Female'},
			{value: 'both', render: 'Both'}
		]
	},
	youth: {
		renderLabel: 'Youth:',
		options: [
			{value: false, render: 'Hide'},
			{value: true, render: 'Show'},
		]
	},
	televised: {
		renderLabel: 'Televised:',
		options: [
			{value: true, render: 'Only Televised'},
			{value: false, render: 'Non-televised'},
			{value: 'both', render: 'Both'},
		]
	},
}

const FiltersContext = createContext(INITIAL_FILTERS);
export const useFiltersContext = () => useContext(FiltersContext);
export const FiltersContextProvider = ({children, ...rest}) => {
  return <FiltersContext.Provider {...rest}>{children}</FiltersContext.Provider>
}