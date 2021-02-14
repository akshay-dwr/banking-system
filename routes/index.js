//Import Express
const express = require('express')
const router = express.Router()

// Index Route
router.get('/', (req,res) => {
    res.render('index')
})

module.exports = router