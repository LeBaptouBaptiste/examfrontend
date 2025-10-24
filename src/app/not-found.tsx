"use client";

export default function NotFound() {
	return (
		<main className="min-h-screen flex flex-col items-center justify-center 
			bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100 
			transition-colors duration-300 p-6 text-center">
			<h1 className="text-4xl font-bold text-fuchsia-600 dark:text-fuchsia-400 mb-3">
				Page introuvable
			</h1>
			<p className="text-gray-600 dark:text-gray-400 mb-8">
				Désolé, la page que tu cherches n’existe pas.
			</p>
			<a
				href="/"
				className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 
				rounded-lg text-white font-medium transition-all"
			>
				Retour à l’accueil
			</a>
		</main>
	);
}
