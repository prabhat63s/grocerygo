import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { validateUserInput } from "../utils/validateUserInput.js";
import path from 'path';

// Register new user
export const register = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    // Validate input
    const errors = validateUserInput(email, password);
    if (errors.length > 0) {
      return res.status(400).json({ message: errors[0] });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, mobile, password: hashedPassword });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        profileImage: user.profileImage,
        token,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    // Validate input
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      errors.push("Please enter a valid email address");
    }

    if (!password || password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: errors[0] });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const expiresIn = rememberMe ? "30d" : "1d";

    const token = generateToken(user._id, expiresIn);

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        token,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// User Details
export const getUserDetails = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      mobile: user.mobile,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Get User Details Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, mobile } = req.body;

    // Ensure the logged-in user is updating their own profile (if using JWT for example)
    if (req.user.id !== userId) {
      return res.status(403).json({ message: "You can only update your own profile" });
    }

    // Find user in the database
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update user details if they exist
    user.name = name || user.name;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;

    // If a new profile image is uploaded, update it
    if (req.file && req.file.path) {
      const domainName = req.protocol + "://" + req.get("host");
      const newProfileImage = domainName + "/" + path.join("uploads", "users", req.file.filename).replace(/\\/g, "/");
      user.profileImage = newProfileImage;
    }

    // Save the user with the updated data
    await user.save();

    // Respond with the updated user data
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Change Password Controller
export const changePassword = async (req, res) => {
  const userId = req.user._id;
  const { oldpassword, newpassword, confirmpassword } = req.body;

  try {
    if (!oldpassword || !newpassword || !confirmpassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newpassword !== confirmpassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
