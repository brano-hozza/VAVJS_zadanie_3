const {Sequelize} = require('sequelize');
const dbConfig = require('../config/db.json');

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
  host: process.env.DEV ? 'localhost': dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {
  Sequelize,
  sequelize,
  Product: require('./Product.js')(sequelize, Sequelize),
  User: require('./User.js')(sequelize, Sequelize),
  Advertisement: require('./Advertisement.js')(sequelize, Sequelize),
  Order: null,
  OrderProduct: null,
};
const {Order, OrderProduct} = require('./Order.js')(sequelize, Sequelize, db);
db.Order = Order;
db.OrderProduct = OrderProduct;


module.exports = db;
