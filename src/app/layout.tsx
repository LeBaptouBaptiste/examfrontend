import type { Metadata } from "next";
import "./globals.css";
import ThemeButton from "@/components/ThemeButton";
import AppErrorBoundary from "@/components/AppErrorBoundary";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
	title: "Examen Frontend",
	description:
		"Application Next.js avec gestion des thèmes et liste d'utilisateurs",
		icons: {
			icon: "/favicon.png",
		},
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
					<Toaster
						position="top-right"
						toastOptions={{
							style: {
								background: "#1f1f1f",
								color: "#fff",
								border: "1px solid #333",
							},
							success: {
								iconTheme: { primary: "#d946ef", secondary: "#fff" },
							},
							error: {
								style: { background: "#7f1d1d", border: "1px solid #ef4444" },
							},
						}}
					/>
				</AppErrorBoundary>
			</body>
		</html>
	);
}
