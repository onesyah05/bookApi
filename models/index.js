const { Sequelize } = require('sequelize');
const config = require('../config/db.config');

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: 0,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        },
        logging: console.log
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, Sequelize);
db.Author = require('./author.model')(sequelize, Sequelize);
db.Book = require('./book.model')(sequelize, Sequelize);

db.Author.hasMany(db.Book, { as: "books" });
db.Book.belongsTo(db.Author, {
    foreignKey: "authorId",
    as: "author"
});

module.exports = db;