export default function Main({children}) {
	return (
		<main className="flex-1">
			<div className="max-w-screen-sm px-5 mx-auto sm:px-3 lg:max-w-screen-md md:px-0 2xl:max-w-screen-lg">
				{children}
			</div>
		</main>
	)
}