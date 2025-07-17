// const express = require("express");
// const router = express.Router();
// const {
//   createAppointment,
//   getAllAppointments,
//   getAppointmentsByUser,
//   updateAppointmentStatus,
// } = require("../controller/appointment");

// const authMiddleware = require("../middleware/authMiddleware");

// router.post("/create-appointment", authMiddleware, createAppointment);
// router.get("/all", getAllAppointments);
// router.get("/user/:userId", getAppointmentsByUser);
// router.put("/update-status/:id", updateAppointmentStatus);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
  getAppointmentsByUser,
  updateAppointmentStatus,
  getMyAppointments,  // add this
} = require("../controller/appointment");

const authMiddleware = require("../middleware/authMiddleware");

// Create appointment (auth required)
router.post("/create-appointment", authMiddleware, createAppointment);

// Get all appointments (auth required)
router.get("/all", authMiddleware, getAllAppointments);

// Get appointments by user ID (auth required)
router.get("/user/:userId", authMiddleware, getAppointmentsByUser);

// Get appointments of logged-in user (auth required)
router.get("/my-appointments", authMiddleware, getMyAppointments);

// Update appointment status (auth required)
router.put("/update-status/:id", authMiddleware, updateAppointmentStatus);

module.exports = router;
