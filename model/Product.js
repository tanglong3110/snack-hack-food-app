const mongoose = require("mongoose");

const productShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    kindOfFood: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'kindOfFood'
    },
    rateStar:{
        type: Number,
    },
    price:{
        type: String,
        required: true
    }
    
})

module.exports = Product = mongoose.model("product", productShema);