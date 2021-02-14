//Import Express and Model
const express = require('express')
const router = express.Router()
const Datab = require("../models/allTransactions")

// All Transactions Route
router.get("/", async(req, res) => {
    const transferStatement = await Datab.find({})
    res.render("transactions/index", { transferStatement })
})

module.exports = router