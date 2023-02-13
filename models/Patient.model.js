const { Schema, model } = require("mongoose");

const patientSchema = new Schema({
   firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
   },
   lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
   },

   birthdate: {
      type: Date,
      required: true,
   },
   age: {
      type: Number,
      get: function () {
         return Math.floor((Date.now() - this.birthdate) / 31536000000);
      },
   },
   bed: {
      type: Number,
      default: null,
      unique: true,
      min: 1,
      max: 10,
   },
   pictureUrl: { String, default: "" },

   personalMedicalHistory: [String],
   regularMedication: [String],
   alergies: { Boolean, default: false },

   episode: String,

   medication: [String],
   healthcarePlan: [String],
});

const Patient = model("Patient", patientSchema);

module.exports = Patient;
