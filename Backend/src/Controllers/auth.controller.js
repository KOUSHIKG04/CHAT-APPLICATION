import User from "../Models/user.model.js";
import { validationResult } from "express-validator";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, fullName, password } = req.body;
    if (!email || !fullName || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = await User.create({
      email,
      fullName,
      password,
    });

    const authToken = newUser.generateAuthToken();
    await newUser.save();

    res.cookie("token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      userId: newUser._id,
      message: "User created successfully",
      user: newUser,
      token: authToken,
    });
  } catch (error) {
    console.error(" Error in signup", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await user.verifyPassword(password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials or Wrong password" });
    }

    const authToken = user.generateAuthToken();

    res.cookie("token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User logged in successfully",
      user,
      token: authToken,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error(" Error in signup", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body; const userId = req.user._id; //access through middleware (req.user = user)
    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadedRes = 
    await cloudinary.uploader.upload(profilePic);

    const updatedUser = 
    await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadedRes.secure_url,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Profile pic updated successfully",
      user: updatedUser,
    });


  } catch (error) {
    console.error("Error in updateProfile", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
