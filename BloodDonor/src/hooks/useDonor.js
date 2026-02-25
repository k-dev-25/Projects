import { useEffect, useState } from "react";
import generateBloodGroup from "../utils/generateBloodGroup.js";

function useDonor() {
	const [loading, setLoading] = useState(true);
	const [donors, setDonors] = useState([]);
	const [selectedBloodGroup, setSelectedBloodGroup] = useState(() => {
		const storedValue = localStorage.getItem("bloodGroup");
		return storedValue ?? "All";
	});
	const [cityQuery, setCityQuery] = useState("");
	const [availabilitySort, setAvailabilitySort] = useState("available-first");
	const [requestStatusByDonor, setRequestStatusByDonor] = useState(() => {
		const storedValue = localStorage.getItem("status");
		return storedValue ? JSON.parse(storedValue) : {};
	});

	useEffect(() => {
		const controller = new AbortController();

		async function fetchDonors() {
			try {
				setLoading(true);
				const response = await fetch("https://jsonplaceholder.typicode.com/users", {
					signal: controller.signal,
				});
				const users = await response.json();

				const mappedDonors = users.map((user, index) => ({
					id: user.id,
					name: user.name,
					city: user.address?.city ?? "Unknown",
					bloodGroup: generateBloodGroup(index),
					available: index % 3 !== 0,
				}));

				setDonors(mappedDonors);
				setRequestStatusByDonor((previousStatus) =>
					Object.fromEntries(
						mappedDonors.map((donor) => [donor.id, Boolean(previousStatus[donor.id])]),
					),
				);
			} catch (error) {
				if (error.name !== "AbortError") {
					setDonors([]);
					setRequestStatusByDonor({});
				}
			} finally {
				setLoading(false);
			}
		}

		fetchDonors();

		return () => controller.abort();
	}, []);

	useEffect(() => {
		localStorage.setItem("bloodGroup", selectedBloodGroup);
	}, [selectedBloodGroup]);

	useEffect(() => {
		localStorage.setItem("status", JSON.stringify(requestStatusByDonor));
	}, [requestStatusByDonor]);

	const bloodGroupFilteredDonors =
		selectedBloodGroup === "All"
			? donors
			: donors.filter((donor) => donor.bloodGroup === selectedBloodGroup);

	const cityFilteredDonors = bloodGroupFilteredDonors.filter((donor) =>
		donor.city.toLowerCase().includes(cityQuery.trim().toLowerCase()),
	);

	const filteredDonors = [...cityFilteredDonors].sort((firstDonor, secondDonor) => {
		if (availabilitySort === "available-first") {
			return Number(secondDonor.available) - Number(firstDonor.available);
		}

		return Number(firstDonor.available) - Number(secondDonor.available);
	});

	const availableDonorCount = filteredDonors.filter((donor) => donor.available).length;

	function markRequestSent(donorId) {
		setRequestStatusByDonor((previousStatus) => ({
			...previousStatus,
			[donorId]: true,
		}));
	}

	return {
		loading,
		donors,
		selectedBloodGroup,
		setSelectedBloodGroup,
		cityQuery,
		setCityQuery,
		availabilitySort,
		setAvailabilitySort,
		filteredDonors,
		availableDonorCount,
		requestStatusByDonor,
		markRequestSent,
	};
}

export default useDonor;
