import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getAllNotices = async () => {
    try {
        let res = await axios.get(`${apiURL}/api/notice/all-notices`);
        return res.data;
    } catch (error) {
        console.error("Error fetching notices:", error.response?.data || error);
        return { error: "Failed to fetch notices" };
    }
};

// Function to create a new notice (NO TOKEN REQUIRED)
export const createNotice = async ({ title, description, time }) => {
    let data = { title, description, time };
    try {
        let res = await axios.post(`${apiURL}/api/notice/add-notice`, data, {
            headers: {
                "Content-Type": "application/json", // No Authorization header
            },
        });
        return res.data;
    } catch (error) {
        console.error("Error creating notice:", error.response?.data || error);
        return { error: "Failed to create notice" };
    }
};

// Function to edit an existing notice
export const editNotice = async (nId, title, description, time) => {
    let data = { nId, title, description, time };
    try {
        let res = await axios.post(`${apiURL}/api/notice/edit-notice`, data);
        if (res.data.success) {
            // Return the updated notice after editing
            return {
                success: true,
                notice: res.data.updatedNotice, // Assuming your backend returns the updated notice object
            };
        } else {
            return { error: res.data.message || "Failed to edit notice" };
        }
    } catch (error) {
        console.error("Error editing notice:", error.response?.data || error);
        return { error: "Failed to edit notice" };
    }
};

// Function to delete a notice
export const deleteNotice = async (nId) => {
    try {
        let res = await axios.post(`${apiURL}/api/notice/delete-notice`, { nId });
        return res.data;
    } catch (error) {
        console.error("Error deleting notice:", error.response?.data || error);
        return { error: "Failed to delete notice" };
    }
};
