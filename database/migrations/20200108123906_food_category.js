exports.up = function(knex) {
	return knex.schema.createTable('food_category', tbl => {
		tbl.increments();

		tbl.string('category_name', 128).notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('food_category');
};
