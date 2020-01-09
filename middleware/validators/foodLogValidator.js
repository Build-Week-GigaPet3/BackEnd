module.exports = {
	validateFoodLog
};

function validateFoodLog(log) {
	const { food_item, food_category_id, parent_id } = log;

	let errors = [];

	if (!food_item) {
		errors.push('Please provide a food item for this food log.');
	}

	if (!food_category_id) {
		errors.push('Please provide a food category id for this food log.');
	}

	if (!parent_id) {
		errors.push('Please provide a parent account ID for this food log.');
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
