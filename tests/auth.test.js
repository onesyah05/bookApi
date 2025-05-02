const request = require("supertest");
const app = require("../app");
const db = require("../models");

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

afterAll(async () => {
    await db.sequelize.close();
});

describe("Auth API", () => {
    const testUser = {
        username: "testuser",
        email: "test@example.com",
        password: "password123"
    };

    test("Should register a new user", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send(testUser);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("message", "User berhasil didaftarkan!");
    });

    test("Should login user and return token", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                username: testUser.username,
                password: testUser.password
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("accessToken");
    });

    test("Should not login with wrong password", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                username: testUser.username,
                password: "wrongpassword"
            });

        expect(res.statusCode).toEqual(401);
    });
});