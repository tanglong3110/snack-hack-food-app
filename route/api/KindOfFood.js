const express = require("express");
const route = express.Router();
const multer = require('multer');
const KindOfFood = require ("./../../model/KindOfFood");
const Product = require("./../../model/Product");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() +"_"+ file.fieldname +'.jpg');
    }
  });

var upload = multer({storage: storage});

//Create kind of food
route.post("/createKOF",upload.single('image'), async(req,res)=>{
    console.log(req.file)
    const {name} = req.body;
    const image = req.file.path;
    try {
        let kindOfFood = await KindOfFood.findOne({name});
        if(kindOfFood){
            return res.status(500).json({_id: "null",name: "Name is already existed ! ", image: "null"});
        }
        kindOfFood = new KindOfFood({
            name,
            image
        });

        await kindOfFood.save();

        return res.status(200).json(kindOfFood);
        
    } catch (error) {
        return res.status(500).json({errors: "Name is already existed ! "});
    }
});

//Get all kind of food
route.post("/allKOF", async(req,res)=>{
    try {
        let kindOfFood = await KindOfFood.find();

        return res.status(200).json(kindOfFood);
        
    } catch (error) {
        return res.status(500).json({errors: "Name is already existed ! "});
    }
});

//Update kind of food
route.post("/updateKOF", upload.single("image"), async(req, res)=>{
    let {_id, name} = req.body;
    let image = req.file.path;

    try {
        let kindOfFood = await KindOfFood.findOne({_id});
        if(!kindOfFood){
            return res.status(500).json({errors : "Kind of food doesn't existed ! "});
        }

        let kindOfFoodUpdate  = {
            name,
            image
        }

        kindOfFood = await KindOfFood.findByIdAndUpdate(
            {_id: _id},
            kindOfFoodUpdate)

        return res.status(200).json(kindOfFoodUpdate);
        
    } catch (error) {
        return res.status(500).json({errors : "Server error ! "});
    }
})


//Delete Kind of food
route.post("/deleteKOF", async(req, res)=>{
    const {_id} = req.body;

    try {
        let kindOfFood = await KindOfFood.findOne({_id});
        if(!kindOfFood){
            return res.status(500).json({result : "Can't see kind of food ! "});
        }

        let product = await Product.findOne({kindOfFood: _id});
        if(product){
            return res.status(500).json({result : "Can't delete kind of food ! "});
        }
        
        await KindOfFood.findByIdAndRemove({_id});
        return res.status(200).json({result : "Delete success ! "});

    } catch (error) {
        return res.status(500).json({result : "Server error ! "});
    }
})


module.exports = route;