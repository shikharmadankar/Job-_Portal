import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";



export const register = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    // Validation
    if (!fullname || !email || !password || !role) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    // Check existing email
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: "",
      },
    });

    await newUser.save();

    // Generate token
    const tokenData = {
      userId: newUser._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: `Account created successfully for ${fullname}` ,
        success: true,
        user: newUser,
        token: token,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error registering user",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (user.role !== role) {
      return res.status(403).json({
        message: "You don't have the necessary role to access this resource",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const sanitizedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: sanitizedUser,
        token: token,
        success: true,
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error login failed",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error logging out",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      fullname,
      email,
      phoneNumber,
      bio,
      skills,
      location,
      linkedin,
      github,
      experience,
      education,
      uploadType, // "photo" or "resume" — tells backend what the file is for
    } = req.body;
    const file = req.file;

    const userId = req.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (bio !== undefined) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",").map((s) => s.trim());
    if (location !== undefined) user.profile.location = location;
    if (linkedin !== undefined) user.profile.linkedin = linkedin;
    if (github !== undefined) user.profile.github = github;
    if (experience !== undefined) user.profile.experience = experience;
    if (education !== undefined) user.profile.education = education;

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      if (uploadType === "photo") {
        // Profile photo upload
        user.profile.profilePhoto = cloudResponse.secure_url;
      } else {
        // Default: resume upload
        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOriginalName = file.originalname;
      }
    }

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error updating profile",
      success: false,
    });
  }
};

export const getAllUser = async(req ,res) =>{
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error ",
      success: false,
    });
  }
}

export const refreshToken = async (req, res) => {
  try {
    const userId = req.id; // set by authenticateToken middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Issue a fresh 24h token
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const sanitizedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        success: true,
        token: token,
        user: sanitizedUser,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error refreshing token",
      success: false,
    });
  }
};