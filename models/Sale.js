const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: String, required: true },
    sellingPricePQ: {type: Number, required: true},
    pieces: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    date: { type: Date, default: Date.now },
});

const SaleModel = mongoose.model("sales", SaleSchema)
module.exports = SaleModel
