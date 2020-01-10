const request = require('supertest');
const db = require('../database/dbConfig');

const server = require('../api/server');

const signToken = require('../middleware/signToken');

describe('tests auth-router.js', function() {
	beforeEach(async () => {
		await db('parents');
	});

	const parent = { id: 1, username: 'MilaniJo', password: 'babygirl' };
	const token = signToken(parent);

	describe('POST /register', function() {
		it('should register a new user and return 201 OK', function() {
			return request(server)
				.post('/api/auth/register')
				.send(parent)
				.then(res => {
					expect(res.status).toBe(201);
				});
		});

		it('should return an object with error info, if required info is not provided.', function() {
			return request(server)
				.post('/api/auth/register')
				.send({ password: 'babygirl' })
				.then(res => {
					expect(res.body).toEqual({
						success: false,
						errorMessage: 'The info is not valid, see errors for details.',
						errors: ['Please provide a username for the parent account.']
					});
				});
		});

		it('successful login should return status 200 and token and user info.', function() {
			return (
				request(server)
					.post('/api/auth/login')
					.send(parent)
					// .then(res => {
					// 	expect(res.status).toBe(200);
					// });
					.then(res => {
						expect(res.status).toBe(200);
						expect(res.body).toEqual({
							token,
							id: parent.id,
							username: parent.username,
							message: `Welcome ${parent.username}!`
						});
					})
			);
		});
	});
});
