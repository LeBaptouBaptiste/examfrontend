import type { Metadata } from "next";
import "./globals.css";
import ThemeButton from "@/components/ThemeButton";
import AppErrorBoundary from "@/components/AppErrorBoundary";

export const metadata: Metadata = {
	title: "Examen Frontend",
	description:
		"Application Next.js avec gestion des thèmes et liste d'utilisateurs",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<body className="transition-colors duration-300">
				<AppErrorBoundary>
					{children}
					<ThemeButton />
				</AppErrorBoundary>
			</body>
		</html>
	);
}
