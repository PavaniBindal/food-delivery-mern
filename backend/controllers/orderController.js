import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing order
const placeOrder = async (req,res) =>{
    try{
        const newOrder = new orderModel({
            userId : req.userId,
            items : req.body.items,
            amount : req.body.amount,
            address : req.body.address,
            payment : true
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.userId, {$set : {cartData : {}}});

        res.json({success:true});
    }
    catch(err){
        console.log(err);
        res.json({success:false, message : "Error"});
    }  
}

//user order for frontend
const userOrder = async(req,res) =>{
    try{
        const userId = req.userId;
        const orderData = await orderModel.find({userId : userId});
        res.json({success:true, orderData});
    }
    catch(err){
        console.log(err);
        res.json({success : false, message : "Error"});
    }
}

//all orders for backend
const allOrders = async(req,res) =>{
    try{
        const orders = await orderModel.find({});
        res.json({success:true , orders});
    }
    catch(err){
        console.log(err);
        res.json({success : false, message : "Error"});
    }
}

//api for updating order status
const updateStatus = async(req,res) =>{
    try{
        const orderId = req.body.orderId;
        const status = req.body.status;
        await orderModel.findByIdAndUpdate(orderId, {status});
        res.json({success:true , message : "Status Updated Successfully"});
    }
    catch(err){
        console.log(err);
        res.json({success:false , message : "Error"})
    }
}

export {placeOrder, userOrder, allOrders, updateStatus};