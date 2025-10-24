"use client";

import { useEffect, useState } from "react";
import { userListInterface } from "@/types/userInterface";
import UserList from "./components/userList";

export default function Home() {
	const [users, setUsers] = useState<userListInterface>();

	useEffect(() => {
		fetchData().then((data) => setUsers(data));
	}, []);

	return (
		<main>
			<UserList users={users!} />
		</main>
	);
}

async function fetchData() {
	const data = await fetch("https://dummyjson.com/users");
	return data.json();
}
