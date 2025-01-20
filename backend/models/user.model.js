import mongoose from "mongoose";

// Define the user schema for MongoDB
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true, 
        unique: true // Email must be unique across users
    },
    password: {
        type: String,
        required: true 
    },
    income: [ // Array to store income entries
        {
            amount: {
                type: Number, // Amount of income
            },
            category: {
                type: String, // Category of income 
            },
            date: {
                type: Date,
                default: Date.now // Default to current date if not provided
            },
            description: {
                type: String,
                default: '' // Optional description of the income
            }
        }
    ],
    expenses: [ // Array to store expense entries
        {
            amount: {
                type: Number, // Amount of expense
            },
            category: {
                type: String, // Category of expense
            },
            date: {
                type: Date,
                default: Date.now // Default to current date if not provided
            },
            description: {
                type: String,
                default: '' // Optional description of the expense
            }
        }
    ]
}, { timestamps: true, versionKey: false }); // createdAt and updatedAt timestamps

// Creating the User model
const User = mongoose.model("user", userSchema);

export default User; // Exporting the User model
