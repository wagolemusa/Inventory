const supertest = require('supertest');
const app = require('../../app');

describe('GET /api/v1/stock', () => {

    it('should respond with an array of stock', async () => {
        const response = await supertest(app)
            .get('/api/v1/stock')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toBeInstanceOf(Array)
    })

})

