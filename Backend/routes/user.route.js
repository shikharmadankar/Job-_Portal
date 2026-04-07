import express from "express";
import {
  getAllUser,
  login,
  logout,
  register,
  updateProfile,
  refreshToken,
} from "../controllers/user.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/users").get(getAllUser);
router
  .route("/profile/update")
  .post(authenticateToken, singleUpload, updateProfile);
router.route("/refresh-token").get(authenticateToken, refreshToken);

export default router;