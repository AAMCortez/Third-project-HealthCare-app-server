const router = require("express").Router();
const Patient = require("../models/Patient.model");

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
router.get("/patient/:patientId", async (req, res) => {
   try {
      const response = await Patient.findById(req.params.patientId);
      res.status(200).json(response);
   } catch (error) {
      res.status(500).json({ message: error });
   }
});

//Create patient
router.post("/patient", async (req, res) => {
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
         !alergies ||
         !episode
      ) {
         res.status(400).json({ message: "missing fields" });
         return;
      }

      const patient = {
         firstName,
         lastName,
         birthdate,
         age,
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
router.put("/patient/:patientId", async (req, res) => {
   try {
      const { medication, healthcarePlan } = req.body;
      const response = await Patient.findByIdAndUpdate(
         req.params.patientId,
         {
            medication,
            healthcarePlan,
         },
         { new: true }
      );
      res.status(200).json(response);
   } catch (error) {
      res.status(500).json({ message: error });
   }
});

//DELETE - delete or discharge a patient
router.delete("/patient/:patientId", async (req, res) => {
   try {
      const response = await Patient.findByIdAndDelete(req.params.patientId);
      res.status(200).json({
         message: `Patient with id${req.params.patientId} was discharged or got deaded`,
      });
   } catch (error) {
      res.status(500).json({ message: error });
   }
});

module.exports = router;
