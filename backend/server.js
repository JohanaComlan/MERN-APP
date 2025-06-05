import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import Product from './models/product.model.js';
import mongoose from 'mongoose';

dotenv.config();

//Initializing an Express application return an app
const app = express(); 

app.use(express.json()); // Allow us to parse JSON data in request bodies

app.get("/products", (req, res) =>{
    res.send("Server is ready");
})

app.get("/", (req, res) => {
  res.send("Hello from the root route");
});

app.get("/api/products", async(req, res) =>{
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
})

app.post("/api/products", async (req, res) => {
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
});

app.delete("/api/products/:id", async (req, res) => {
    // take the id property from req.params and assign it to a variable called id
    const {id} = req.params;
    try{
      await Product.findByIdAndDelete(id);
      res.status(201).json({
        success: true, 
        message :"Product deleted"});
    }catch(error){
      res.status(404).json({
        success: false,
        message: `error: ${error}`
      }) 
    }
})

app.put("/api/products/:id", async (req, res) => { 
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
});


// Start the server
app.listen(3001, ()=>{
    console.log("Server started at http://localhost:3001");
    connectDB();
})




