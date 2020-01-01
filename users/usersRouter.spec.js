const server = require('../api/server');
const request = require('supertest');
const prepTestDB = require('../helpers/TestDatabase');
const restrict = require('../middleware/authenticate-middleware');
jest.mock('../middleware/authenticate-middleware.js')
beforeEach(prepTestDB)
beforeEach(() => restrict.mockClear())

describe('users', () => {
    it('get /api/users/list', async () => {
        restrict.mockImplementation((req, res, next) => {
            console.log("This test has been ran")
            req.user = { id: 1};
            next()
        })
        const res = await request(server)
            .get('/api/users/list')
            expect(res.status).toBe(200)
            expect(restrict).toBeCalled();
       
    })
})