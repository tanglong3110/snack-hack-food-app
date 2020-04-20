const express = require("express");
const route = express.Router();
const Voucher = require("./../../model/Voucher");

//Create voucher 
route.post("/createVoucher", async(req, res)=>{
    const{date, percent} = req.body;
    try {
       let voucher = await Voucher.findOne({date, percent});
       if(voucher){
           return res.status(500).json({error: "Voucher is already existed ! "});
       }
       else{
           voucher = new Voucher({
               date,
               percent
           });
           await voucher.save();
           return res.status(200).json(voucher);
       }
    } catch (error) {
        return res.status(500).json({error: error});
    }
});

route.post("/getAllVoucher", async(req, res)=>{
    const{date} = req.body;
    try {
        await Voucher.find()
        .exec()
        .then(voucher =>{
            if(voucher.length == 0){
                return res.status(400).json({error: "Can't found voucher ! "});
            }
            return res.status(200).json(voucher);
        })
    } catch (error) {
        return res.status(500).json({error: error});
    }
});


route.post("/getVoucherByDate", async(req, res)=>{
    const{date} = req.body;
    try {
        await Voucher.find({date})
        .exec()
        .then(voucher =>{
            if(voucher.length == 0){
                return res.status(400).json({error: "Can't found voucher ! "});
            }
            return res.status(200).json(voucher);
        })
    } catch (error) {
        return res.status(500).json({error: error});
    }
});


//Delete voucher by id
route.post("/deleteVoucherById", async(req, res)=>{
    const{_id} = req.body;
    try {
        await Voucher.findByIdAndDelete({_id})
        .then(doc => {
            return res.status(200).json({result: "Delete success ! "})
        })
    } catch (error) {
        return res.status(500).json({error: error});
    }
});


//Get percent in voucher by id
route.post("/getPercentVoucherById", async(req, res)=>{
    const{_id} = req.body;
    try {
        await Voucher.findById({_id})
        .then(doc => {
            return res.status(200).json(doc);
        })
    } catch (error) {
        return res.status(500).json({error: error});
    }
});




module.exports = route;