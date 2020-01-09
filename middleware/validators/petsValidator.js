module.exports = {
	validatePet
};

function validatePet(pet) {
	const { pet_name, pet_type, parent_id } = pet;

	let errors = [];

	if (!pet_name) {
		errors.push('Please provide a name for your pet.');
	}

	if (!pet_type) {
		errors.push('Please provide type of pet.');
	}

	if (!parent_id) {
		errors.push('Please provide account ID of parent.');
	}

	let success = errors.length === 0;
	let errorMessage = success
		? ''
		: 'The info is not valid, see errors for details.';
	return {
		success,
		errorMessage,
		errors
	};
}
