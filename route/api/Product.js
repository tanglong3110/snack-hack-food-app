const express = require("express");
const route = express.Router();
const multer = require('multer');
const Product = require("../../model/Product");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() +"_"+ file.fieldname +'.jpg');
    }
  });

var upload = multer({storage: storage});


//Create new product
route.post("/addProduct", upload.single("image"),async(req, res)=>{
    const image = req.file.path;
    const {name, kindOfFood, price} = req.body;
    try {
        let product = await Product.findOne({name});
        if(product){
            return res.status(500).json({error : "Name already existed ! "});
        }
        product = new Product({
            name,
            image,
            kindOfFood,
            price
        });
        await product.save();
        return res.status(200).json(product);
        
    } catch (error) {
        return res.status(500).json({error : "Server error ! "});
    }
    
});

//Get all product
route.post("/allProduct", async(req, res)=>{
    try {
        let product = await Product.find();
        if(!product){
            return res.status(500).json({error : "No product !"});
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({error : "Server error ! "});
    }
});


//Get product by kindOfFood
route.post("/kindOfFood", async(req, res)=>{
    const {kindOfFood} = req.body;
    try {
        let product = await Product.find({kindOfFood});
        return res.status(200).json(product);

    } catch (error) {
        return res.status(500).json({error: "Server error !"});
        
    }
});


//Get product by id
route.post("/getProduct", async(req, res)=>{
    const {_id} = req.body;
    try {
        let product = await Product.findOne({_id});
        if(product){
            return res.status(200).json(product);
        }
        else{
            return res.status(500).json({error: "Product not found !"})
        }
    } catch (error) {
        return res.status(500).json({error: "Server error ! "})
    }
})


//Update product by id
route.post("/updateProduct", upload.single("image"), async(req, res)=>{
    let {name, price, _id} = req.body;
    let image = req.file.path;
    try {
        let product = await Product.find({_id});
        if(!product){
            return res.status(500).json({error: "Product not found !"})
        }
        
        productUpdate={
            _id,
            name,
            price,
            image
        }
        await Product.findByIdAndUpdate(
            {_id},
            productUpdate);

        return res.status(200).json(productUpdate)
        
    } catch (error) {
        return res.status(500).json({error: "Server error !"});
    }
});

//Delete product by id
route.post("/deleteProduct", async(req, res)=>{
    let {_id} = req.body;
    try {
        let product = await Product.findOne({_id});
        if(!product){
            return res.status(500).json({error: "Product not found !"});
        }

        await Product.findByIdAndRemove({_id});
        return res.status(200).json({result: "Delete product success !"});
    } catch (error) {
        return res.status(500).json({error: "Server error !"});
    }
})


//Update product rateStar by _id
route.post("/updateProductRateStar", async(req, res)=>{
    const{_id, rateStar} = req.body;
    try {
        let product = await Product.findOne({_id});
        if(!product){
            return res.status(404).json({error: "Product not found !"});
        }
        else{
            productUpdate = {
                rateStar,
            }
            await Product.findByIdAndUpdate({_id}, productUpdate);
            return res.status(200).json(product);
        }
        
    } catch (error) {
        return res.status(500).json({error: "Server error !"});
    }
});


//get product have 5 stars
route.post("/getProductHave5Stars", async(req, res)=>{
    try {
        await Product.find({rateStar: 5})
        .then(product =>{
            if(product.length == 0){
                return res.status(404).json({result: "Not found product have 5 stars"})
            }
            else{
                return res.status(200).json(product);
            }
        })
    } catch (error) {
        return res.status(500).json({error: "Server error !"});
    }
})

module.exports = route;