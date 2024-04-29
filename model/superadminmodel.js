const db = require("../config/dbconfig");
const Sequelize = require("sequelize");

const Admin = db.define("SuperAdmin", {
    admin_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            name: 'admin_email_unique',
            msg: 'Email address is already in use.'
        }
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            name: 'admin_username_unique',
            msg: 'Username is already in use.'
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Age: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    }

});

module.exports = Admin;