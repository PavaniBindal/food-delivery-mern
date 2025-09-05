import foodModel from "../models/foodModel.js";
import fs from 'fs';

//add food item
const addFood = async (req,res) =>{
    try{
        let img_filename = `${req.file.filename}`;
        const food = new foodModel({
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            image : img_filename,
            category : req.body.category
        });

        await food.save();
        res.json({success:true, message : "Food added"});
    }
    catch(err){
        console.log(err);
        res.json({success:false, message : "Error"});
    }
}

const listFood = async (req,res) =>{
    try{
        const food_list = await foodModel.find({});
        res.json({success:true, food_list});
    }
    catch(err){
        console.log(err);
        res.json({success:false, message : "Error"});
    }
}

const removeFood = async (req,res) =>{
    try{
        const food = await foodModel.findById(req.body.id);
        console.log(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true});
    }
    catch(err){
        console.log(err);
        res.json({success:false, message : "Error"});
    }
}

export {addFood, listFood, removeFood}