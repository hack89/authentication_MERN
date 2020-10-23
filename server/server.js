const express = require('express')
const app = express()
const volleyball = require('volleyball')
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const register = require('./routes/register')
const auth = require('./routes/auth')
const guests = require('./routes/guests')
const config = require('config')
const DB = config.get('mongoURI')

app.use(express.json())
app.use(volleyball)
app.use('/register', register)
app.use('/auth', auth)
app.use('/guests', guests)

app.get('/', (req, res) => {
    res.json('hello')
})


mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true

}, () => {
    console.log('\x1b[36m', '::DB connected::...', '\x1b[0m')
})


app.listen(PORT, () => {
    console.log('\x1b[33m', `::Server connected on port ${PORT}::...`, '\x1b[0m')
})