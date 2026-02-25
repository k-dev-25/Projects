import DonorCard from "./DonorCard.jsx";

function DonorList({ donors, requestStatusByDonor, onRequestHelp }) {
	return (
		<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
			{donors.map((donor) => (
				<DonorCard
					key={donor.id}
					donor={donor}
					isRequestSent={Boolean(requestStatusByDonor[donor.id])}
					onRequestHelp={onRequestHelp}
				/>
			))}
		</div>
	);
}

export default DonorList;
