import foodModel from "../models/foodModel.js";
import fs from'fs'



//add food-item

const addFood =  async(req,res)=>{
    let image_filename= `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
    })
    try {
        await food.save();
        res.json({Success:true,message:"Food Added"})
        
    } catch (error) {
        console.log(error);
        res.json({Success:false,message:"Error food not added"});
        
    }
}

//all food list

const listFood= async (req,res)=>{
    try {
        const foods= await foodModel.find({});
        res.json({Success:true,data:foods})
        
    } catch (error) {
        console.log(error);
        res.json({Success:false,message:"Error"});
        
    }

}


//remove food item

const removeFood= async(req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploades/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({Success:true,message:"Food Removed"})
        
    } catch (error) {
        console.log(error);
        res.json({Success:false,message:"Error"})
        
    }

}



export {addFood,listFood,removeFood}