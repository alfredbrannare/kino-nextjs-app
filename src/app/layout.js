import Header from "src/components/Header"
import "./globals.css"
import Footer from "src/components/Footer"

export const metadata = {
	title: "Kino Uppsala",
	icons: {
		icon: "/favicon.ico",
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="min-h-screen flex flex-col">
				<Header />
				<main className="flex-1">
					<div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
						{children}
					</div>
				</main>
				<Footer />
			</body>
		</html>
	)
}
