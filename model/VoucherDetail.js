const mongoose = require('mongoose');

const VoucherDetailShema = new mongoose.Schema({
    idVoucher:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "voucher"
    },
    idBill:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "bill"
    },
    emailUser:{
        type: String,
        required: true
    }
})

module.exports = VoucherDetail = mongoose.model("voucherDetail", VoucherDetailShema);