"use client";

import { useEffect, useState } from "react";

export default function ThemeButton() {
	const [theme, setTheme] = useState<"light" | "dark" | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const saved = localStorage.getItem("theme");
		if (saved === "light" || saved === "dark") {
			setTheme(saved);
			document.documentElement.classList.toggle("dark", saved === "dark");
		} else {
			const prefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches;
			const initial = prefersDark ? "dark" : "light";
			setTheme(initial);
			document.documentElement.classList.toggle("dark", prefersDark);
		}
	}, []);

	const toggleTheme = () => {
		if (!theme) return;
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
		localStorage.setItem("theme", newTheme);
	};

	if (!theme) return null;

	return (
		<button
			onClick={toggleTheme}
			title={
				theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"
			}
			className="fixed top-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full
				bg-white dark:bg-gray-900
				text-gray-800 dark:text-yellow-300
				border border-gray-300 dark:border-gray-700
				shadow-lg hover:shadow-fuchsia-500/30
				hover:scale-105 active:scale-95
				transition-all duration-300 ease-out group"
		>
			<div className="relative w-6 h-6 transition-transform duration-700 group-hover:rotate-180">
				{theme === "dark" ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-6 h-6 text-yellow-300"
					>
						<path d="M12 3v1m0 16v1m9-9h1M4 12H3m15.364-7.364l.707.707M5.636 18.364l-.707.707M18.364 18.364l.707-.707M5.636 5.636l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-6 h-6 text-gray-800"
					>
						<path d="M21.752 15.002A9.718 9.718 0 0112 21.75a9.75 9.75 0 010-19.5 9.718 9.718 0 019.752 6.748A7.5 7.5 0 0021.752 15z" />
					</svg>
				)}
			</div>
		</button>
	);
}
