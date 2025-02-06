import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../Controllers/auth.controller.js";
import { body } from "express-validator";
import { protectUser } from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName")
      .isLength({ min: 3 })
      .withMessage("First name must beat least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must beat least 8 characters long"),
  ],
  signup
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must beat least 8 characters long"),
  ],
  login
);

router.post("/logout", logout);

router.put("/update-profile", protectUser, updateProfile);

router.get("/check-auth", protectUser, checkAuth);

export default router;
