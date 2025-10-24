"use client";

import { userInterface } from "@/types/userInterface";
import Link from "next/link";

export default function UserCard({ user }: { user: userInterface }) {
	return (
		<Link
			href={`/user/${user.id}`}
			className="w-full max-w-xs bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-fuchsia-500/20 hover:cursor-pointer"
		>
			<div className="flex flex-col items-center p-6">
				<img
					src={user.image || "/default-avatar.png"}
					alt={`${user.firstName} ${user.lastName}`}
					className="w-24 h-24 rounded-full object-cover border border-gray-700 mb-4"
				/>
				<h3 className="text-lg font-semibold text-gray-100">
					{user.firstName} {user.lastName}
				</h3>
				<p className="text-sm text-gray-400">{user.email}</p>
			</div>
		</Link>
	);
}
