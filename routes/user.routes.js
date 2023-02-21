const express = require("express");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/jwt.middleware");

router.post("/signup", async (req, res) => {
   try {
      const { fullName, firstName, lastName, password } = req.body;

      if (!fullName || !firstName || !lastName || !password) {
         res.status(400).json({ message: "missing fields" });
         return;
      }

      const foundUser = await User.findOne({ fullName });
      if (foundUser) {
         res.status(400).json({ message: "user already exists" });
         return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const createdUser = await User.create({
         fullName,
         firstName,
         lastName,
         password: hashedPassword,
      });
      res.status(200).json(createdUser);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

router.post("/login", async (req, res) => {
   try {
      const { fullName, password } = req.body;

      if (!fullName || !password) {
         res.status(400).json({ message: "missing fields" });
         return;
      }

      const foundUser = await User.findOne({ fullName });
      if (!foundUser) {
         res.status(401).json({ message: "invalid login" });
         return;
      }

      const isPasswordCorrect = bcrypt.compareSync(
         password,
         foundUser.password
      );
      if (!isPasswordCorrect) {
         res.status(401).json({ message: "invalid login" });
         return;
      }

      const authToken = jwt.sign(
         { _id: foundUser._id, fullName: foundUser.fullName },
         process.env.TOKEN_SECRET,
         { algorithm: "HS256", expiresIn: "6h" }
      );

      res.status(200).json(authToken);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

router.get("/verify", isAuthenticated, (req, res) => {
   return res.status(200).json(req.payload);
});

module.exports = router;
