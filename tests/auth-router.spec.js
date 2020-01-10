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
    
    it('should return a 400 error if required information is missing.', function() {
      return request(server)
        .post('/api/auth/register')
        .send("  ")
    })
	});
});
