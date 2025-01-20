import mongoose from "mongoose";
import User from "../models/user.model.js";

// Retrieves the maximum income and expense amounts for a user
export const getMaxIncomeAndExpense = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from parameters

        // Validate the user ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Aggregate to find maximum income
        const maxIncomeResult = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            { $unwind: "$income" },
            { $group: { _id: null, maxIncome: { $max: "$income.amount" } } }
        ]);

        // Aggregate to find maximum expense
        const maxExpenseResult = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            { $unwind: "$expenses" },
            { $group: { _id: null, maxExpense: { $max: "$expenses.amount" } } }
        ]);

        // Extract max values or default to 0
        const maxIncome = maxIncomeResult.length > 0 ? maxIncomeResult[0].maxIncome : 0;
        const maxExpense = maxExpenseResult.length > 0 ? maxExpenseResult[0].maxExpense : 0;

        // Return the results
        return res.status(200).json({ maxIncome, maxExpense });
    } catch (error) {
        console.log("Error in getMaxIncomeAndExpense:", error.message);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Retrieves total income and expenses for a user
export const getTotalIncomeAndExpenses = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from parameters

        // Validate the user ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Aggregate to calculate total income
        const totalIncomeResult = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            { $unwind: "$income" },
            { $group: { _id: null, totalIncome: { $sum: "$income.amount" } } }
        ]);

        // Aggregate to calculate total expenses
        const totalExpensesResult = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            { $unwind: "$expenses" },
            { $group: { _id: null, totalExpenses: { $sum: "$expenses.amount" } } }
        ]);

        // Extract totals or default to 0
        const totalIncome = totalIncomeResult.length > 0 ? totalIncomeResult[0].totalIncome : 0;
        const totalExpenses = totalExpensesResult.length > 0 ? totalExpensesResult[0].totalExpenses : 0;

        // Return the results
        return res.status(200).json({ totalIncome, totalExpenses });
    } catch (error) {
        console.log("Error in getTotalIncomeAndExpenses:", error.message);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Calculates net income for a user
export const getNetIncome = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from parameters

        // Validate the user ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Aggregate to calculate total income
        const totalIncomeResult = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            { $unwind: "$income" },
            { $group: { _id: null, totalIncome: { $sum: "$income.amount" } } }
        ]);

        // Aggregate to calculate total expenses
        const totalExpensesResult = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            { $unwind: "$expenses" },
            { $group: { _id: null, totalExpenses: { $sum: "$expenses.amount" } } }
        ]);

        // Extract totals or default to 0
        const totalIncome = totalIncomeResult.length > 0 ? totalIncomeResult[0].totalIncome : 0;
        const totalExpenses = totalExpensesResult.length > 0 ? totalExpensesResult[0].totalExpenses : 0;

        // Calculate net income
        const netIncome = totalIncome - totalExpenses;

        // Return net income result
        return res.status(200).json({ netIncome });
    } catch (error) {
        console.log("Error in getNetIncome:", error.message);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Retrieves all incomes for a user
export const getUserIncomes = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from parameters

        // Validate the user ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Find the user by ID
        const user = await User.findById(id);
        
        // If user not found, return a friendly message
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return user's incomes
        return res.status(200).json(user.income);
    } catch (error) {
        console.log("Error in getUserIncomes:", error.message);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Retrieves all expenses for a user
export const getUserExpenses = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from parameters

       // Validate the user ID format
       if (!mongoose.Types.ObjectId.isValid(id)) {
           return res.status(400).json({ message: "Invalid user ID" });
       }

       // Find the user by ID
       const user = await User.findById(id);
       
       // If user not found, return a friendly message
       if (!user) {
           return res.status(404).json({ message: "User not found" });
       }

       // Return user's expenses
       return res.status(200).json(user.expenses);
   } catch (error) {
       console.log("Error in getUserExpenses:", error.message);
       return res.status(500).json({ message: "Server Error", error: error.message });
   }
};
