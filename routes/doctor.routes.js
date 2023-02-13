const express = require("express");
const Doctor = require("../models/UserDr.model");
const router = express.Router();

//signup doctor
router.post("/signup/doctor", async (req, res) => {
   try {
      const doctor = new Doctor({
         name: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
         },
         password: req.body.password,
      });
    //   if (!req.body.firstName || !req.body.password) {
    //      res.status(400).json({ message: "missing fields" });
    //      return;
    //   }

    //   const foundUser = await Doctor.findOne({ doctor });
    //   if (foundUser) {
    //      res.status(400).json({ message: "user already exists" });
    //      return;
    //   }

      const createdDoctor = await Doctor.create(doctor);
      res.status(200).json(createdDoctor);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

module.exports = router;
