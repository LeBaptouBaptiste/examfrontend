"use client";

import { useEffect, useState } from "react";
import { userListInterface } from "@/types/userInterface";
import UserList from "@/components/userList";
import Loading from "@/components/Loading";

export default function Home() {
	const [users, setUsers] = useState<userListInterface>();

	useEffect(() => {
		fetchData().then((data) => setUsers(data));
	}, []);

	return (
		<main>
      {users ? <UserList users={users} /> : <Loading />}
		</main>
	);
}

async function fetchData() {
	const data = await fetch("https://dummyjson.com/users");
	return data.json();
}
