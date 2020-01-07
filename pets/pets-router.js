const router = require('express').Router();

const Pets = require('./pets-model');

// PUT endpoint to edit gigapet
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	Pets.update(id, changes)
		.then(pet => {
			if (pet) {
				res
					.status(200)
					.json({
						message: `Pet with ID ${id} was successfully updated!`,
						pet
					});
			} else {
				res.status(404).json({ message: 'The pet could not be found.' });
			}
		})
		.catch(err => {
			console.log('Error editing gigapet.', err);
			res.status(500).json({ error: 'Error editing gigapet.' });
		});
});

// DELETE endpoint to delete gigapet
router.delete('/:id', (req, res) => {
	const { id } = req.params;

	Pets.remove(id)
		.then(count => {
			if (count > 0) {
				res
					.status(200)
					.json({ message: 'The pet has been successfully deleted!' });
			} else {
				res.status(404).json({ message: 'The pet could not be deleted.' });
			}
		})
		.catch(err => {
			console.log('Error deleting pet.', err);
			res.status(500).json({ error: 'Error deleting pet.' });
		});
});
module.exports = router;
