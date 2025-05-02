const request = require("supertest");
const app = require("../app");
const db = require("../models");

let token;
let authorId;

beforeAll(async () => {
    await request(app)
        .post("/api/auth/register")
        .send({
            username: "bookuser",
            email: "book@example.com",
            password: "password123"
        });

    const res = await request(app)
        .post("/api/auth/login")
        .send({
            username: "bookuser",
            password: "password123"
        });

    token = res.body.accessToken;

    const authorRes = await request(app)
        .post("/api/authors")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Test Author",
            country: "Indonesia"
        });

    authorId = authorRes.body.id;
});

afterAll(async () => {
    await db.sequelize.close();
});

describe("Book API", () => {
    let bookId;

    test("Should create a new book", async () => {
        const res = await request(app)
            .post("/api/books")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Test Book",
                isbn: "1234567890123",
                published_year: 2023,
                genre: "Test",
                description: "Test description",
                authorId: authorId
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("title", "Test Book");
        bookId = res.body.id;
    });

    test("Should get all books with pagination", async () => {
        const res = await request(app)
            .get("/api/books?page=1&size=10");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("books");
        expect(res.body.books.length).toBeGreaterThan(0);
    });

    test("Should get book by id", async () => {
        const res = await request(app)
            .get(`/api/books/${bookId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("title", "Test Book");
    });

    test("Should update book", async () => {
        const res = await request(app)
            .put(`/api/books/${bookId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Updated Book"
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Buku berhasil diperbarui.");
    });

    test("Should delete book", async () => {
        const res = await request(app)
            .delete(`/api/books/${bookId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Buku berhasil dihapus!");
    });
});