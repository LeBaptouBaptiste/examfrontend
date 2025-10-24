"use client";

import { userInterface } from "@/types/userInterface";
import Loading from "@/components/Loading";

export default function UserDetails({ user }: { user: userInterface | null }) {
	if (!user) return <Loading />;

	return (
		<main
			className="min-h-screen flex items-center justify-center p-6 
		bg-gray-100 text-gray-900 
		dark:bg-gray-950 dark:text-gray-100 
		transition-colors duration-300"
		>
			<div
				className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-md dark:shadow-lg border 
			bg-white border-gray-200 
			dark:bg-gray-900 dark:border-gray-800 
			transition-colors duration-300"
			>
				{/* Header */}
				<div
					className="flex flex-col items-center p-8 border-b 
				border-gray-200 dark:border-gray-800 transition-colors"
				>
					<img
						src={user.image || "/default-avatar.png"}
						alt={`${user.firstName} ${user.lastName}`}
						className="w-32 h-32 rounded-full object-cover border 
					border-gray-300 dark:border-gray-700 mb-4"
					/>
					<h2 className="text-2xl font-semibold text-fuchsia-600 dark:text-fuchsia-400 mb-1">
						{user.firstName} {user.lastName}
					</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						{user.email}
					</p>
					<p className="text-sm text-gray-500 dark:text-gray-500">
						{user.company?.title}
					</p>
				</div>

				{/* Infos principales */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 text-sm">
					<div>
						<h3 className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold mb-3">
							Informations personnelles
						</h3>
						<ul className="space-y-1 text-gray-700 dark:text-gray-300">
							<li>
								<span className="text-gray-500 dark:text-gray-500">Âge:</span>{" "}
								{user.age}
							</li>
							<li>
								<span className="text-gray-500 dark:text-gray-500">Genre:</span>{" "}
								{user.gender}
							</li>
							<li>
								<span className="text-gray-500 dark:text-gray-500">
									Groupe sanguin:
								</span>{" "}
								{user.bloodGroup}
							</li>
							<li>
								<span className="text-gray-500 dark:text-gray-500">
									Date de naissance:
								</span>{" "}
								{user.birthDate}
							</li>
							<li>
								<span className="text-gray-500 dark:text-gray-500">Yeux:</span>{" "}
								{user.eyeColor}
							</li>
							<li>
								<span className="text-gray-500 dark:text-gray-500">
									Cheveux:
								</span>{" "}
								{user.hair.color} ({user.hair.type})
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold mb-3">
							Contact & identité
						</h3>
						<ul className="space-y-1 text-gray-700 dark:text-gray-300">
							<li>
								<span className="text-gray-500 dark:text-gray-500">
									Téléphone:
								</span>{" "}
								{user.phone}
							</li>
							<li>
								<span className="text-gray-500 dark:text-gray-500">
									Nom d'utilisateur:
								</span>{" "}
								{user.username}
							</li>
							<li>
								<span className="text-gray-500 dark:text-gray-500">
									Adresse IP:
								</span>{" "}
								{user.ip}
							</li>
							<li>
								<span className="text-gray-500 dark:text-gray-500">
									Adresse MAC:
								</span>{" "}
								{user.macAddress}
							</li>
							<li>
								<span className="text-gray-500 dark:text-gray-500">
									Université:
								</span>{" "}
								{user.university}
							</li>
						</ul>
					</div>
				</div>

				{/* Adresse et entreprise */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 pb-8 text-sm">
					<div>
						<h3 className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold mb-3">
							Adresse
						</h3>
						<p className="text-gray-700 dark:text-gray-300">
							{user.address.address}, {user.address.city},{" "}
							{user.address.stateCode} {user.address.postalCode}
							<br />
							{user.address?.country}
						</p>
					</div>

					<div>
						<h3 className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold mb-3">
							Entreprise
						</h3>
						<p className="text-gray-700 dark:text-gray-300">
							{user.company?.name}
							<br />
							{user.company?.department}
							<br />
							{user.company?.address?.city}, {user.company?.address?.country}
						</p>
					</div>
				</div>

				{/* Crypto & banque */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 pb-10 text-sm">
					<div>
						<h3 className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold mb-3">
							Banque
						</h3>
						<ul className="space-y-1 text-gray-700 dark:text-gray-300">
							<li>
								<span className="text-gray-500 dark:text-gray-500">Type:</span>{" "}
								{user.bank.cardType}
							</li>
							<li>
								<span className="text-gray-500 dark:text-gray-500">
									Numéro:
								</span>{" "}
								{user.bank.cardNumber}
							</li>
							<li>
								<span className="text-gray-500 dark:text-gray-500">
									Expiration:
								</span>{" "}
								{user.bank.cardExpire}
							</li>
							<li>
								<span className="text-gray-500 dark:text-gray-500">IBAN:</span>{" "}
								{user.bank.iban}
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold mb-3">
							Crypto
						</h3>
						<ul className="space-y-1 text-gray-700 dark:text-gray-300">
							<li>
								<span className="text-gray-500 dark:text-gray-500">
									Monnaie:
								</span>{" "}
								{user.crypto.coin}
							</li>
							<li>
								<span className="text-gray-500 dark:text-gray-500">
									Réseau:
								</span>{" "}
								{user.crypto.network}
							</li>
							<li>
								<span className="text-gray-500 dark:text-gray-500">
									Wallet:
								</span>{" "}
								{user.crypto.wallet}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	);
}
