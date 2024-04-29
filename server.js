const express = require('express')
const cors = require('cors')
const db = require("./config/dbconfig.js")
const bodyParser = require('body-parser')
const adminrouter = require('./Routes/adminroutes.js')
const franchiserouter = require('./Routes/franchiseroute.js')
const dontenv = require("dotenv")

dontenv.config()

const app = express()

const corOptions = {
    origin: 'http://localhost:8080'
}

// server
// 
db.sync({ alter: true })
    .then(() => {
        app.listen(PORT, console.log(`Server started on port ${PORT}`));
    })
    .catch((err) => console.log("Error: " + err));

// middleware
app.use(cors(corOptions))

app.use(express.json())

app.use(bodyParser.json({ limit: "50000mb" }));
app.use(bodyParser.urlencoded({ limit: "50000mb", extended: true, parameterLimit: 50000 }));

// TEST API

app.get('/api', (req, res) => {
    res.json({
        message: "hello"
    })
})

// Router
app.use('/api/nitro/superadmin', adminrouter)
app.use('/api/nitro/franchise', franchiserouter)

//port
const PORT = process.env.PORT || 8080