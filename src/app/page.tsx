"use client";

import { useEffect, useState } from "react";
import { userListInterface } from "@/types/userInterface";
import UserList from "@/components/userList";
import Loading from "@/components/Loading";

export default function Home() {
	const [users, setUsers] = useState<userListInterface | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchData()
			.then((data) => {
				setUsers(data);
				setError(null);
			})
			.catch(() => {
				setError("Impossible de charger les utilisateurs. Vérifie ta connexion ou réessaie plus tard.");
			})
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <Loading />;

	if (error)
		return (
			<main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-100 p-6 text-center">
				<p className="text-fuchsia-400 font-semibold mb-2">Erreur réseau</p>
				<p className="text-gray-400 mb-6">{error}</p>
				<button
					onClick={() => location.reload()}
					className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 rounded-lg text-sm font-medium transition-colors"
				>
					Recharger
				</button>
			</main>
		);

	return (
		<main className="min-h-screen bg-gray-950 text-gray-100">
			{users ? <UserList users={users}/> : <Loading/>}
		</main>
	);
}

async function fetchData() {
  try {
    const res = await fetch("https://dummyjson.com/users");
    if (!res.ok) throw new Error("Erreur de réseau");
    return await res.json();
  } catch (err) {
    throw err;
  }
}
