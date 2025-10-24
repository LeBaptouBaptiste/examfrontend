"use client";

import { userInterface } from "@/types/userInterface";
import Loading from "@/components/Loading";
import UserDetails from "@/components/userDetails";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UserClient() {
	const { id } = useParams();
	const [currentUser, setCurrentUser] = useState<userInterface | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		async function loadUser() {
			try {
				const favUsers = JSON.parse(localStorage.getItem("favUsers") || "[]");
				const cachedUser = favUsers.find((u: userInterface) => u.id === Number(id));
				
				if (cachedUser) {
					setCurrentUser(cachedUser);
					setLoading(false);
					toast.success(`Utilisateur ${cachedUser.firstName} chargé depuis le cache local`);
					return;
				}

				const res = await fetch(`https://dummyjson.com/users/${id}`);
				
				if (!res.ok) {
					if (res.status === 404) {
						toast.error("Impossible de charger l'utilisateur depuis le serveur");
						router.push("/user");
						return;
					}
					throw new Error(`Erreur ${res.status}`);
				}

				const user = await res.json();
				setCurrentUser(user);
				setLoading(false);
				toast.success(`Utilisateur ${user.firstName} chargé depuis le serveur`);

			} catch (err) {
				setError(err instanceof Error ? err.message : "Erreur inconnue");
				setLoading(false);
				toast.error("Impossible de charger l'utilisateur");
			}
		}

		loadUser();
	}, [id, router]);

	if (loading) {
		return (
			<main className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center">
				<Loading />
			</main>
		);
	}

	if (error) {
		return (
			<main className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col items-center justify-center gap-4">
				<p className="text-red-500">Erreur: {error}</p>
				<button
					onClick={() => router.back()}
					className="px-4 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
				>
					← Retour
				</button>
			</main>
		);
	}

	if (!currentUser) {
		return null;
	}

	return (
		<main
			className="min-h-screen bg-gray-100 text-gray-900 
			dark:bg-gray-950 dark:text-gray-100 
			transition-colors duration-300"
		>
			<button
				onClick={() => router.back()}
				className="m-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                bg-fuchsia-600 hover:bg-fuchsia-700 text-white
                shadow-md shadow-fuchsia-900/20 hover:cursor-pointer"
			>
				← Retour
			</button>

			<UserDetails user={currentUser} />
		</main>
	);
}