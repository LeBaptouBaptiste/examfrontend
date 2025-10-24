"use client";

export default function Loading() {
	return (
		<div
			className="min-h-screen flex flex-col items-center justify-center
			bg-gray-100 text-gray-900 
			dark:bg-gray-950 dark:text-gray-100
			transition-colors duration-300"
		>
			{/* Spinner */}
			<div className="relative w-14 h-14 mb-8">
				<div className="absolute inset-0 rounded-full border-4 border-fuchsia-500/30"></div>
				<div className="absolute inset-0 rounded-full border-4 border-t-fuchsia-500 animate-spin"></div>
			</div>

			{/* Texte animé */}
			<p className="text-lg font-semibold tracking-wide text-fuchsia-600 dark:text-fuchsia-400">
				Chargement
				<span className="inline-block animate-pulse text-fuchsia-400 dark:text-fuchsia-300">
					...
				</span>
			</p>

			{/* Effet d’ambiance subtile */}
			<div className="absolute w-48 h-48 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse -z-10" />
		</div>
	);
}