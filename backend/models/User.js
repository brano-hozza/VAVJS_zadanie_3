module.exports = function(sequelize, Sequelize) {
  /**
 * @class User
 * @description User model
 * @extends Model
 */
  class User extends Sequelize.Model {}
  User.init({
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    phone_number: Sequelize.STRING,
    city: Sequelize.STRING,
    street: Sequelize.STRING,
    city_code: Sequelize.STRING,
  }, {sequelize, modelName: 'user'});
  return User;
};
