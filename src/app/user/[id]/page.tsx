"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { userInterface } from "@/types/userInterface";
import Loading from "@/components/Loading";

export default function UserPage() {
	const { id } = useParams<{ id: string }>();
	const [user, setUser] = useState<userInterface | null>(null);

	useEffect(() => {
		fetchUser(parseInt(id)).then((data) => setUser(data));
	}, [id]);

	return (
		<main className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-6">
			{user ? (
				<div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden p-6">
					<div className="flex flex-col items-center">
						<img
							src={user.image || "/default-avatar.png"}
							alt={`${user.firstName} ${user.lastName}`}
							className="w-32 h-32 rounded-full object-cover border border-gray-700 mb-4"
						/>
						<h2 className="text-2xl font-semibold text-gray-100 mb-2">
							{user.firstName} {user.lastName}
						</h2>
						<p className="text-sm text-gray-400 mb-1">Email: {user.email}</p>
						<p className="text-sm text-gray-400 mb-1">Phone: {user.phone}</p>
						<p className="text-sm text-gray-400">Username: {user.username}</p>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</main>
	);
}

async function fetchUser(id: number) {
	const response = await fetch(`https://dummyjson.com/users/${id}`);
	const data = await response.json();
	return data;
}
