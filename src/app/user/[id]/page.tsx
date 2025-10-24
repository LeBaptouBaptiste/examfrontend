"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { userInterface } from "@/types/userInterface";
import Loading from "@/components/Loading";
import UserDetails from "@/components/userDetails";

export default function UserPage() {
	const { id } = useParams<{ id: string }>();
	const [user, setUser] = useState<userInterface | null>(null);

	useEffect(() => {
		fetchUser(parseInt(id)).then((data) => setUser(data));
	}, [id]);

	return <main>{user ? <UserDetails user={user} /> : <Loading />}</main>;
}

async function fetchUser(id: number) {
	const response = await fetch(`https://dummyjson.com/users/${id}`);
	const data = await response.json();
	return data;
}
