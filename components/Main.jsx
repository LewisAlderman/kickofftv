import PageWrapper from "./PageWrapper";

export default function Main({children}) {
	return (
		<main className="flex-1 pt-8 pb-20">
			<PageWrapper>
				{children}
			</PageWrapper>
		</main>
	)
}