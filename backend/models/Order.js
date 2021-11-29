
module.exports = function(sequelize, Sequelize, db) {
  /**
 * @class Order
 * @description Order model
 * @extends Model
 */
  class Order extends Sequelize.Model {}
  Order.init({
    total_price: Sequelize.FLOAT,
    status: Sequelize.STRING,
  }, {sequelize, modelName: 'order'});
  db.User.hasOne(Order);
  Order.belongsTo(db.User);

  /**
   * @class OrderProduct
   * @description OrderProduct model
   * @extends Model
   */
  class OrderProduct extends Sequelize.Model {}
  OrderProduct.init({
    amount: Sequelize.INTEGER,
  }, {sequelize, modelName: 'order_product'});

  Order.belongsToMany(db.Product, {through: OrderProduct, foreignKey: 'order_id'});
  db.Product.belongsToMany(Order, {through: OrderProduct, foreignKey: 'product_id'});
  return {Order, OrderProduct};
};
