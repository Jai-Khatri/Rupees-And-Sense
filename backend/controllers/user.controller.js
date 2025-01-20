import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

// Creates a new user account
export const createUser = async (req, res) => {
    const { name, email, password } = req.body; // Get user details from the request body

    try {
        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
        }

        // Hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create the new user in the database
        const createdUser = await User.create({ name, email, password: hashedPassword });

        // Respond with success message and user details
        return res.status(201).json({
            message: "User created successfully!",
            user: { id: createdUser._id, email: createdUser.email }
        });
    } catch (error) {
        console.error("Error in createUser controller:", error.message); // Log any errors
        return res.status(500).json({ message: "Server Error", error: error.message }); // Return server error
    }
};

// Authenticates a user and logs them in
export const loginUser = async (req, res) => {
    const { email, password } = req.body; // Get login details from the request body

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials!" }); // If no user found
        }

        // Check if the provided password matches the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials!" }); // If password is incorrect
        }

        // Respond with user data upon successful login
        return res.status(200).json({
            user
        });
    } catch (error) {
        console.error("Error in loginUser controller:", error.message); // Log any errors
        return res.status(500).json({ message: "Server Error", error: error.message }); // Return server error
    }
};
