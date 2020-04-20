const mongoose = require("mongoose");

const voucherShema = new mongoose.Schema({
    percent:{
        type: Number,
        required: true,
    },
    date:{
        type: String,
        required: true,
    }
});

module.exports = Voucher = mongoose.model("voucher", voucherShema);