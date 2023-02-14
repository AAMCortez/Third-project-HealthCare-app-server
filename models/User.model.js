const { Schema, model } = require("mongoose");

const userSchema = new Schema(
   {
      fullName: {
         type: String,
         enum: ["Nurse", "Dr"],
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
userSchema.pre("save", function (next) {
   this.fullName = this.fullName + " " + this.firstName + " " + this.lastName;
   next();
});

const User = model("User", userSchema);

module.exports = User;
