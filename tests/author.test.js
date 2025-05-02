const request = require("supertest");
const app = require("../app");
const db = require("../models");

let token;

beforeAll(async () => {

    await request(app)
        .post("/api/auth/register")
        .send({
            username: "authoruser",
            email: "author@example.com",
            password: "password123"
        });

    const res = await request(app)
        .post("/api/auth/login")
        .send({
            username: "authoruser",
            password: "password123"
        });

    token = res.body.accessToken;
});

afterAll(async () => {
    await db.sequelize.close();
});

describe("Author API", () => {
    let authorId;

    test("Should create a new author", async () => {
        const res = await request(app)
            .post("/api/authors")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Test Author 2",
                country: "Indonesia",
                birth_year: 1980
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("name", "Test Author 2");
        authorId = res.body.id;
    });

    test("Should get all authors", async () => {
        const res = await request(app)
            .get("/api/authors");

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    test("Should get author by id", async () => {
        const res = await request(app)
            .get(`/api/authors/${authorId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("name", "Test Author 2");
    });

    test("Should update author", async () => {
        const res = await request(app)
            .put(`/api/authors/${authorId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Updated Author"
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Author berhasil diperbarui.");
    });

    test("Should delete author", async () => {
        const res = await request(app)
            .delete(`/api/authors/${authorId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Author berhasil dihapus!");
    });
});