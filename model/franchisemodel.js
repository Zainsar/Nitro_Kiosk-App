const db = require("../config/dbconfig.js")
const Sequelize = require("sequelize");

const Franchise = db.define("Franchise", {
    fid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        unique: {
            name: 'Franchise_email_unique',
            msg: 'Email address is already in use.'
        }
    },
    username: {
        type: Sequelize.STRING,
        unique: {
            name: 'Franchise_Username_unique',
            msg: 'Username is already in use.'
        }
    },
    password: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
    }

})

module.exports = Franchise;