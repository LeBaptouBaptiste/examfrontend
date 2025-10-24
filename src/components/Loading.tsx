"use client";

export default function Loading() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-100">
			{/* Spinner */}
			<div className="w-12 h-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin mb-6"></div>

			{/* Texte animé par points */}
			<p className="text-lg text-fuchsia-300 font-medium tracking-wide">
				Chargement<span className="animate-pulse">...</span>
			</p>
		</div>
	);
}
