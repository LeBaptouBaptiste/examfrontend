"use client";

import { useEffect, useState } from "react";
import { user, userList } from "@/app/types/userInterface";

export default function Home() {
	const [users, setUsers] = useState<userList>();

	useEffect(() => {
		fetchData().then((data) => setUsers(data));
	}, []);

	return (
		<main>
			<h1>Welcome to Next.js!</h1>
			{users?.users.map((user) => (
				<div key={user.id}>
					<h2>
						{user.firstName} {user.lastName}
					</h2>
				</div>
			))}
		</main>
	);
}

async function fetchData() {
	const data = await fetch("https://dummyjson.com/users");
	return data.json();
}
