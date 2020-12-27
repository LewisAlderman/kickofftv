import React from 'react';

const PageWrapper = ({children, className = '', ...rest}) => {

	return (
		<div className={`max-w-screen-sm px-5 mx-auto sm:px-3 lg:max-w-screen-md md:px-0 2xl:max-w-screen-lg ${className}`}>
			{children}
		</div>
	)
}

export default PageWrapper