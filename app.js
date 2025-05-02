const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/books", require("./routes/book.routes"));
app.use("/api/authors", require("./routes/author.routes"));

app.get("/", (req, res) => {
    res.json({ message: "Selamat Datanf Di API Manajemen Buku." });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        message: "Something went wrong!",
        error: process.env.NODE_ENV === "development" ? err.message : {}
    });
});

module.exports = app;