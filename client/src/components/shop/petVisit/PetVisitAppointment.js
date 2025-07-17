
import React, { useState, Fragment } from "react";
import axios from "axios";
import { Navber, Footer } from "../partials";
import { useHistory } from "react-router-dom";  // <-- import

const apiURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const PetVisitAppointment = () => {
  const history = useHistory(); // <-- initialize history

  const [form, setForm] = useState({
    name: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, appointmentDate, appointmentTime } = form;

    if (!name || !phone || !appointmentDate || !appointmentTime) {
      setErrorMsg("Please fill all required fields.");
      return;
    }

    const tokenData = localStorage.getItem("jwt") || localStorage.getItem("token");
    let authToken = "";

    if (tokenData) {
      try {
        const parsed = JSON.parse(tokenData);
        authToken = parsed.token || tokenData;
      } catch {
        authToken = tokenData;
      }
    }

    if (!authToken) {
      setErrorMsg("User not logged in or token missing.");
      return;
    }

    const appointmentData = {
      user: name,
      phone,
      appointmentDate,
      appointmentTime,
    };

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post(
        `${apiURL}/api/appointment/create-appointment`,
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.data.success) {
        setSuccessMsg(res.data.message || "Appointment created successfully!");
        setForm({
          name: "",
          phone: "",
          appointmentDate: "",
          appointmentTime: "",
        });
      } else {
        setErrorMsg(res.data.message || "Something went wrong.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Error creating appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Navber />
      <div className="max-w-lg mx-auto bg-white rounded shadow mt-10 pt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Pet Visit Appointment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Appointment Date */}
          <div>
            <label className="block font-medium mb-1">Appointment Date</label>
            <input
              type="date"
              name="appointmentDate"
              value={form.appointmentDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Appointment Time */}
          <div>
            <label className="block font-medium mb-1">Appointment Time</label>
            <input
              type="time"
              name="appointmentTime"
              value={form.appointmentTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white font-semibold rounded ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Book Appointment"}
          </button>

          {/* History Button */}
          <button
            type="button"
            onClick={() => history.push("/user/appointments")} // navigate to appointment history
            className="w-full mt-3 py-2 px-4 text-blue-700 font-semibold rounded border border-blue-700 hover:bg-blue-100"
          >
            View Appointment History
          </button>

          {/* Messages */}
          {errorMsg && <p className="text-red-600 mt-2 text-center">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 mt-2 text-center">{successMsg}</p>}
        </form>
      </div>
      <Footer />
    </Fragment>
  );
};

export default PetVisitAppointment;
