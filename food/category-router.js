const router = require('express').Router();

const Category = require('./category-model');

// GET endpoint to retrieve list of food categories
router.get('/', (req, res) => {
	Category.find()
		.then(categories => {
			res.status(200).json(categories);
		})
		.catch(err => {
			console.log('Error retrieving food categories.', err);
			res.status(500).json({ error: 'Error retrieving food categories.' });
		});
});

module.exports = router;
