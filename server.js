if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

// Import Libraries
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Import Routes
const indexRouter = require('./routes/index')
const customerRouter = require('./routes/customers')
const transactionsRouter = require('./routes/transactions')

// Set View Engine
app.set('view engine',  'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(express.static('public'))
app.use(expressLayouts)
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

// MongoDB Connection
mongoose.connect(process.env.connection_url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Server'))

// Use Router
app.use('/', indexRouter)
app.use('/customers', customerRouter)
app.use('/transactions', transactionsRouter)

app.listen(process.env.PORT || 3000)