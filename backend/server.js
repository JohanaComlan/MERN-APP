import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";

dotenv.config();

//Initializing an Express application return an app
const app = express(); 

app.get("/products", (req, res) =>{
    res.send("Server is ready");
})

console.log(process.env.MONGO_URI);

// Start the server
app.listen(5000, ()=>{
    console.log("Server started at http://localhost:5000");
    connectDB();
})




