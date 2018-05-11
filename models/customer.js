module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    first_name: { type: DataTypes.STRING(20), allowNull: false },
    last_name: { type: DataTypes.STRING(20), allowNull: false },
    street_address: { type: DataTypes.STRING(50), allowNull: false },
    state: { type: DataTypes.STRING(2), allowNull: false },
    zip: { type: DataTypes.INTEGER, allowNull: false }
  })
  return Customer
}
