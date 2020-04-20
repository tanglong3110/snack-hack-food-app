const mongoose = require("mongoose");

const kindOfFoodShema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true,
    }
})

module.exports = KindOfFood = mongoose.model("kindOfFood", kindOfFoodShema);