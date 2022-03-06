
//import supertest from 'supertest';
const server = require("./server");
const request = require('supertest');

//server.listen(5678, () => {

describe("POST /register", () =>{
    describe("Register a username and password", () =>{
        test("should respond with a 201 status cade", async () =>{
            const response = await request(server).post("/api/users/register").send({
                "username": "taylor456",
                "password": "password"
            })
            expect (response.statusCode).toBe(201)
        })
    })
})

describe("POST /login", () =>{

    describe("Given a username and password is correct", () =>{
        //should save the username and password to localhost
        //should respond with json object containing the username and password
        test("should respond with a 200 status cade", async () =>{
            const response = await request(server).post("/api/users/login").send({
                "username": "Taylor123",
                "password": "password"
            })
            expect (response.statusCode).toBe(200)
        })
    }),
    describe("Given a username and password is incorrect", () =>{
        test("should respond with a 401 status cade", async () =>{
            const response = await request(server).post("/api/users/login").send({
                "username": "taylor123",
                "password": "password"
            })
            expect (response.statusCode).toBe(401)
        })
    })
})

describe("POST /fuelquote", () => {
    describe("Create a fuelquote given a username", () =>{
        test("201 status cade, quote created", async () =>{
            const response = await request(server).post("/api/fuelquote/").send({
                "gallons": "10",
                "address1": "1234 test street",
                "address2": "456 still testing",
                "date": "03/02/2022",
                "ppg": "2.00",
                "total": "20",
                "username": "testusername"
            })
            expect (response.statusCode).toBe(201)
        })
    })
})

describe("PATCH /fuelquote", () => {
    describe("Update a fuelquote given a username", () =>{
        test("200 status code, quote updated", async () =>{
            const response = await request(server).patch("/api/fuelquote/Taylor123").send({
                "gallons": "05",
                "address1": "1234 test street",
                "address2": "456 still testing",
                "date": "03/02/2022",
                "ppg": "2.00",
                "total": "20",
                "username": "Taylor123"
            })
            expect (response.statusCode).toBe(200)
        })
    }),

    describe("Update account information given a username", () => {
        test("200 status code, account information succesfully updated", async () => {
            const response = await request(server).patch("/api/fuelquote/taylor/accounts").send({
                "full_name": "taylor kyle",
                "address1": "123 changed st.",
                "address2": "456 moved dr.",
                "city": "Houston",
                "state": "TX",
                "zip": "77379",
                "username": "taylor"
            })
            expect(response.statusCode).toBe(200)
        })
    })
})

describe("GET /", () =>{
    describe("Retrieve a list of stored users", () =>{
        test("should respond with a 401 status cade", async () =>{
            const response = await request(server).get("/api/users")
            expect (response.statusCode).toBe(200)
        }),
    describe("Retrieve a users account information by username", () =>{
        test("status code response 200", async () =>{
              const response = await request(server).get("/api/fuelquote/taylor")
              expect(response.statusCode).toBe(200)
        })
    }),
    describe("Retrieve user account information with incorrect credentials", () =>{
        test("Status code response 404", async () =>{
              const response = await request(server).get("/api/fuelquote/dummy_user")
              expect(response.statusCode).toBe(404)
        })
    })
})

})



