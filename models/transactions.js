const mongoose = require("mongoose")

// Customer History
const transactionSchema = new mongoose.Schema({
    amount: Number,
    statement: String
})

module.exports = mongoose.model("Transaction", transactionSchema)