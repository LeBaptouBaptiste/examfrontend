"use client";

export default function UserNotFound() {
	return (
		<main
			className="min-h-screen flex flex-col items-center justify-center 
			bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100 
			p-6 text-center transition-colors duration-300"
		>
			<img
				src="/default-avatar.png"
				alt="User not found"
				className="w-20 h-20 rounded-full opacity-80 mb-6
						   dark:bg-fuchsia-300"
			/>
			<h1 className="text-3xl font-bold text-fuchsia-600 dark:text-fuchsia-400 mb-2">
				Utilisateur introuvable
			</h1>
			<p className="text-gray-600 dark:text-gray-400 mb-6">
				Cet utilisateur n’existe pas ou a été supprimé.
			</p>
			<a
				href="/"
				className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 
				rounded-lg text-white font-medium transition-all"
			>
				Retour à la liste des utilisateurs
			</a>
		</main>
	);
}
