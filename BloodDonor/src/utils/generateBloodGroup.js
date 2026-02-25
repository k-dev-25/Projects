const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function generateBloodGroup(index) {
	return bloodGroups[index % bloodGroups.length];
}

export { bloodGroups };
export default generateBloodGroup;
