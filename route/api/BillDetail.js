const express = require("express");
const route = express.Router();

const BillDetail = require("./../../model/BillDetail");

//Create BillDetail
route.post("/createBD", async(req, res)=>{
    let {idBill, idProduct, quantity, price, status} = req.body;
    try {
        let billDetail = new BillDetail({
            idBill,
            idProduct,
            quantity,
            price,
            status
        });

        await billDetail.save();
        return res.status(200).json(billDetail);
    } catch (error) {
        return res.status(500).json({error: "Server error ! "});
    }
});

//get bill detail by idBill and status
route.post("/getBillDetail", async(req, res)=>{
    const {idBill, status} = req.body;

    try {
         await BillDetail.find({idBill, status})
        .then(billd => {
            return res.status(200).json(billd);
        })
        .catch(error => {
            return res.status(500).json({erro : error});
        });
    } catch (error) {
        return res.status(500).json({error: error});
    }
});

//Delete bill detail by _id
route.post("/deleteBD", async(req, res)=>{
    const {_id} = req.body;
    try {
        let billd = await BillDetail.findOne({_id});
        if(!billd){
            return res.status(404).json({result : "Bill detail not found ! "})
        }
        else{
            await BillDetail.findByIdAndRemove({_id});
            return res.status(200).json({result : "Delete successful ! "})
        }
    } catch (error) {
        return res.status(500).json({error: error});
    }
})

module.exports = route;