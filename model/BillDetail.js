const mongoose = require("mongoose");

const BillDetailShema = new mongoose.Schema({
    idBill:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "bill"
    },
    idProduct:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "product"
    },
    quantity:{
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
});
module.exports = BillDetail = mongoose.model("billDetail", BillDetailShema);