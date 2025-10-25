import { renderHook, act, waitFor } from "@testing-library/react";
import { useUsers } from "../useUsers";

// On mocke le fetch, les toasts et le localStorage
global.fetch = vi.fn();
vi.mock("react-hot-toast", () => ({
	default: {
		success: vi.fn(),
		error: vi.fn(),
	},
}));

describe("useUsers hook", () => {
	const mockUser = {
		id: 1,
		firstName: "Emily",
		lastName: "Johnson",
		maidenName: "Smith",
		age: 28,
		gender: "female",
		email: "emily.johnson@x.dummyjson.com",
		phone: "+81 965-431-3024",
		username: "emilys",
		password: "emilyspass",
		birthDate: "1996-5-30",
		image: "https://dummyjson.com/icon/emilys/128",
		bloodGroup: "O-",
		height: 193.24,
		weight: 63.16,
		eyeColor: "Green",
		hair: {
			color: "Brown",
			type: "Curly",
		},
		ip: "42.48.100.32",
		address: {
			address: "626 Main Street",
			city: "Phoenix",
			state: "Mississippi",
			stateCode: "MS",
			postalCode: "29112",
			coordinates: {
				lat: -77.16213,
				lng: -92.084824,
			},
			country: "United States",
		},
		macAddress: "47:fa:41:18:ec:eb",
		university: "University of Wisconsin--Madison",
		bank: {
			cardExpire: "03/26",
			cardNumber: "9289760655481815",
			cardType: "Elo",
			currency: "CNY",
			iban: "YPUXISOBI7TTHPK2BR3HAIXL",
		},
		company: {
			department: "Engineering",
			name: "Dooley, Kozey and Cronin",
			title: "Sales Manager",
			address: {
				address: "263 Tenth Street",
				city: "San Francisco",
				state: "Wisconsin",
				stateCode: "WI",
				postalCode: "37657",
				coordinates: {
					lat: 71.814525,
					lng: -161.150263,
				},
				country: "United States",
			},
		},
		ein: "977-175",
		ssn: "900-590-289",
		userAgent:
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
		crypto: {
			coin: "Bitcoin",
			wallet: "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
			network: "Ethereum (ERC20)",
		},
		role: "admin",
	};
	const mockData = { users: [mockUser], total: 1 };

	beforeEach(() => {
		vi.clearAllMocks();
		localStorage.clear();
	});

	it("should fetch users successfully", async () => {
		(fetch as any).mockResolvedValueOnce({
			ok: true,
			json: async () => mockData,
		});

		const { result } = renderHook(() => useUsers());

		await waitFor(() => expect(result.current.loading).toBe(false));
		expect(result.current.userList?.users.length).toBe(1);
		expect(result.current.error).toBeNull();
	});

	it("should handle fetch error and fallback to localStorage", async () => {
		// simulate fetch failure
		(fetch as any).mockRejectedValueOnce(new Error("Network error"));
		localStorage.setItem("favUsers", JSON.stringify([mockUser]));

		const { result } = renderHook(() => useUsers());
		await waitFor(() => expect(result.current.loading).toBe(false));

		expect(result.current.userList?.users[0].firstName).toBe("Emily");
	});

	it("should filter users correctly", async () => {
		(fetch as any).mockResolvedValueOnce({
			ok: true,
			json: async () => mockData,
		});

		const { result } = renderHook(() => useUsers());
		await waitFor(() => expect(result.current.loading).toBe(false));

		act(() => {
			result.current.setFilterText("john");
		});

		expect(result.current.filteredUsers.length).toBe(1);
		act(() => {
			result.current.setFilterText("xyz");
		});
		expect(result.current.filteredUsers.length).toBe(0);
	});

	it("should toggle favorite users correctly", async () => {
		(fetch as any).mockResolvedValueOnce({
			ok: true,
			json: async () => mockData,
		});

		const { result } = renderHook(() => useUsers());
		await waitFor(() => expect(result.current.loading).toBe(false));

		act(() => {
			result.current.toggleFavoredUser(mockUser);
		});
		expect(result.current.favoredUsers.length).toBe(1);

		act(() => {
			result.current.toggleFavoredUser(mockUser);
		});
		expect(result.current.favoredUsers.length).toBe(0);
	});
});
