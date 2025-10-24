"use client";

import { userListInterface } from "@/types/userInterface";
import UserCard from "@/components/userCard";

export default function UserList({ users }: { users: userListInterface }) {
	return (
		<section className="min-h-screen bg-gray-950 text-gray-100 py-16 px-6">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-3xl font-bold text-fuchsia-400 mb-10 text-center">
					Liste des utilisateurs
				</h2>

				{/* Grille responsive */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{users.users.map((user) => (
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
