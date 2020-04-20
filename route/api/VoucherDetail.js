const express = require("express");
const route = express.Router();

const User = require("./../../model/User");
const Bill = require("./../../model/Bill");
const Voucher = require("./../../model/Voucher");
const VoucherDetail = require("./../../model/VoucherDetail"); 

//Create voucher detail
route.post("/createVoucherDetail", async(req, res)=>{
    const {idVoucher, idBill, emailUser} = req.body;
    try {
        let voucherDetail = await VoucherDetail.findOne({idVoucher, emailUser});
        let bill = await Bill.findOne({_id: idBill});
        let voucher = await Voucher.findOne({_id: idVoucher});
        let email = await User.findOne({email: emailUser});
        if(voucherDetail){
            return res.status(404).json({result: "Guest can only choose 1 voucher type 1 time "});
        }
        else if(!bill){
            return res.status(404).json({result: "Bill not found ! "});
        }
        else if(!voucher){
            return res.status(404).json({result: "Voucher not found ! "});
        }
        else if(!email){
            return res.status(404).json({result: "Email not found ! "});
        }
        else{
            let voucherDetail = new VoucherDetail({
                idBill,
                idVoucher,
                emailUser
            });

            await voucherDetail.save();
            return res.status(200).json(voucherDetail);
        }
    } catch (error) {
        return res.status(500).json({error: error});
    }
});


//Get _id idVoucher by idBill and emailUser 
route.post("/getIdVoucherByEmailAndIdBill", async(req, res)=>{
    const {idBill, emailUser} = req.body;
    try {
        let bill = await Bill.findOne({_id: idBill});
        let email = await User.findOne({email: emailUser});
        let voucherDetail = await VoucherDetail.findOne({idBill, emailUser});
        if(!bill){
            return res.status(404).json({result: "Bill not found ! "});
        }
        else if(!email){
            return res.status(404).json({result: "Email not found ! "});
        }
        else if(!voucherDetail)
        {
            return res.status(404).json({result: "Voucher not found ! "});
        }
        return res.status(200).json(voucherDetail);
       

    } catch (error) {
        return res.status(500).json({error: error});
    }
});

module.exports = route;