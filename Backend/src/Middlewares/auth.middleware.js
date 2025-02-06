import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";

export const protectUser = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETS);

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;  return next();

  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
