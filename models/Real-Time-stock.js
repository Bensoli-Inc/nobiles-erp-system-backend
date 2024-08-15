const mongoose = require('mongoose');

const realTimeStockSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: String, required: true },
    pieces: { type: Number, required: true },
    pricePerQuantity: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, default: 'Pending' }, // Default status to 'Pending'
    date: { type: Date, default: Date.now }
});

const RealTimeStockModel = mongoose.model("realTimeStock", realTimeStockSchema);

module.exports = RealTimeStockModel;