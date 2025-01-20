import express from 'express';
import dotenv from 'dotenv';
import { ConnectToDB } from './libs/db.js';
import userRoutes from './routes/user.routes.js';
import incomeRoutes from './routes/income.routes.js';
import expenseRoutes from './routes/expense.routes.js';
import otherRoutes from './routes/other.routes.js';
import cors from 'cors';
import path from 'path';

dotenv.config(); // Load environment variables from .env file

const app = express(); // Creating an Express application
const PORT = process.env.PORT; // Getting the port number
const __dirname = path.resolve();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Set up API routes
app.use("/api", userRoutes); // User-related routes
app.use("/api", incomeRoutes); // Income-related routes
app.use("/api", expenseRoutes); // Expense-related routes
app.use("/api", otherRoutes); // Other routes

//App for production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../frontend/Advanced-Expense-Tracker/dist")))
}

//Sends our index.html file just in case user visits any other path
app.get("*" , (req,res) => {
    res.sendFile(path.join(__dirname , "../frontend/Advanced-Expense-Tracker" , "dist" , "index.html"))
});

// Start the server and connect to the database
app.listen(PORT, () => {
    console.log("Server listening on PORT:", PORT); // Log server start message
    ConnectToDB(); 
});
