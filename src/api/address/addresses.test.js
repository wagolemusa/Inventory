const supertest = require('supertest');
const app = require('../../app');

describe('GET /api/v1/customers', () => {

    it('should respond with an array of address', async () => {
        const response = await supertest(app)
            .get('/api/v1/customers')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toBeInstanceOf(Array)
    })

})

