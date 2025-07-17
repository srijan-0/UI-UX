import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navber, Footer } from "../partials";

const apiURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Extract fetch function so it can be called on mount and on refresh button click
  const fetchAppointments = async () => {
    setLoading(true);
    setErrorMsg("");

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
      setErrorMsg("User not logged in.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${apiURL}/api/appointment/my-appointments`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.data.success) {
        setAppointments(res.data.appointments || []);
      } else {
        setErrorMsg(res.data.message || "Failed to fetch appointments.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Error fetching appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Format date nicely, fallback to raw string
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      <Navber />
      <div className="max-w-screen-xl mx-auto px-4 pt-24 pb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          📅 My Appointment History
        </h2>

        

        {loading && <p className="text-center text-gray-600">Loading appointments...</p>}
        {errorMsg && <p className="text-red-600 text-center font-medium">{errorMsg}</p>}
        {!loading && !errorMsg && appointments.length === 0 && (
          <p className="text-center text-gray-500">You have no appointments yet.</p>
        )}

        {!loading && appointments.length > 0 && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="bg-white shadow-md border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
              >
                <div className="mb-2 text-sm text-gray-500">Appointment Date</div>
                <div className="text-xl font-semibold text-gray-800">
                  {formatDate(appt.appointmentDate)}
                </div>

                <div className="mt-2 text-sm text-gray-500">Time</div>
                <div className="text-lg font-medium text-blue-600">{appt.appointmentTime}</div>

                <div className="mt-2 text-sm text-gray-500">Phone</div>
                <div className="text-md text-gray-700">{appt.phone || "N/A"}</div>

                <div className="mt-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      appt.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : appt.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {appt.status === "approved"
                      ? "✔️ Approved"
                      : appt.status === "cancelled"
                      ? "❌ Cancelled"
                      : "⏳ Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AppointmentHistory;
