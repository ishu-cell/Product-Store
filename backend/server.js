import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import path from 'path'

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

const __dirname = path.resolve();
app.use(express.json());//it allow you to accept json data in the req.body 

app.use("/api/products",productRoutes);

if(process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}


app.listen(5000,() => {
    connectDB();
    console.log("Server started at http://localhost:" +  PORT)

});
