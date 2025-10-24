import type { Metadata } from "next";
import "./globals.css";
import ThemeButton from "@/components/ThemeButton";

export const metadata: Metadata = {
	title: "Examen Frontend",
	description: "Application Next.js avec gestion des thèmes et liste d'utilisateurs",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<body>
				{children}
        <ThemeButton />
			</body>
		</html>
	);
}
