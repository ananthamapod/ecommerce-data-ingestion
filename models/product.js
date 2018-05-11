module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    purchase_amount: { type: DataTypes.DECIMAL(10,2), allowNull: false }
  })
  return Product
}
