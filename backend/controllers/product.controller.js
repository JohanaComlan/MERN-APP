import Product from "../models/product.model.js";

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