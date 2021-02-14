//Import Libraries and Models
const express = require('express')
const Customer = require('../models/customer')
const Transaction = require('../models/transactions')
const Datab = require('../models/allTransactions')
const router = express.Router()

// All Customers Route
router.get('/', async (req,res) => {
    const customers = await Customer.find({})
    res.render('customers/index', {customers})
})

// Customer Profile Route
router.get('/:id', async (req,res) => {
    const { id } = req.params
    const customer = await Customer.findById(id)
    const customerName = customer.name
    await Customer.findOne({ name: customerName }, function(err, customerProfile) {
        customerProfile.toObject({ getters: true })
        res.render("customers/profile", { customerProfile })
})
        .populate("transactions")
})

// Tranfer Money Route
router.get("/:id/transfer", async(req, res) => {
    const { id } = req.params
    const sender = await Customer.findById(id)
    const receiver = await Customer.find({})
    res.render("customers/transfer", { sender, receiver })
})

// Individual Customer History Route
router.get("/:id/history", async(req, res) => {
    const { id } = req.params
    const customer = await Customer.findById(id)
    const customerName = customer.name
    await Customer.findOne({ name: customerName }, function(err, customerHistory) {
        customerHistory.toObject({ getters: true })
        res.render("customers/history", { customerHistory })
    })
        .populate("transactions")      
})

// Money Transfer Route
router.post("/", async(req, res) => {
    const { sender, receiver, amount } = req.body
    const receiverCustomer = await Customer.findOne({ name: receiver })
    const senderCustomer = await Customer.findOne({ name: sender })
    if (senderCustomer.balance > 0 && amount < senderCustomer.balance && amount > 0) {
         const receiverHistory = new Transaction({ statement: `You Recieved ₹${amount} from ${senderCustomer.name}`})
         await receiverHistory.save()
         const senderHistory = new Transaction({ statement: `You Paid ₹${amount} to ${receiverCustomer.name}`})
         await senderHistory.save()
         receiverCustomer.transactions.push(receiverHistory)
         await receiverCustomer.save()
         const transferHistory = new Datab({ transferStatement: `${senderCustomer.name} paid ₹${amount} to ${receiverCustomer.name}` })
         await transferHistory.save()
         senderCustomer.transactions.push(senderHistory)
         await senderCustomer.save()
         const newBalance = parseInt(receiverCustomer.balance) + parseInt(amount)
         await Customer.findOneAndUpdate({ name: sender }, { balance: parseInt(senderCustomer.balance) - parseInt(amount) })
         await Customer.findOneAndUpdate({ name: receiver }, { balance: newBalance })
         res.redirect("/customers")
    } else if (amount > senderCustomer.balance) {
        res.render('customers/limitError')
    } else {
        res.render('customers/zeroError')
    }
})

module.exports = router