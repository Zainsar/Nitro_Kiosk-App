const db = require("../config/dbconfig.js")
const Sequelize = require("sequelize");

const Kiosk = db.define("Kiosk", {
    k_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    franchiseId: {
        type: Sequelize.UUID,
    },
    email: {
        type: Sequelize.STRING,
        unique: {
            name: 'Kisok_email_unique',
            msg: 'Email address is already in use.'
        }
    },
    password: {
        type: Sequelize.STRING,
    },
    noOfTap: {
        type: Sequelize.INTEGER,
    }

})

module.exports = Kiosk;