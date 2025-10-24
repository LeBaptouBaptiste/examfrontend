"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { userInterface } from "@/types/userInterface";
import Loading from "@/components/Loading";
import UserDetails from "@/components/userDetails";

export default function UserPage() {
	const { id } = useParams<{ id: string }>();
	const [user, setUser] = useState<userInterface | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetchUser(parseInt(id))
			.then((data) => {
				setUser(data);
				setError(null);
			})
			.catch(() => {
				setError(
					"Impossible de charger les détails de l'utilisateur. Vérifie ta connexion ou réessaie plus tard."
				);
			})
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) return <Loading />;

	if (error)
		return (
			<main
				className="min-h-screen flex flex-col items-center justify-center 
			bg-gray-100 text-gray-900 
			dark:bg-gray-950 dark:text-gray-100 
			p-6 text-center transition-colors duration-300"
			>
				<p className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold mb-2">
					Erreur réseau
				</p>
				<p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>

				<button
					onClick={() => location.reload()}
					className="px-4 py-2 rounded-lg text-sm font-medium transition-colors
					bg-fuchsia-600 hover:bg-fuchsia-700 text-white
					shadow-md shadow-fuchsia-900/20"
				>
					Recharger
				</button>
			</main>
		);

	return (
		<main
			className="min-h-screen 
		bg-gray-100 text-gray-900 
		dark:bg-gray-950 dark:text-gray-100 
		transition-colors duration-300"
		>
			{user ? <UserDetails user={user} /> : <Loading />}
		</main>
	);
}

async function fetchUser(id: number) {
	try {
		const response = await fetch(`https://dummyjson.com/users/${id}`);
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error("Failed to fetch user data");
	}
}
