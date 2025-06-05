import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success : true , data : products});

    }catch(error){
        console.log("error in fetching product", error.message);
        res.status(500).json({success : false , message : "server error"});

    }

}


export const createProduct = async (req,res) => {
    const product = req.body;  // user will send this data 

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success : false , message : "Please provide all fields"});
    }
    const newproduct = new Product(product);

    try{
        await newproduct.save();
        res.status(201).json({success : true , data : newproduct});

    }catch(error){
        console.error("Error in create Product ",error.meessage);
        res.status(500).json({success : false , message : "server error"});
    }
}

export const deleteProduct = async(req,res)=> {
    const {id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false , message : "Invalid id "});
    }
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success : true , message : "Product deleted "});

    }catch(error){
        console.log("Error in deleting Product ",error.message);
        res.status(500).json({success : false , message : "Server Error "});

    }

}

export const  updateProduct=  async(req,res)=> {
    const {id} =req.params;
    const product =req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false , message : "Invalid id "});
    }

    try{
        const updatedproduct = await Product.findByIdAndUpdate(id,product,{new : true});
        res.status(200).json({success : true , data : updatedproduct});

    }catch(error){
        res.status(500).json({success : false , message : "server error"});

    }
}