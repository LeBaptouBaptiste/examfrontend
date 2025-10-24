import { notFound } from "next/navigation";
import UserClient from "./userClient";

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	console.log("Fetching user with ID:", id);

	const res = await fetch(`https://dummyjson.com/users/${id}`, {
		cache: "no-store",
	});

	if (!res.ok) notFound();

	const user = await res.json();

	return <UserClient user={user} />;
}
