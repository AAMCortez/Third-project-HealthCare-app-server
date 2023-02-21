const router = require("express").Router();
const { $where } = require("../models/Patient.model");
const Patient = require("../models/Patient.model");
const Wound = require("../models/Wound.model")

//Get all patients
router.get("/patients", async (req, res) => {
   try {
      const response = await Patient.find();
      res.status(200).json(response);
   } catch (error) {
      res.status(500).json({ message: error });
   }
});

//GET ONE Patient
router.get("/patient/:bed", async (req, res) => {
   try {
      const response = await Patient.findOne({ bed: req.params.bed }).populate("wound");
      res.status(200).json(response);
   } catch (error) {
      res.status(500).json({ message: error });
   }
});

//Create patient
router.post("/patient/admit", async (req, res) => {
   try {
      const {
         firstName,
         lastName,
         birthdate,
         bed,
         personalMedicalHistory,
         regularMedication,
         alergies,
         episode,
      } = req.body;
      if (
         !firstName ||
         !lastName ||
         !birthdate ||
         !bed ||
         !personalMedicalHistory ||
         !regularMedication ||
         alergies === undefined ||
         !episode
      ) {
         res.status(400).json({ message: "missing fields" });
         return;
      }
      const getAge = function (birthdate) {
         const birthTime = birthdate.getTime();
         return Math.floor((Date.now() - birthTime) / 31536000000);
      };

      const patient = {
         firstName,
         lastName,
         birthdate: new Date(birthdate),
         age: getAge(new Date(birthdate)),
         bed,
         personalMedicalHistory,
         regularMedication,
         alergies,
         episode,
      };
      const response = await Patient.create(patient);
      res.status(200).json(response);
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
   }
});

//Update patient info
router.put("/patient/:bed", async (req, res) => {
   try {
      const { medication, healthcarePlan } = req.body;
      const response = await Patient.findOneAndUpdate(
         { bed: req.params.bed },
         {
           $push:{medication: medication} ,
           $push:{healthcarePlan: healthcarePlan},
         },
         { new: true }
      );
      res.status(200).json(response);
   } catch (error) {
      res.status(500).json({ message: error });
   }
});

//DELETE - delete or discharge a patient
router.delete("/patient/:bed", async (req, res) => {
   try {
      const response = await Patient.findOneAndDelete({ bed: req.params.bed });
      res.status(200).json({
         message: `Patient in the bed: ${{ bed: req.params.bed }} was discharged or got deaded`,
      });
   } catch (error) {
      res.status(500).json({ message: error });
   }
});

// create Wound
router.post("/wound", async (req, res) => {
   try {
      const { pictureUrl, description, treatment, patient } = req.body;
      //1. Create the wound

      const response = await Wound.create({ pictureUrl, description, treatment, patient });
      //2. Update the patient by pushing the task id to its tasks array
      const woundResponse = await Patient.findOneAndUpdate(
         { bed: Number(req.body.patientId) },
         {
            $push: { wound: response._id },
         },
         { new: true }
      );
      res.status(200).json(woundResponse);
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
   }
});

module.exports = router;
