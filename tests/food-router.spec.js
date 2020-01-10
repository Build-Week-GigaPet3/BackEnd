const request = require('supertest');
const db = require('../database/dbConfig');

const server = require('../api/server');

describe('Food Router functionality', () => {
	beforeEach(async () => {
    await db('parents').truncate();
    await db('food_log').truncate()
	});

	it('GET request should return data in JSON format', async () => {
		const response = await request(server).get('/api/food');
		expect(response.type).toMatch(/json/i);
	});

	it('POST should return error for missing info.', () => {
		const parent1 = { username: 'Des', password: 'navysailor' };

		return request(server)
			.post('/api/auth/register')
			.send(parent1)
			.then(() => {
				return request(server)
					.post('/api/auth/login')
					.send(parent1)
					.then(res => {
						const token = res.body.token;

						return request(server)
							.post('/api/parents/1/food/logs')
							.set('authorization', token)
							.send({ food_item: 'ham', parent_id: 1 })
							.then(res => {
								expect(res.status).toBe(400);
								expect(res.body).toEqual({
									success: false,
									errorMessage:
										'The info is not valid, see errors for details.',
									errors: [
										'Please provide a food category id for this food log.'
									]
								});
							});
					});
			});
	});

	it('GET request should return 200 status code and JSON object of food logs for specified account.', () => {
		const parent2 = { username: 'Benny', password: 'broham' };

		return request(server)
			.post('/api/auth/register')
			.send(parent2)
			.then(() => {
				return request(server)
					.post('/api/auth/login')
					.send(parent2)
					.then(res => {
						const token = res.body.token;

						return request(server)
							.post('/api/parents/1/food/logs')
							.set('authorization', token)
							.send({ food_item: 'ham', food_category_id: '4', parent_id: 1 })
							.expect(201)
							.then(() => {
								return request(server)
									.get('/api/parents/1/food/logs')
									.set('authorization', token)
									.expect(200);
							});
					});
			});
	});

	it('PUT request should return JSON object upon successful update', () => {
		const parent3 = { username: 'Rosco', password: 'peekotrain' };

		return request(server)
			.post('/api/auth/register')
			.send(parent3)
			.then(() => {
				return request(server)
					.post('/api/auth/login')
					.send(parent3)
					.then(res => {
						const token = res.body.token;

						return request(server)
							.post('/api/parents/1/food/logs')
							.set('authorization', token)
							.send({
								food_item: 'cupcake',
								food_category_id: '7',
								parent_id: 1
							})
							.expect(201)
							.then(() => {
								return request(server)
									.put('/api/food/logs/1')
									.set('authorization', token)
									.send({ food_item: 'Twix' })
									.expect({
										message: 'Food log update was successful.',
										log: 1
									});
							});
					});
			});
  });
  
  it('DELETE request should return error ', () => {
    const parent4 = { username: 'Emily', password: 'mamabearroar' };

    return request(server)
      .post('/api/auth/register')
      .send(parent4)
      .then(() => {
        return request(server)
          .post('/api/auth/login')
          .send(parent4)
          .then(res => {
            const token = res.body.token;

            return request(server)
            .post('/api/parents/1/food/logs')
            .set('authorization', token)
            .send({
              food_item: 'cereal',
              food_category_id: '3',
              parent_id: 1
            })
            .expect(201)
            .then(() => {
              return request(server)
									.delete('/api/food/logs/1')
                  .set('authorization', token)
                  .expect(200)
									.expect({
										message: 'The food log was deleted successfully!' 
									});
            })
          })
      })
  })

});



