const express = require("express");
const route = express.Router();
const {check, validationResult} = require("express-validator");
const bcrypt = require('bcryptjs');
const User = require('../../model/User');

route.post('/',[
        check('email', 'Please, Enter your email ! ').not().isEmpty(),
        check('name', 'Please, Enter your name ! ').not().isEmpty(),
        check('password', 'Please, enter your password with 6 or more characters ! ').isLength({min: 6}),
        check('phone', 'Please, enter your phone with 10 or 11 characters ! ').isLength({min: 10}),
        check('role', 'Please, enter your role !').not().isEmpty(),
        check('address', 'Please, enter your address !').not().isEmpty(),
      ], async(req, res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()});
    }
    let {email, name, password, phone, role, address} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({error:  "Email is already exist !!"});
        }
        user = await User.findOne({phone});
        if(user){
            return res.status(400).json({error:  "Phone is already exist !!"});
        }
        let avatar = "null";
        user = new User({
            name,
            email,
            password,
            phone,
            address,
            role,
            avatar,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).send("Server error")
    }
    
});





module.exports = route;