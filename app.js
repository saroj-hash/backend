const express = require('express')
const bodyParser = require("body-parser")
const router = require('./routes/routing')
const myErrorLogger = require('./utilities/errorlogger')
const myRequestLogger = require('./utilities/requestlogger')
const helmet = require("helmet")
const cors = require('cors')
const app = express()

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())

app.use(myRequestLogger)
app.use('/', router)
app.use(myErrorLogger)

app.listen(3001)
console.log("Server listening in port 3001")

module.exports = app



 