import { useEffect, useMemo, useState } from "react";
import { userInterface, userListInterface } from "@/types/userInterface";

export function useUsers() {
	const [userList, setUsers] = useState<userListInterface | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState<number>(1);
	const limit = 10;

	const [filterText, setFilterText] = useState("");
	const [sortOption, setSortOption] = useState("base");

	const [favoredUsers, setFavoredUsers] = useState<userInterface[]>([]);

	useEffect(() => {
		setLoading(true);
		setError(null);
		fetchUsers()
			.then((data) => {
				setUsers(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	}, [page]);

	const filteredUsers = useMemo(() => {
		if (userList === null) return [];
		if (!filterText.trim()) return userList.users;
		const lower = filterText.toLowerCase();
		return userList.users.filter((user) =>
			`${user.firstName} ${user.lastName} ${user.email}`
				.toLowerCase()
				.includes(lower)
		);
	}, [userList, filterText]);

	const sortedUsers = useMemo(() => {
		const copy = [...filteredUsers];
		switch (sortOption) {
			case "nameAsc":
				return copy.sort((a, b) => a.lastName.localeCompare(b.lastName));
			case "nameDesc":
				return copy.sort((a, b) => b.lastName.localeCompare(a.lastName));
			case "firstNameAsc":
				return copy.sort((a, b) => a.firstName.localeCompare(b.firstName));
			case "firstNameDesc":
				return copy.sort((a, b) => b.firstName.localeCompare(a.firstName));
			case "ageAsc":
				return copy.sort((a, b) => a.age - b.age);
			case "ageDesc":
				return copy.sort((a, b) => b.age - a.age);
			default:
				return copy;
		}
	}, [filteredUsers, sortOption]);

	const paginatedUsers = useMemo(() => {
		const start = (page - 1) * limit;
		return sortedUsers.slice(start, start + limit);
	}, [sortedUsers, page]);

	const totalPages = Math.ceil(sortedUsers.length / limit);

	const toggleFavoredUser =(user: userInterface) => {
		setFavoredUsers((prev) => {
			console.log("Current favored users before toggle:", prev);

			const exists = prev.some((u) => u.id === user.id);
			console.log("User exists in favored list:", exists);

			const updated = exists
				? prev.filter((u) => u.id !== user.id)
				: [...prev, user];

			console.log("Updated favored users list:", updated);

			localStorage.setItem("favUsers", JSON.stringify(updated));

			return updated;
		});
	};

	useEffect(() => {
		const favUsers = JSON.parse(localStorage.getItem("favUsers") || "[]");
		if (Array.isArray(favUsers)) setFavoredUsers(favUsers);
	}, []);

	useEffect(() => {
		console.log("🔥 favoredUsers updated:", favoredUsers);
	}, [favoredUsers]);

	return {
		userList,
		loading,
		error,
		page,
		setPage,
		filteredUsers,
		setFilterText,
		filterText,
		sortOption,
		setSortOption,
		sortedUsers,
		paginatedUsers,
		totalPages,
		favoredUsers,
		toggleFavoredUser,
	};
}

async function fetchUsers() {
	try {
		const res = await fetch(`https://dummyjson.com/users?limit=1000`);
		if (!res.ok) throw new Error("Erreur réseau");

		const data = await res.json();
		return data;
	} catch (err: any) {
		throw err.message || "Erreur inconnue";
	}
}
