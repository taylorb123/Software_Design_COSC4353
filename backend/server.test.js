
//import supertest from 'supertest';
const server = require("./server");
const request = require('supertest');

//server.listen(5678, () => {
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

// describe("POST /login", () =>{

//     describe("Given a username and password is incorrect", () =>{
//         test("should respond with a 401 status cade", async () =>{
//             const response = await request(server).post("/api/users/login").send({
//                 "username": "taylor123",
//                 "password": "password"
//             })
//             expect (response.statusCode).toBe(401)
//         })
//     })
// })



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



