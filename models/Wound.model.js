const { Schema, model } = require("mongoose");

const woundSchema = new Schema(
   {
      pictureUrl: String,
      description: String,
      treatment: String,
      patient: { type: Schema.Types.ObjectId, ref: "Patient" },
   },
   { timestamp: true }
);

const Wound = model("Wound", woundSchema);

module.exports = Wound;
