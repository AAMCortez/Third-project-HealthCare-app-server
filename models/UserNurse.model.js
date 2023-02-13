const { Schema, model } = require("mongoose");

const nurseSchema = new Schema(
   {
      name: {
         fullName: {
            type: String,
            default: "Nurse",
         },
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
      password: {
         type: String,
         required: [true, "Password is required."],
      },
      patients: [
         {
            type: Schema.Types.ObjectId,
            ref: "Patient",
         },
      ],
   },
   {
      timestamps: true,
   }
);
nurseSchema.pre("save", function (next) {
   this.name.fullName =
      this.name.fullName + " " + this.name.firstName + " " + this.name.lastName;
   next();
});

const Nurse = model("Nurse", nurseSchema);

module.exports = Nurse;
