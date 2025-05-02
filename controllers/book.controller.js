const db = require("../models");
const Book = db.Book;
const Author = db.Author;
const Op = db.Sequelize.Op;

// Create new book
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.title || !req.body.authorId) {
      return res.status(400).send({
        message: "Judul buku dan ID author diperlukan!"
      });
    }

    // Create book
    const book = await Book.create({
      title: req.body.title,
      isbn: req.body.isbn,
      published_year: req.body.published_year,
      genre: req.body.genre,
      description: req.body.description,
      authorId: req.body.authorId
    });

    res.status(201).send(book);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Terjadi kesalahan saat membuat buku."
    });
  }
};

// Get all books with pagination
exports.findAll = async (req, res) => {
  try {
    const { page = 1, size = 10, title } = req.query;
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;
    
    const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    const { count, rows } = await Book.findAndCountAll({
      where: condition,
      limit,
      offset,
      include: [{ model: Author, as: "author" }]
    });

    res.send({
      totalItems: count,
      books: rows,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit)
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Terjadi kesalahan saat mengambil buku."
    });
  }
};

// Find a single book with id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    
    const book = await Book.findByPk(id, {
      include: [{ model: Author, as: "author" }]
    });
    
    if (!book) {
      return res.status(404).send({
        message: `Buku dengan id=${id} tidak ditemukan.`
      });
    }
    
    res.send(book);
  } catch (err) {
    res.status(500).send({
      message: `Terjadi kesalahan saat mengambil buku dengan id=${req.params.id}.`
    });
  }
};

// Update a book
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    
    const [num] = await Book.update(req.body, {
      where: { id: id }
    });
    
    if (num === 1) {
      res.send({
        message: "Buku berhasil diperbarui."
      });
    } else {
      res.status(404).send({
        message: `Tidak dapat memperbarui buku dengan id=${id}. Mungkin buku tidak ditemukan atau body kosong!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Terjadi kesalahan saat memperbarui buku dengan id=${req.params.id}.`
    });
  }
};

// Delete a book
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    
    const num = await Book.destroy({
      where: { id: id }
    });
    
    if (num === 1) {
      res.send({
        message: "Buku berhasil dihapus!"
      });
    } else {
      res.status(404).send({
        message: `Tidak dapat menghapus buku dengan id=${id}. Mungkin buku tidak ditemukan!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Tidak dapat menghapus buku dengan id=${req.params.id}.`
    });
  }
};