const supertest = require('supertest');

const app = require('./app');
const { items } = require('./constants/tableNames');

describe('GET HOME ROUTES', () => {
    it('should respond with a message', async() => {
        const response =  await supertest(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.message).toEqual('Korgas Inventory System');
    })
})