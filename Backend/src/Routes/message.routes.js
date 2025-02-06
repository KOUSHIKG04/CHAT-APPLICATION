import express from "express";
import {
  getMessages,
  getUserForSidebar,
  sendMessage,
} from "../Controllers/message.controller.js";
import { protectUser } from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.get("users/:id", protectUser, getUserForSidebar);

router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;
