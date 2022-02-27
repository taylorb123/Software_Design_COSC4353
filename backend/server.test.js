
//import supertest from 'supertest';
const server = require("./server");
const request = require('supertest');

//server.listen(5678, () => {
describe("POST /login", () =>{

    describe("given a username and password", () =>{
        //should save the username and password to localhost
        //should respond with json object containing the username and password
        test("should respond with a 200 status cade", async () =>{
            const response = await request(server).post("/api/users/login").send({
                "username": "Taylor123",
                "password": "password"
            })
            expect (response.statusCode).toBe(200)
        })
    })

    describe('When the username or password is missing', () => { 
        //Could not find user credentials', 401
    })
})
//})