module.exports = function(sequelize, Sequelize) {
  /**
 * @class Advertisement
 * @description Advertisement model
 * @extends Model
 */
  class Advertisement extends Sequelize.Model {}
  Advertisement.init({
    link: Sequelize.STRING,
    image: Sequelize.STRING,
    counter: Sequelize.INTEGER,
  }, {sequelize, modelName: 'advertisement'});
  return Advertisement;
};
