import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import Product from './models/product.model.js';

dotenv.config();

//Initializing an Express application return an app
const app = express(); 

app.use(express.json()); // Allow us to parse JSON data in request bodies

app.get("/products", (req, res) =>{
    res.send("Server is ready");
})

console.log(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("Hello from the root route");
});

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
    return res.status(201).json({
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
    
})

// Start the server
app.listen(3001, ()=>{
    console.log("Server started at http://localhost:3001");
    connectDB();
})




