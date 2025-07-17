import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layout/index";

const apiURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    setErrorMsg("");

    const tokenData = localStorage.getItem("jwt") || localStorage.getItem("token");
    let authToken = "";

    try {
      const parsed = JSON.parse(tokenData);
      authToken = parsed.token || tokenData;
    } catch {
      authToken = tokenData;
    }

    if (!authToken) {
      setErrorMsg("User not logged in.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${apiURL}/api/appointment/all`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.data.success) {
        const sorted = [...res.data.appointments].sort((a, b) => b._id.localeCompare(a._id));
        setAppointments(sorted);
      } else {
        setErrorMsg(res.data.message || "Failed to fetch appointments.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Error fetching appointments.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    setUpdatingId(appointmentId);
    setErrorMsg("");

    const tokenData = localStorage.getItem("jwt") || localStorage.getItem("token");
    let authToken = "";

    try {
      const parsed = JSON.parse(tokenData);
      authToken = parsed.token || tokenData;
    } catch {
      authToken = tokenData;
    }

    if (!authToken) {
      setErrorMsg("User not logged in.");
      setUpdatingId(null);
      return;
    }

    try {
      const res = await axios.put(
        `${apiURL}/api/appointment/update-status/${appointmentId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (res.data.success) {
        setAppointments((prev) =>
          [...prev].map((appt) =>
            appt._id === appointmentId ? { ...appt, status: newStatus } : appt
          ).sort((a, b) => b._id.localeCompare(a._id))
        );
      } else {
        setErrorMsg(res.data.message || "Failed to update status.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Error updating status.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow mt-10">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          📅 All Pet Visit Appointments
        </h2>

        {loading && <p className="text-center text-gray-500">Loading appointments...</p>}
        {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}
        {!loading && !errorMsg && appointments.length === 0 && (
          <p className="text-center text-gray-600">No appointments found.</p>
        )}

        {!loading && appointments.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-center">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 border">User Name</th>
                  <th className="px-4 py-3 border">Phone</th>
                  <th className="px-4 py-3 border">Date</th>
                  <th className="px-4 py-3 border">Time</th>
                  <th className="px-4 py-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border">{appt.user}</td>
                    <td className="px-4 py-3 border">{appt.phone}</td>
                    <td className="px-4 py-3 border">
                      {new Date(appt.appointmentDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 border">{appt.appointmentTime}</td>
                    <td className="px-4 py-3 border">
                      <select
                        value={appt.status || "pending"}
                        disabled={updatingId === appt._id}
                        onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="approved">✔️ Approved</option>
                        <option value="cancelled">❌ Cancelled</option>
                      </select>
                      {updatingId === appt._id && (
                        <span className="ml-2 text-sm text-blue-500">Updating...</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AllAppointments;
