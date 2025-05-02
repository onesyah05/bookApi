module.exports = (sequelize, Sequelize) => {
    const Author = sequelize.define("author", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING
      },
      birth_year: {
        type: Sequelize.INTEGER
      }
    });
  
    return Author;
  };