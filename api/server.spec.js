const request = require('supertest');
const server = require('./server');

const db = require('../database/dbconfig');

describe('server.js', () => {
    it('testing environment', ()=> {
        expect(process.env.NODE_ENV).toBe('testing')
    })

    // This comes back as a SUCCESS 
   describe(' GET /', () => {
       it('returns 200 OK', () => {
           return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200);
            })
       })
       it('returns JSON', () => {
           return request(server)
           .get('/')
           .then(res => {
               expect(res.type).toMatch(/text/i)
           })
       })
   })
   
       
    

})