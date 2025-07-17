const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "users",
      required: true,
    },

    user: {
      type: String,
      required: true,
      
    },
     phone: {
      type: String,
      required: true,
      
    },
    
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);
module.exports = appointmentModel;
