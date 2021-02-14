const mongoose = require("mongoose")

// All Transactions List
const transactionListSchema = new mongoose.Schema({
    transferStatement: String
})

module.exports = mongoose.model("Datab", transactionListSchema)