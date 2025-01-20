// Import the User model for database interactions
import User from "../models/user.model.js";

export const createExpense = async (req, res) => {
    const { id } = req.params; // Get user ID from request parameters
    const { amount, category, date, description } = req.body; // Get expense details from request body
    const expense = { amount, category, date, description }; // Create expense object

    try {
        // Update user by adding the new expense
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $push: { expenses: expense } },
            { new: true, runValidators: true }
        );

        // Handle case where user is not found
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return updated user data
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in createExpense:", error.message);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const deleteExpense = async (req, res) => {
    const { id, expenseId } = req.params; // Get user ID and expense ID from request parameters

    try {
        // Update user by removing the specified expense
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $pull: { expenses: { _id: expenseId } } },
            { new: true, runValidators: true }
        );

        // Handle case where no user or expense is found
        if (!updatedUser) {
            return res.status(401).json({ message: "Expense not found!" });
        }

        // Return success message and updated user data
        return res.status(200).json({ message: "Expense deleted successfully!", updatedUser });
    } catch (error) {
        console.error("Error in deleteExpense:", error.message);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};
