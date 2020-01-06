const router = require('express').Router();

const Parents = require('./parents-model');
const Pets = require('../pets/pets-model');

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

	Pets.add(petInfo)
		.then(pet => {
			res.status(201).json(pet);
		})
		.catch(err => {
			console.log('Error creating new Gigapet.', err);
			res.status(500).json({ error: 'Error creating new Gigapet.' });
		});
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

module.exports = router;
