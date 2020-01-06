const router = require('express').Router();

const Parents = require('./parents-model');

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

module.exports = router;
