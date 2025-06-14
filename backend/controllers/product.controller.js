import Product from "../models/product.model.js";
import mongoose from 'mongoose';

export const getProducts = async(req, res) =>{
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error: ${error}`
    })
  }
}

export const createProduct = async (req, res) => {
  // Here you would typically handle the creation of a new product
  const product = req.body; // User will send this data
  if(!product.name || !product.price || !product.image) {
    return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
    })
  }

  const newProduct = new Product(product);

  try{
    await newProduct.save();
    return res.status(200).json({
        success: true,
        message:"Product created successfully",
        product: newProduct
    })
  }catch(error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
        success: false,
        message: "Error creating product",
        error: error.message
    });
  }
}

export const deleteProduct = async (req, res) => {
    // take the id property from req.params and assign it to a variable called id
    const {id} = req.params;
    try{
      await Product.findByIdAndDelete(id);
      res.status(200).json({
        success: true, 
        message :"Product deleted"});
    }catch(error){
      res.status(404).json({
        success: false,
        message: `error: ${error}`
      }) 
    }
}

export const updateProduct = async (req, res) => { 
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Product Id"
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}