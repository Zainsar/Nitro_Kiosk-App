const db = require("../config/dbconfig.js")
const Sequelize = require("sequelize");
const Franchise = require("./franchisemodel.js");
const KioskProduct = require("./kioskproduct.js");
const Location = require("./kiosklocation.js");

const Kiosk = db.define("Kiosk", {
    kid: {
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

Franchise.hasMany(Kiosk, { foreignKey: 'franchiseId' });
Kiosk.belongsTo(Franchise, { foreignKey: 'franchiseId' });

Kiosk.hasMany(KioskProduct, { foreignKey: "kioskId" })

Kiosk.hasMany(Location, { foreignKey: 'kid' });
Location.belongsTo(Kiosk, { foreignKey: 'kid' });

module.exports = Kiosk;