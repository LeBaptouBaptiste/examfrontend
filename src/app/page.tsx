"use client";

import UserList from "@/components/userList";
import Loading from "@/components/Loading";
import { useUsers } from "@/hooks/useUsers";

export default function Home() {
	const { userList, loading, error } = useUsers();

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
					className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 
                text-white rounded-lg text-sm font-medium transition-colors"
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
			{userList ? <UserList /> : <Loading />}
		</main>
	);
}