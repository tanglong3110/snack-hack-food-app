const express = require("express");
const route = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../model/User');
const {check, validationResult} = require("express-validator");
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() +"_"+ file.fieldname +'.jpg');
    }
  });

var upload = multer({storage: storage});

route.post('/avatar',upload.single('profileImage'),  (req, res) => {
    console.log(req.file.path);
    res.send(req.file.path);
})



//Function login account
route.post('/login', [
    check('email', 'Please ! Enter your email ! ').isEmail(),
    check('password', 'Please ! Enter your password ! ').not().isEmpty(), 
],async(req, res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success: "0", msg:"Please, enter all fields !"});
    }

    let {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Email doesn't exited ! "});
        }

        let isMath = await bcrypt.compare(password, user.password);
        if(!isMath){
            return res.status(400).json({error: "Wrong password ! "})
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({error: "Server error !"});
    }
})



//Get infor user logining
route.post("/userInfo", async(req,res)=>{
    const {email} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(500).json({error: "Email doesn't existed ! "})
        }
        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({errors: "Server error"});
    }
})


//Update info user
route.post("/updateUser",upload.single('avatar') , async(req,res)=>{
    const email = req.body.email;
    const name = req.body.name;
    const address = req.body.address; 
    const phone = req.body.phone;
    const avatar = req.file.path;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(500).json({error: "Email doesn't existed ! "});
        }
        let phoneu = await User.findOne({phone});
        if(phoneu){
            return res.status(500).json({error: "Phone already existed ! "})
        }
        
        let id = user.id;

         const user_update = {
            email,
            name,
            phone,
            address,
            avatar
        };

        if(user){
            user = await User.findByIdAndUpdate(
                {_id: id},
                user_update);
                
                return res.status(200).json(user_update);
        }


    } catch (error) {
        return res.status(500).json({errors: "Server error"});
    }
})

//Get user info
route.post("/getUserInfo", async(req,res)=>{
    let email = req.body.email;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(500).json({error: "Email doesn't existed ! "})
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({errors: "Server error"});
    }
})

//Update avatar user
route.post("/updateUserAvatar/",upload.single('avatar') , async(req,res)=>{
    let avatar = req.file.path;
    let email = req.body.email;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(500).json({error: "Email doesn't existed ! "})
        }
        let id = user.id;
         const user_update = {
            email,
            avatar
        };

        if(user){
            user = await User.findByIdAndUpdate(
                {_id: id},
                user_update);
                
                return res.status(200).json(user_update);
        }
    } catch (error) {
        return res.status(500).json({errors: "Server error"});
    }
})


//Update password info user
route.post("/updateUserPassword", async(req,res)=>{
    let email = req.body.email;
    let password_user = req.body.password_user;
    let password = req.body.password;
   
    // let {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(500).json({error: "Email doesn't existed ! "})
        }
        let isMath = await bcrypt.compare(password_user, user.password);
        if(!isMath){
            return res.status(400).json({error: "Wrong password ! "})
        }
        let id = user.id;

        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        
         const user_update = {
            password,
        };
        
        if(user){
            user = await User.findByIdAndUpdate(
                {_id: id},
                user_update);
                
                return res.status(200).json({success: "success"});
        }


    } catch (error) {
        return res.status(500).json({errors: "Server error"});
    }
})


// Get all user
route.post("/allUser", async(req,res)=>{
    const {email} = req.body;
    try {
        let user = await User.find();
        if(!user){
            return res.status(500).json({error: "Email doesn't existed ! "})
        }
        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({errors: "Server error"});
    }
})

module.exports = route;
