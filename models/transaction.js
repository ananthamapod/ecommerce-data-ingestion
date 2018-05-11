module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    purchase_status: { type: DataTypes.STRING(20), allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false }
  })

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Product, {
      foreignKey: 'product_id'
    })
    Transaction.belongsTo(models.Customer, {
      foreignKey: 'customer_id'
    })
  }
  
  return Transaction
}
