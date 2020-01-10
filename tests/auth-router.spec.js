const request = require('supertest');
const db = require('../database/dbConfig');

const server = require('../api/server');

describe('Register functionality', function() {
	beforeEach(async () => {
		await db('parents').truncate();
	});

	const parent = { username: 'MilaniJo', password: 'babygirl' };

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

		const parent2 = { username: 'Des', password: 'navysailor' };

		describe('Login functionality', () => {
			it('Should log user in and return status code 200 upon success', () => {
				return request(server)
					.post('/api/auth/register')
					.send(parent2)
					.then(res => {
						return request(server)
							.post('/api/auth/login')
							.send(parent2);
					})
					.then(res => {
						expect(res.body.message).toBe('Welcome Des!');
					});
			});
		});
	});
});
