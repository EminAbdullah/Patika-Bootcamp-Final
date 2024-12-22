const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");


router.get("/profile", authMiddleware, userController.getProfile);
router.get("/", authMiddleware, isAdmin, userController.getAllUsers);

// Kullanıcıyı güncelle
router.put("/", authMiddleware, userController.updateUser);

// Kullanıcıyı sil (Sadece admin)
router.delete("/:id", authMiddleware, isAdmin, userController.deleteUser);

module.exports = router;
