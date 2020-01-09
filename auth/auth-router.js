const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { validateParent } = require('../middleware/validators/parentsValidator');

const Parents = require('../parents/parents-model');
const signToken = require('../middleware/signToken');

// POST endpoint to register new parent
router.post('/register', (req, res) => {
	// implement registration
	let parent = req.body;

  // validates required info is provided to create an account
	const validation = validateParent(parent);

	const hash = bcrypt.hashSync(parent.password, 10);
	parent.password = hash;

	if (validation.success) {
		Parents.add(parent)
			.then(saved => {
				res.status(201).json(saved);
			})
			.catch(err => {
				console.log('Error registering new parent.', err);
				res.status(500).json({ error: 'Error registering new parent.' });
			});
	} else {
		res.status(400).json(validation);
	}
});

// POST endpoint to log parent in
router.post('/login', (req, res) => {
	let { username, password } = req.body;

	Parents.findBy({ username })
		.first()
		.then(parent => {
			if (parent && bcrypt.compareSync(password, parent.password)) {
				// sign token
				const token = signToken(parent);

				// send token
				res.status(200).json({
					token,
					id: parent.id,
					username: parent.username,
					message: `Welcome ${parent.username}!`
				});
			} else {
				res.status(401).json({ message: 'You were not logged in.' });
			}
		})
		.catch(err => {
			console.log('Error with login', err);
			res.status(500).json({ error: 'Error with login.' });
		});
});

module.exports = router;
