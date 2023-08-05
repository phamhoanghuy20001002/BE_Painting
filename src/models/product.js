'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'userDataProduct' })
            Product.hasMany(models.Order, { foreignKey: 'productId', as: 'orderDataProduct' })

        }
    }
    Product.init({
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        imageSrc: DataTypes.STRING,
        category: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        sold: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};