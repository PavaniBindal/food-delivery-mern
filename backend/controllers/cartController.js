import userModel from "../models/userModel.js";

const addToCart = async(req,res) =>{
    try{
        const userId = req.userId;
        const itemId = req.body.itemId;
        let userData = await userModel.findOne({_id : userId});
        let cartData = userData.cartData;
        if(!cartData[itemId]){
            cartData[itemId] = 1;
        }
        else{
            cartData[itemId] += 1;
        }
        await userModel.findByIdAndUpdate(userId, {$set : {cartData}});
        res.json({success:true, message:"Item added successfully"})
    }
    catch(err){
        console.log(err);
        res.json({success:false, message : "Error"})
    }
}


const removeFromCart = async(req,res) =>{
    try{
        const userId = req.userId;
        if(!userId){
            console.log("user id not found");
        }
        const itemId = req.body.itemId;
        let userData = await userModel.findOne({_id : userId});
        let cartData = userData.cartData;

        if(cartData[itemId] > 0){
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(userId, {$set : {cartData}});
        res.json({success:true, message:"Item removed successfully"})        
    }
    catch(err){
        console.log(err);
        res.json({success:false, message : "Error"})
    }
}

const getCart = async(req,res) =>{
    try{
        const userId = req.userId;
        const userData = await userModel.findOne({_id : userId});
        const cartData = userData.cartData;
        res.json({success:true, cartData});
    }
    catch(err){
        console.log(err);
        res.json({success:false, message : "Error"})
    }
}

export {addToCart, removeFromCart, getCart}