const router = require('express').Router();

const { validatePet } = require('../middleware/validators/petsValidator');

const Parents = require('./parents-model');
const Pets = require('../pets/pets-model');
const FoodLog = require('../food/log-model');

// GET endpoint to retrieve parent account
router.get('/', (req, res) => {
	Parents.find()
		.then(parents => {
			res.status(200).json(parents);
		})
		.catch(err => {
			console.log('Error retrieving account.', err);
			res.status(500).json({ error: 'Error retrieving the account.' });
		});
});

// PUT endpoint to enable updating parent account
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	Parents.update(id, changes)
		.then(parent => {
			if (parent) {
				res.status(200).json(parent);
			} else {
				res.status(404).json({ message: 'The account could not be found.' });
			}
		})
		.catch(err => {
			console.log('Error updating account.', err);
			res.status(500).json({ error: 'Error updating the account.' });
		});
});

// DELETE endpoint to remove parent account by specified ID
router.delete('/:id', (req, res) => {
	const { id } = req.params;

	Parents.remove(id)
		.then(count => {
			if (count > 0) {
				res
					.status(200)
					.json({ message: 'The account has been successfully deleted.' });
			} else {
				res.status(404).json({ message: 'The account could not be found.' });
			}
		})
		.catch(err => {
			console.log('Error deleting account.', err);
			res.status(500).json({ error: 'Error deleting the account.' });
		});
});

// ******** SUB ROUTES *********
// POST endpoint to add a new Gigapet to a parent account
router.post('/:id/pets', (req, res) => {
	const petInfo = { ...req.body, parent_id: req.params.id };

	// validates required info is provided to create a new pet
	const validation = validatePet(petInfo);

	if (validation.success) {
		Pets.add(petInfo)
			.then(pet => {
				res.status(201).json(pet);
			})
			.catch(err => {
				console.log('Error creating new Gigapet.', err);
				res.status(500).json({ error: 'Error creating new Gigapet.' });
			});
	} else {
		res.status(400).json(validation);
	}
});

// GET endpoint to retrieve Gigapet for parent account
router.get('/:id/pets', (req, res) => {
	Parents.findMyGigapet(req.params.id)
		.then(pets => {
			res.status(200).json(pets);
		})
		.catch(err => {
			console.log('Error retrieving Gigapet for specified account.', err);
			res
				.status(500)
				.json({ error: 'Error retrieving Gigpet for specified account.' });
		});
});

// POST endpoint to add a new food log for parent account
router.post('/:id/food/logs', (req, res) => {
	const logInfo = { ...req.body, parent_id: req.params.id };

	FoodLog.add(logInfo)
		.then(log => {
			res.status(201).json(log);
		})
		.catch(err => {
			console.log('Error creating new food log.', err);
			res.status(500).json({ error: 'Error creating new food log.' });
		});
});

// GET endpoint to retrieve food logs for parent account
router.get('/:id/food/logs', (req, res) => {
	Parents.findFoodLogs(req.params.id)
		.then(logs => {
			res.status(200).json(logs);
		})
		.catch(err => {
			console.log('Error retrieving food logs.', err);
			res.status(500).json({ error: 'Error retrieving food logs.' });
		});
});

module.exports = router;
