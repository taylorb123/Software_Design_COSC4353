
//import supertest from 'supertest';
const server = require("./server");
const request = require('supertest');
const user = require("./controllers/user-controllers");
const fuel = require("./controllers/fuel-controllers");
//server.listen(5678, () => {

describe("POST /register", () =>{
    describe("Register a username and password", () =>{
        test("should respond with a 201 status cade", async () =>{
            const response = await request(server).post("/api/users/register").send({
                "username": "taylor45678",
                "password": "password"
            })
            expect (response.statusCode).toBe(201)
        })
     })
    ,
    describe("Checking default user values", () =>{
        test("testing full_name", async () =>{
            expect(user.full_name).toBe(undefined);
        }),
        test("testing address1", async () =>{
            expect(user.address1).toBe(undefined);
        }),
        test("testing address2", async () =>{
            expect(user.address2).toBe(undefined);
        }),
        test("testing city", async () =>{
            expect(user.city).toBe(undefined);
        }),
        test("testing state", async () =>{
            expect(user.state).toBe(undefined);
        })

    })

})

describe("POST /login", () =>{

    describe("Given a username and password is correct", () =>{
        //should save the username and password to localhost
        //should respond with json object containing the username and password
        test("should respond with a 200 status cade", async () =>{
            const response = await request(server).post("/api/users/login").send({
                "username": "taylor45678",
                "password": "password"
            })
            expect (response.statusCode).toBe(200)
        })
    }),
    describe("Given a username and password is incorrect", () =>{
        test("should respond with a 401 status cade", async () =>{
            const response = await request(server).post("/api/users/login").send({
                "username": "taylor45678",
                "password": "wrongpass"
            })
            expect (response.statusCode).toBe(401)
        })
    }),
    describe("Given a username and password has invalid input", () =>{
        test("should respond with a 422 status cade", async () =>{
            const response = await request(server).post("/api/users/login").send({
                "username": "",
                "password": "password"
            })
            expect (response.statusCode).toBe(422)
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
                "username": "taylor45678"
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
                "username": "taylor45678"
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
                "username": "taylor45678"
            })
            expect(response.statusCode).toBe(200)
        })
    })

    describe("Update account information given a username, with full name > 50", () => {
        test("400 status code, account information failed (full name too long)", async () => {
            const response = await request(server).patch("/api/fuelquote/taylor/accounts").send({
                "full_name": "01234567890012345678900123456789001234567890012345678901",
                "address1": "123 changed st.",
                "address2": "456 moved dr.",
                "city": "Houston",
                "state": "TX",
                "zip": "77379",
                "username": "taylor45678"
            })
            expect(response.statusCode).toBe(400)
        })
    })

    describe("Update account information given a username, with address1 > 100", () => {
        test("400 status code, account information failed (address1 too long)", async () => {
            const response = await request(server).patch("/api/fuelquote/taylor/accounts").send({
                "full_name": "taylor123",
                "address1": "0123456789001234567890012345678900123456789001234567890101234567890012345678900123456789001234567890012345678901",
                "address2": "456 moved dr.",
                "city": "Houston",
                "state": "TX",
                "zip": "77379",
                "username": "taylor45678"
            })
            expect(response.statusCode).toBe(400)
        })
    })

    describe("Update account information given a username, with address2 > 100", () => {
        test("400 status code, account information failed (address2 too long)", async () => {
            const response = await request(server).patch("/api/fuelquote/taylor/accounts").send({
                "full_name": "taylor123",
                "address1": "123 changed st.",
                "address2": "0123456789001234567890012345678900123456789001234567890101234567890012345678900123456789001234567890012345678901",
                "city": "Houston",
                "state": "TX",
                "zip": "77379",
                "username": "taylor45678"
            })
            expect(response.statusCode).toBe(400)
        })
    })
    describe("Update account information given a username, with city > 100", () => {
        test("400 status code, account information failed (address2 too long)", async () => {
            const response = await request(server).patch("/api/fuelquote/taylor/accounts").send({
                "full_name": "taylor123",
                "address1": "123 changed st.",
                "address2": "1234 changed st.",
                "city": "HoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHoustonHouston",
                "state": "TX",
                "zip": "77379",
                "username": "taylor45678"
            })
            expect(response.statusCode).toBe(400)
        })
    })
    describe("Update account information given a username, with zip > 100", () => {
        test("400 status code, account information failed (address2 too long)", async () => {
            const response = await request(server).patch("/api/fuelquote/taylor/accounts").send({
                "full_name": "taylor123",
                "address1": "123 changed st.",
                "address2": "1234 changed st.",
                "city": "Houston",
                "state": "TX",
                "zip": "77379773797737977379773797737977379773797737977379773797737977379773797737977379773797737977379773797737977379773797737977379",
                "username": "taylor45678"
            })
            expect(response.statusCode).toBe(400)
        })
    })
})

describe("GET /", () =>{
    describe("Retrieve a list of stored users", () =>{
        test("should respond with a 401 status code", async () =>{
            const response = await request(server).get("/api/users")
            expect (response.statusCode).toBe(200)
        }),
    describe("Retrieve a users account information by username", () =>{
        test("status code response 200", async () =>{
              const response = await request(server).get("/api/fuelquote/taylor45678")
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
describe("Create and display a quote preview", () =>{
    test("...", async () =>{
        const response = await request(server).post("/api/fuelquote/:username/quote").send({
            "gallons": 1500,
            // "address1": "1234 test street",
            // "address2": "456 still testing",
            // "date": "03/02/2022",
            // "ppg": "2.00",
            // "total": "20",
            "username": "taylor45678"
           
        })
        //console.log("test" + response.body.total);
        expect (response.body.total).toBe(2542.5)
        expect(response.body.ppg).toBe(1.695);
        
        
    })
})
describe("DELETE /api/fuelquote", () =>{
    describe("Delete a quote by username", () =>{
        test("should respond with a 200 status code", async () =>{
            const response = await request(server).delete("/api/fuelquote/taylormonday11").send({
                "username": "taylor45678"
            })
            expect (response.statusCode).toBe(200)
        })
    })
})


