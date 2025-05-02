module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("book", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isbn: {
      type: Sequelize.STRING,
      unique: true
    },
    published_year: {
      type: Sequelize.INTEGER
    },
    genre: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    }
  });

  return Book;
};