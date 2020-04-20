const mongoose = require("mongoose");

const BillShema = new mongoose.Schema({
    emailUser:{
        type: String,
        required: true
    },
    emailAdmin:{
        type: String,
    },
    voucher:{
        type: String,
    },
    date:{
        type: String,
    },
    status:{
        type: String,
        required: true,
    }
})

module.exports = Bill = mongoose.model("bill", BillShema);