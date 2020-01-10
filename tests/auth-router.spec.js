const request = require('supertest');
const db = require('../database/dbConfig');

const server = require('../api/server');

describe('tests auth-router.js', function() {
	beforeEach(async () => {
		await db('parents').truncate();
	});

	describe('POST /register', function() {
		it('should register a new user and return 201 OK', function() {
			return request(server)
				.post('/api/auth/register')
				.send({ username: 'MilaniJo', password: 'middlechild' })
				.then(res => {
					expect(res.status).toBe(201);
				});
		});

		it('should return an error message with what is missing, if required info is not provided.', function() {
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
	});
});
