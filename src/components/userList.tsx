"use client";

import { useMemo, useState } from "react";
import { userListInterface } from "@/types/userInterface";
import UserCard from "@/components/userCard";

export default function UserList({ users }: { users: userListInterface }) {
	const [filterText, setFilterText] = useState("");
	const [sortOption, setSortOption] = useState("base");
	const [page, setPage] = useState(1);
	const limit = 10;

	const filteredUsers = useMemo(() => {
		if (!filterText.trim()) return users.users;
		const lower = filterText.toLowerCase();
		return users.users.filter((user) =>
			`${user.firstName} ${user.lastName} ${user.email}`
				.toLowerCase()
				.includes(lower)
		);
	}, [users, filterText]);

	const sortedUsers = useMemo(() => {
		const copy = [...filteredUsers];
		switch (sortOption) {
			case "nameAsc":
				return copy.sort((a, b) => a.lastName.localeCompare(b.lastName));
			case "nameDesc":
				return copy.sort((a, b) => b.lastName.localeCompare(a.lastName));
			case "firstNameAsc":
				return copy.sort((a, b) => a.firstName.localeCompare(b.firstName));
			case "firstNameDesc":
				return copy.sort((a, b) => b.firstName.localeCompare(a.firstName));
			case "ageAsc":
				return copy.sort((a, b) => a.age - b.age);
			case "ageDesc":
				return copy.sort((a, b) => b.age - a.age);
			default:
				return copy;
		}
	}, [filteredUsers, sortOption]);

	const paginatedUsers = useMemo(() => {
		const start = (page - 1) * limit;
		return sortedUsers.slice(start, start + limit);
	}, [sortedUsers, page]);

	const totalPages = Math.ceil(sortedUsers.length / limit);

	return (
		<section
			className="min-h-screen py-16 px-6 
				bg-gray-100 text-gray-900 
				dark:bg-gray-950 dark:text-gray-100 
				transition-colors duration-300"
		>
			<div className="max-w-8xl mx-auto">
				<h2 className="text-3xl font-bold text-fuchsia-600 dark:text-fuchsia-400 mb-10 text-center">
					Liste des utilisateurs
				</h2>

				{/* Barre de recherche */}
				<div className="mb-12 flex justify-center">
					<input
						type="text"
						placeholder="Rechercher par nom, prénom ou email..."
						value={filterText}
						onChange={(e) => {
							setFilterText(e.target.value);
							setPage(1);
						}}
						className="w-full max-w-md px-4 py-2 rounded-lg border 
							border-gray-300 dark:border-gray-700 
							bg-white dark:bg-gray-900 
							text-gray-900 dark:text-gray-100 
							placeholder-gray-500 dark:placeholder-gray-400
							focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
					/>
				</div>

				{/* Tri */}
				<div className="mb-8 flex justify-end">
					<label className="mr-4 text-sm text-gray-600 dark:text-gray-400">
						Trier par :
					</label>
					<select
						value={sortOption}
						onChange={(e) => {
							setSortOption(e.target.value);
							setPage(1);
						}}
						className="px-3 py-2 rounded-lg border 
							border-gray-300 dark:border-gray-700 
							bg-white dark:bg-gray-900 
							text-gray-900 dark:text-gray-100 
							focus:outline-none focus:ring-2 focus:ring-fuchsia-500 
							hover:cursor-pointer transition-colors duration-300"
					>
						<option value="base">Sélectionner</option>
						<option value="nameAsc">Nom croissant</option>
						<option value="nameDesc">Nom décroissant</option>
						<option value="firstNameAsc">Prénom croissant</option>
						<option value="firstNameDesc">Prénom décroissant</option>
						<option value="ageAsc">Âge croissant</option>
						<option value="ageDesc">Âge décroissant</option>
					</select>
				</div>

				{/* Grille responsive */}
				<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
					{paginatedUsers.map((user) => (
						<UserCard key={user.id} user={user} />
					))}
				</div>
			</div>

			{/* Pagination */}
			<div className="mt-12 flex flex-col items-center gap-4">
				<div className="flex items-center gap-3">
					<button
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						disabled={page === 1}
						className={`px-4 py-2 rounded-lg font-medium transition-all ${
							page === 1
								? "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed"
								: "bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-md shadow-fuchsia-900/20 hover:cursor-pointer"
						}`}
					>
						← Précédent
					</button>

					<div
						className="px-4 py-2 text-sm font-semibold 
							text-gray-700 dark:text-gray-300 
							bg-gray-200 dark:bg-gray-800 
							rounded-lg border border-gray-300 dark:border-gray-700"
					>
						Page{" "}
						<span className="text-fuchsia-600 dark:text-fuchsia-400">{page}</span> /{" "}
						{totalPages}
					</div>

					<button
						onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
						disabled={page === totalPages}
						className={`px-4 py-2 rounded-lg font-medium transition-all ${
							page === totalPages
								? "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed"
								: "bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-md shadow-fuchsia-900/20 hover:cursor-pointer"
						}`}
					>
						Suivant →
					</button>
				</div>

				<div className="w-64 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
					<div
						className="h-full bg-fuchsia-500 transition-all duration-500"
						style={{ width: `${(page / totalPages) * 100}%` }}
					/>
				</div>
			</div>
		</section>
	);
}