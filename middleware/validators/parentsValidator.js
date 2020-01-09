module.exports = {
	validateParent
};

function validateParent(parent) {
	const { username, password } = parent;

	let errors = [];

	if (!username) {
		errors.push('Please provide a username for the parent account.');
	}

	if (!password) {
		errors.push('Please provide a password for the parent account.');
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
