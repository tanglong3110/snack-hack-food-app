const express = require("express");
const route = express.Router();

const Bill = require("./../../model/Bill");

//Create bill status SHOPPING
route.post("/createBill", async(req, res)=>{
    const {emailUser, status} = req.body;

    function findTodo (myTodo, emailUser){
        const index  = myTodo.findIndex((object)=>{
            return object.emailUser.toLowerCase() === emailUser.toLowerCase();
        })
        return myTodo[index];
    }

    try {
        await Bill.find({emailUser, status : "SHOPPING"})
         .exec()
         .then(async doc =>  {
             if(doc.length >= 1){
                 let billToDo = findTodo(doc, emailUser);
                return res.status(200).json(billToDo);
             }
             else{
                let bill = new Bill({
                    emailUser,
                    status
                })
                await bill.save();
                return res.status(200).json(bill);
             }
            }
            )
         .catch(err => {
            return res.status(500).json({error: err })
            });
        
        
    } catch (error) {
        return res.status(500).json({error: "Server error ! "});
    }
});

//Update Bill status "WAITING" by _id
route.post("/updateBillWaiting", async(req, res)=>{
    const {_id, status, date, voucher} = req.body;
    try {
        let bill = await Bill.findOne({_id});
        if(!bill){
            return res.status(404).json({result: "Bill not found ! " })
        }
        else{
            billUpdate = {
                status,
                date,
                voucher
            };
            await Bill.findByIdAndUpdate({_id}, billUpdate);
            return res.status(200).json(bill);
        }
    } catch (error) {
        return res.status(500).json({error: error});
    }
});

//Update Bill status "SUCCESS" and emailAdmin by _id
route.post("/updateBillSuccessAndStatusSuccess", async(req, res)=>{
    const {_id, emailAdmin, status} = req.body;
    try {
        let bill = await Bill.findOne({_id});
        if(!bill){
            return res.status(404).json({result: "Bill not found ! " })
        }
        else{
            billUpdate = {
                emailAdmin,
                status
            };
            await Bill.findByIdAndUpdate({_id}, billUpdate);
            return res.status(200).json(billUpdate);
        }
    } catch (error) {
        return res.status(500).json({error: error});
    }
});


route.post("/getAllBillWaitingUser", async(req, res)=>{
    const {emailUser, status} = req.body;
    try {
        await Bill.find({emailUser, status})
        .then(docs =>{
            if(docs.length <= 0){
                return res.status(200).json({result: "Can not found bill ! "});
            }
            return res.status(200).json(docs);
           
        })
    } catch (error) {
        return res.status(500).json({error: error});
    }
})


//Get all bill by status WAITING
route.post("/getAllBillByStatusWaiting", async(req, res)=>{
    try {
        await Bill.find({status: "WAITING"})
        .then(docs =>{
            if(docs.length <= 0){
                return res.status(200).json({result: "Can not found bill ! "});
            }
            return res.status(200).json(docs);
           
        })
    } catch (error) {
        return res.status(500).json({error: error});
    }
});


//Get all bill by status SUCCESS
route.post("/getAllBillByStatusSuccess", async(req, res)=>{
    try {
        await Bill.find({status: "SUCCESS"})
        .then(docs =>{
            if(docs.length <= 0){
                return res.status(200).json({result: "Can not found bill ! "});
            }
            return res.status(200).json(docs);
           
        })
    } catch (error) {
        return res.status(500).json({error: error});
    }
});

//Get all bill by emailAdmin status SUCCESS
route.post("/getAllBillByEmailAdminAndStatusSuccess", async(req, res)=>{
    let {emailAdmin} = req.body;
    try {
        await Bill.find({emailAdmin, status: "SUCCESS"})
        .then(docs => {
            if(docs.length <= 0){
                return res.status(200).json({result: "Can not found bill ! "});
            }
            return res.status(200).json(docs);
        
        })
    } catch (error) {
        return res.status(500).json({error: error});
    }
})

module.exports = route;