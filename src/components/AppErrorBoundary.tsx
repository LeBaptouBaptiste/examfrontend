"use client";

import { ErrorBoundary } from "react-error-boundary";

function Fallback({ error, resetErrorBoundary }: any) {
	return (
		<main className="min-h-screen flex flex-col items-center justify-center text-center p-6
			bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
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

export default function AppErrorBoundary({ children }: { children: React.ReactNode }) {
	return (
		<ErrorBoundary
			FallbackComponent={Fallback}
			onReset={() => window.location.reload()}
		>
			{children}
		</ErrorBoundary>
	);
}
