const router = require('express').Router();

const Parents = require('./parents-model');

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	db('parents')
		.where({ id })
		.update(changes)
		.then(count => {
			if (count) {
				res.json({ update: count });
			} else {
				res
					.status(404)
					.json({ message: 'Could not find account with given id.' });
			}
		})
		.catch(err => {
      console.log('Failed to update account.', err)
			res.status(500).json({ message: 'Failed to update account.' });
		});
});

router.delete('/api/parents/:id', (req, res) => {});

module.exports = router;
