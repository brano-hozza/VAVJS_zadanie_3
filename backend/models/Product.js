module.exports = function(sequelize, Sequelize) {
  /**
 * @class Product
 * @description Product model
 * @extends Model
 */
  class Product extends Sequelize.Model {}
  Product.init({
    product_name: Sequelize.STRING,
    price: Sequelize.FLOAT,
    description: Sequelize.TEXT,
    image: Sequelize.STRING,
  }, {sequelize, modelName: 'product'});
  return Product;
};
