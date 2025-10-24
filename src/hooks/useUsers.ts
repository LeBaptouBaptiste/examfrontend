import { useEffect, useMemo, useState, useCallback } from "react";
import { userInterface, userListInterface } from "@/types/userInterface";
import toast from "react-hot-toast";

export function useUsers() {
	const [userList, setUsers] = useState<userListInterface | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState<number>(1);
	const limit = 10;

	const [filterText, setFilterText] = useState("");
	const [sortOption, setSortOption] = useState("base");

	const [favoredUsers, setFavoredUsers] = useState<userInterface[]>([]);

	const fetchUsers = useCallback(async () => {
		try {
			const res = await fetch(`https://dummyjson.com/users?limit=1000`);
			if (!res.ok) throw new Error("Erreur réseau");
			const data = await res.json();
			setUsers(data);
			toast.success(`Utilisateurs chargés depuis le serveur`);
		} catch (err: any) {
			const newUserList = fetchLocalUsers();
			if (newUserList != null) {
				setUsers(newUserList);
				toast.success(`Utilisateurs chargés depuis le cache local`);
			} else {
				setError(err.message || "Erreur inconnue");
				toast.error(`Utilisateurs impossibles à charger`);
			}
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchLocalUsers = useCallback(() => {
		const storedUsers = localStorage.getItem("favUsers");
		if (storedUsers) {
			try {
				const parsedUsers: userInterface[] = JSON.parse(storedUsers);
				const newUserList: userListInterface = {
					users: parsedUsers,
					total: parsedUsers.length,
				};
				return newUserList;
			} catch {
				console.error(
					"Erreur lors de la lecture des utilisateurs favoris depuis le localStorage"
				);
			}
		}
	}, []);

	useEffect(() => {
		setLoading(true);
		setError(null);
		fetchUsers();
	}, [fetchUsers, page]);

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

	const toggleFavoredUser = useCallback((user: userInterface) => {
		setFavoredUsers((prev) => {
			const exists = prev.some((u) => u.id === user.id);
			const updated = exists
				? prev.filter((u) => u.id !== user.id)
				: [...prev, user];

			localStorage.setItem("favUsers", JSON.stringify(updated));
			return updated;
		});
	}, []);

	useEffect(() => {
		const favUsers = JSON.parse(localStorage.getItem("favUsers") || "[]");
		if (Array.isArray(favUsers)) setFavoredUsers(favUsers);
	}, []);

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
