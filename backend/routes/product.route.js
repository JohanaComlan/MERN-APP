import express from "express";
import Product from '../models/product.model.js';
import mongoose from 'mongoose';
import { getProducts, createProduct } from "../controllers/product.controller.js";

const router = express.Router();

export default router;

router.get("/", getProducts);

router.post("/", createProduct);

router.delete("/:id", async (req, res) => {
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
})

router.put("/:id", async (req, res) => { 
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