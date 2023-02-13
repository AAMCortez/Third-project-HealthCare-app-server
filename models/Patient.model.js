const { Schema, model } = require("mongoose");

const patientSchema = new Schema({
   name: {
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
   },
   bed: {
      type: Number,
      default: null,
   },
   pictureUrl: { String, default: "" },
   info: {
      clinicalHistory: {
         diseases: [String],
         episode: String,
         previousMedication: [String],
      },
   },
   medication: [String],
   healthcarePlan: [String],
});

const Patient = model("Patient", patientSchema);

module.exports = Patient;
