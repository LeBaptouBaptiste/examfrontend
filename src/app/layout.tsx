import type { Metadata } from "next";
import { ErrorBoundary } from "react-error-boundary";
import "./globals.css";
import ThemeButton from "@/components/ThemeButton";

export const metadata: Metadata = {
	title: "Examen Frontend",
	description:
		"Application Next.js avec gestion des thèmes et liste d'utilisateurs",
};

function Fallback({ error, resetErrorBoundary }: any) {
	return (
		<main
			className="min-h-screen flex flex-col items-center justify-center text-center p-6
			bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300"
		>
			<h1 className="text-2xl font-bold text-fuchsia-500 mb-4">
				Une erreur est survenue
			</h1>
			<p className="text-gray-400 mb-6">{error.message}</p>
			<button
				onClick={resetErrorBoundary}
				className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg font-medium transition-all"
			>
				Recharger
			</button>
		</main>
	);
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<body className="transition-colors duration-300">
				<ErrorBoundary
					FallbackComponent={Fallback}
					onReset={() => window.location.reload()}
				>
					{children}
					<ThemeButton />
				</ErrorBoundary>
			</body>
		</html>
	);
}
