const express = require('express');
const connectDB = require('./config/db'); 
const app = express();

const User = require("./route/api/User");
const Auth = require("./route/api/Auth");
const Product = require("./route/api/Product");
const KindOfFood = require("./route/api/KindOfFood");
const Bill = require("./route/api/Bill");
const BillDetail = require("./route/api/BillDetail");
const Voucher = require("./route/api/Voucher");
const VoucherDetail = require("./route/api/VoucherDetail");
connectDB();

const PORT = process.env.PORT || 3000;
app.use('/uploads',express.static('uploads'));
app.use(express.json({ extended : false}));
app.use('/api/user', User);
app.use('/api/auth', Auth);
app.use('/api/product', Product);
app.use('/api/kindOfFood', KindOfFood);
app.use('/api/billDetail', BillDetail);
app.use('/api/bill', Bill);
app.use('/api/voucher', Voucher);
app.use('/api/voucherDetail', VoucherDetail);

app.listen(PORT, (req,  res)=> console.log("Server started nha "+ PORT));