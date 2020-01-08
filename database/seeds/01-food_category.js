exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('food_category')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('food_category').insert([
				{ category_name: 'Fruit' },
				{ category_name: 'Vegetable' },
				{ category_name: 'Grain' },
				{ category_name: 'Meat' },
				{ category_name: 'Dairy' },
				{ category_name: 'Fat' },
				{ category_name: 'Treat' }
			]);
		});
};
