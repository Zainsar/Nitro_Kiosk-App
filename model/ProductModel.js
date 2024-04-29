const db = require("../config/dbconfig");
const Sequelize = require("sequelize");

const Product = db.define("Product", {
    pId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    logo: {
        type: Sequelize.STRING
    },
    retailprice: {
        type: Sequelize.DECIMAL
    }

});

module.exports = Product;