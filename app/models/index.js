const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.score = require("./score.model.js")(sequelize, Sequelize);
db.question = require("./question.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);


db.category.hasMany(db.question, { foreignKey: { field: 'category', allowNull: false }, onDelete: 'CASCADE' });
db.question.belongsTo(db.category, { foreignKey: { field: 'category', allowNull: false }, onDelete: 'CASCADE' });

db.category.hasMany(db.score, { foreignKey: { field: 'category', allowNull: false }, onDelete: 'CASCADE' });
db.score.belongsTo(db.category, { foreignKey: { field: 'category', allowNull: false }, onDelete: 'CASCADE' });

module.exports = db;