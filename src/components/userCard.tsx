"use client";

import { userInterface } from "@/types/userInterface";
import Link from "next/link";

export default function UserCard({ user, isFav, onToggleFavorite }: { user: userInterface, isFav: boolean, onToggleFavorite: (user: userInterface) => void }) {
	return (
		<Link
			href={`/user/${user.id}`}
			className="relative w-full max-w-xs bg-gray-100 border border-gray-300 text-gray-900
			dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100
			rounded-2xl shadow-md dark:shadow-lg overflow-hidden 
			transition-transform duration-300 
			hover:-translate-y-1 hover:shadow-fuchsia-400/20 dark:hover:shadow-fuchsia-500/20 
			hover:cursor-pointer"
		>
			{/* Étoile en haut à droite */}
			<div className="absolute top-3 right-3 z-10">
				<button
					onClick={(e) => {
						e.preventDefault();
						onToggleFavorite(user);
					}}
					className={`p-1.5 rounded-full backdrop-blur-sm 
					bg-white/70 dark:bg-gray-900/60 
					transition-colors shadow-sm 
					${isFav ? "text-fuchsia-500" : "text-gray-500 hover:text-fuchsia-500"}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill={isFav ? "currentColor" : "none"}
						stroke="currentColor"
						strokeWidth="2"
						className="h-5 w-5"
					>
						<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
					</svg>
				</button>
			</div>

			{/* Contenu de la carte */}
			<div className="flex flex-col items-center p-6">
				<img
					src={user.image || "/default-avatar.png"}
					alt={`${user.firstName} ${user.lastName}`}
					className="w-24 h-24 rounded-full object-cover 
					border border-gray-300 dark:border-gray-700 mb-4 
					bg-gray-200 dark:bg-gray-800"
				/>
				<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
					{user.firstName} {user.lastName}
				</h3>
				<p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
			</div>
		</Link>
	);
}
