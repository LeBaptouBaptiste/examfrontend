"use client";

import { useState } from "react";
import { userListInterface } from "@/types/userInterface";
import UserCard from "@/components/userCard";

export default function UserList({ users }: { users: userListInterface }) {
	const [filterText, setFilterText] = useState("");
	const [filteredUsers, setFilteredUsers] = useState(users.users);

	return (
		<section className="min-h-screen bg-gray-950 text-gray-100 py-16 px-6">
			<div className="max-w-6xl mx-auto">
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

				{/* Grille responsive */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredUsers.map((user) => (
						<UserCard
							key={user.id}
							user={user}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
