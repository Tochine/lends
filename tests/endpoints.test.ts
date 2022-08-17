import { agent as request } from "supertest"; 

import app from "../src/app";
import knex from "../src/database/connection";

const server = request(app);
import * as utils from "../src/utils";

beforeAll(async () => {
    await knex.queryBuilder();
});

afterAll(async () => {
    await knex.destroy();
})

/*
* Unit Tests
* */

describe("Unit Tests", () => {
    it("register a user successfully", async () => {
        const res = await server.post("/api/v1/users")
        .send({
            first_name: "John",
            last_name: "Doe",
            email: "testemail@example.com",
            password: utils.bcryptHash("password"),
            phone_number: "47747838383",
            username: "JohnDoe"
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body.data)
    });

    it("should login a user successfully", async () => {
        const res = await server.post("/api/v1/users")
        .send({
            email: "testemail@example.com",
            password: "password",
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.data)
    })
})

