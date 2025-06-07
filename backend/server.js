import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js"

dotenv.config();

//Initializing an Express application return an app
const app = express(); 

app.use(express.json()); // Allow us to parse JSON data in request bodies
app.use("/api/products", productRoutes);

// Start the server
app.listen(3001, ()=>{
    console.log("Server started at http://localhost:3001");
    connectDB();
})

app.get("/", (req, res) =>{
    res.send("Server is ready");
})

