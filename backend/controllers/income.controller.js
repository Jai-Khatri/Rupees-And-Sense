import User from "../models/user.model.js";

// Adds a new income entry for a user
export const createIncome = async (req, res) => {
    const { id } = req.params; // Get user ID
    const { amount, category, date, description } = req.body; // Get income details
    const income = { amount, category, date, description }; // Create income object

    try {
        // Update user by adding the new income
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $push: { income: income } },
            { new: true, runValidators: true }
        );

        // If user not found, return a friendly message
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return updated user data
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in createIncome:", error.message); // Log error
        return res.status(500).json({ message: "Server Error", error: error.message }); // Return server error
    }
};

// Deletes an existing income entry for a user
export const deleteIncome = async (req, res) => {
    const { id, incomeId } = req.params; // Get user ID and income ID

    try {
        // Update user by removing the specified income
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $pull: { income: { _id: incomeId } } },
            { new: true, runValidators: true }
        );

        // If no user or income entry found, return a message
        if (!updatedUser) {
            return res.status(401).json({ message: "Income not found!" });
        } else {
            // Return success message and updated user data
            return res.status(200).json({ message: "Income deleted successfully!", updatedUser });
        }
    } catch (error) {
        console.log("Error in deleteIncome:", error.message); // Log error
        return res.status(500).json({ message: "Server Error", error: error.message }); // Return server error
    }
};
