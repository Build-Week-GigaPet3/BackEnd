const router = require('express').Router();

const Category = require('./category-model');
const FoodLog = require('./log-model');

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

// PUT endpoint to enable editing food log with specifid ID
router.put('/logs/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	FoodLog.update(id, changes)
		.then(log => {
			if (log) {
				res
					.status(200)
					.json({ message: 'Food log update was successful.', log });
			} else {
				res.status(404).json({ message: 'The log could not be found.' });
			}
		})
		.catch(err => {
			console.log('Error updating food log.', err);
			res.status(500).json({ error: 'Error updating food log.' });
		});
});

module.exports = router;
