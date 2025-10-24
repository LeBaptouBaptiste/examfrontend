"use client";

import { useEffect, useState } from "react";
import { userListInterface } from "@/types/userInterface";
import UserCard from "@/components/userCard";

export default function UserList({ users }: { users: userListInterface }) {
	const [filterText, setFilterText] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(users.users);
	const [showedUsers, setShowedUsers] = useState(users.users);
	const [page, setPage] = useState(1);
	const limit = 10;

	useEffect(() => {
		setShowedUsers(users.users.slice((page - 1) * limit, page * limit));
	}, [users]);

	useEffect(() => {
		setShowedUsers(filteredUsers.slice((page - 1) * limit, page * limit));
	}, [filteredUsers, page]);

	return (
		<section className="bg-gray-950 text-gray-100 py-16 px-6">
			<div className="max-w-8xl mx-auto">
				<h2 className="text-3xl font-bold text-fuchsia-400 mb-10 text-center">
					Liste des utilisateurs
				</h2>

				{/* Barre de recherche */}
				<div className="mb-12 flex justify-center">
					<input
						type="text"
						placeholder="Rechercher par nom, prenom ou email..."
						value={filterText}
						onChange={(e) => {
							const text = e.target.value;
							setFilterText(text);
							const filtered = users.users.filter((user) =>
								`${user.firstName} ${user.lastName} ${user.email}`
									.toLowerCase()
									.includes(text.toLowerCase())
							);
							setFilteredUsers(filtered);
						}}
						className="w-full max-w-md px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
					/>
				</div>

				{/* Tri */}
				<div className="mb-8 flex justify-end">
					<label className="mr-4 text-sm text-gray-400">Trier par :</label>
					<select
						onChange={(e) => {
							if (e.target.value === "base") {
								setFilteredUsers(users.users);
							} else if (e.target.value === "nameAsc") {
								setFilteredUsers((prev) =>
									[...prev].sort((a, b) => a.lastName.localeCompare(b.lastName))
								);
							} else if (e.target.value === "ageAsc") {
								setFilteredUsers((prev) =>
									[...prev].sort((a, b) => a.age - b.age)
								);
							} else if (e.target.value === "firstNameAsc") {
								setFilteredUsers((prev) =>
									[...prev].sort((a, b) =>
										a.firstName.localeCompare(b.firstName)
									)
								);
							} else if (e.target.value === "nameDesc") {
								setFilteredUsers((prev) =>
									[...prev].sort((a, b) => b.lastName.localeCompare(a.lastName))
								);
							} else if (e.target.value === "ageDesc") {
								setFilteredUsers((prev) =>
									[...prev].sort((a, b) => b.age - a.age)
								);
							} else if (e.target.value === "firstNameDesc") {
								setFilteredUsers((prev) =>
									[...prev].sort((a, b) =>
										b.firstName.localeCompare(a.firstName)
									)
								);
							}
						}}
						className="px-3 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 hover:cursor-pointer"
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
					{showedUsers.map((user) => (
						<UserCard
							key={user.id}
							user={user}
						/>
					))}
				</div>
			</div>
			<div className="mt-12 flex flex-col items-center gap-4">
				{/* Pagination principale */}
				<div className="flex items-center gap-3">
					<button
						onClick={() => {
							if (page > 1) {
								const newPage = page - 1;
								setPage(newPage);
								setShowedUsers(
									filteredUsers.slice((newPage - 1) * limit, newPage * limit)
								);
							}
						}}
						disabled={page === 1}
						className={`px-4 py-2 rounded-lg font-medium transition-all ${
							page === 1
								? "bg-gray-800 text-gray-500 cursor-not-allowed"
								: "bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-md shadow-fuchsia-900/20 hover:cursor-pointer"
						}`}
					>
						← Précédent
					</button>

					{/* Indicateur de page */}
					<div className="px-4 py-2 text-sm font-semibold text-gray-300 bg-gray-800 rounded-lg border border-gray-700">
						Page <span className="text-fuchsia-400">{page}</span> /{" "}
						{Math.ceil(filteredUsers.length / limit)}
					</div>

					<button
						onClick={() => {
							if (page * limit < filteredUsers.length) {
								const newPage = page + 1;
								setPage(newPage);
								setShowedUsers(
									filteredUsers.slice((newPage - 1) * limit, newPage * limit)
								);
							}
						}}
						disabled={page * limit >= filteredUsers.length}
						className={`px-4 py-2 rounded-lg font-medium transition-all ${
							page * limit >= filteredUsers.length
								? "bg-gray-800 text-gray-500 cursor-not-allowed"
								: "bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-md shadow-fuchsia-900/20 hover:cursor-pointer"
						}`}
					>
						Suivant →
					</button>
				</div>

				{/* Barre de progression visuelle */}
				<div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
					<div
						className="h-full bg-fuchsia-500 transition-all duration-500"
						style={{
							width: `${
								(page / Math.ceil(filteredUsers.length / limit)) * 100
							}%`,
						}}
					/>
				</div>
			</div>
		</section>
	);
}
