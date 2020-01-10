module.exports = {
	validateParent
};

function validateParent(parent) {
	const { username, password } = parent;

	let errors = [];

	if (!username) {
		errors.push('A username is required to create new parent account.');
	}

	if (!password) {
		errors.push('A password is required to create new parent account.');
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
