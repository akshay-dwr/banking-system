const mongoose = require("mongoose")
const Transaction = require("./transactions")

// Customer Info
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    balance: Number,
    transactions:[{
        type: mongoose.Schema.Types.ObjectId, ref:"Transaction"
    }]
})

module.exports = mongoose.model("Customer", customerSchema)