const db = require("../models");
const Author = db.Author;
const Book = db.Book;

// Create new author
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name) {
      return res.status(400).send({
        message: "Nama author diperlukan!"
      });
    }

    // Create author
    const author = await Author.create({
      name: req.body.name,
      country: req.body.country,
      birth_year: req.body.birth_year
    });

    res.status(201).send(author);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Terjadi kesalahan saat membuat author."
    });
  }
};

// Get all authors
exports.findAll = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.send(authors);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Terjadi kesalahan saat mengambil author."
    });
  }
};

// Find author by id with books
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    
    const author = await Author.findByPk(id, {
      include: [{ model: Book, as: "books" }]
    });
    
    if (!author) {
      return res.status(404).send({
        message: `Author dengan id=${id} tidak ditemukan.`
      });
    }
    
    res.send(author);
  } catch (err) {
    res.status(500).send({
      message: `Terjadi kesalahan saat mengambil author dengan id=${req.params.id}.`
    });
  }
};

// Update author
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    
    const [num] = await Author.update(req.body, {
      where: { id: id }
    });
    
    if (num === 1) {
      res.send({
        message: "Author berhasil diperbarui."
      });
    } else {
      res.status(404).send({
        message: `Tidak dapat memperbarui author dengan id=${id}. Mungkin author tidak ditemukan atau body kosong!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Terjadi kesalahan saat memperbarui author dengan id=${req.params.id}.`
    });
  }
};

// Delete author
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    
    const num = await Author.destroy({
      where: { id: id }
    });
    
    if (num === 1) {
      res.send({
        message: "Author berhasil dihapus!"
      });
    } else {
      res.status(404).send({
        message: `Tidak dapat menghapus author dengan id=${id}. Mungkin author tidak ditemukan!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Tidak dapat menghapus author dengan id=${req.params.id}.`
    });
  }
};