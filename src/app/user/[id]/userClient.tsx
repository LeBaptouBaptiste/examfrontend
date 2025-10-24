"use client";

import { userInterface } from "@/types/userInterface";
import Loading from "@/components/Loading";
import UserDetails from "@/components/userDetails";
import { useState } from "react";

export default function UserClient({ user }: { user: userInterface }) {
	const [loading, setLoading] = useState(false);

	if (loading) return <Loading />;

	return (
		<main
			className="min-h-screen bg-gray-100 text-gray-900 
			dark:bg-gray-950 dark:text-gray-100 
			transition-colors duration-300"
		>
			<button
				onClick={() => history.back()}
				className="m-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                bg-fuchsia-600 hover:bg-fuchsia-700 text-white
                shadow-md shadow-fuchsia-900/20 hover:cursor-pointer"
			>
				← Retour
			</button>

			<UserDetails user={user} />
		</main>
	);
}
