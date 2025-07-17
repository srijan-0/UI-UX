const Appointment = require("../models/appointment");

// Create new appointment
exports.createAppointment = async (req, res) => {
  const { user, phone, appointmentDate, appointmentTime } = req.body;

  if (!user || !phone || !appointmentDate || !appointmentTime) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newAppointment = new Appointment({
      userId: req.user._id, 
      user,
      phone,
      appointmentDate,
      appointmentTime,
    });

    await newAppointment.save();
    res.status(200).json({
      success: true,
      message: "Appointment created successfully.",
      appointment: newAppointment,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to create appointment.",
      details: err.message,
    });
  }
};


// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("userId", "name email");
    res.status(200).json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch appointments.",
      details: err.message,
    });
  }
};

// Get appointments by user
exports.getAppointmentsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const appointments = await Appointment.find({ userId });
    res.status(200).json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch user appointments.",
      details: err.message,
    });
  }
};
exports.getMyAppointments = async (req, res) => {
  try {
    const userId = req.user._id; // user from token

    const appointments = await Appointment.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch your appointments.",
      details: err.message,
    });
  }
};

// Cancel or update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  const appointmentId = req.params.id;
  const { status } = req.body;

  try {
    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Appointment status updated",
      updated,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to update status",
      details: err.message,
    });
  }
};
