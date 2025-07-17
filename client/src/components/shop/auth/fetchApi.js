// import axios from "axios";
// const apiURL = process.env.REACT_APP_API_URL;

// export const isAuthenticate = () =>
//   localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

// export const isAdmin = () =>
//   localStorage.getItem("jwt")
//     ? JSON.parse(localStorage.getItem("jwt")).user.role === 1
//     : false;

// export const loginReq = async ({ email, password }) => {
//   const data = { email, password };
//   try {
//     let res = await axios.post(`${apiURL}/api/signin`, data);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const signupReq = async ({ name, email, password, cPassword }) => {
//   const data = { name, email, password, cPassword };
//   try {
//     let res = await axios.post(`${apiURL}/api/signup`, data);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };



import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

// export const isAuthenticate = () => {
//   if (typeof window === "undefined") return false;

//   return localStorage.getItem("jwt") ? true : false;
// };

export const isAuthenticate = () => {
  if (typeof window === "undefined") return false;

  const jwt = localStorage.getItem("jwt");

  try {
    return jwt ? JSON.parse(jwt) : false;
  } catch (err) {
    console.error("Invalid JWT in localStorage:", err);
    return false;
  }
};


// export const isAdmin = () => {
//   const token = localStorage.getItem("jwt");
//   if (!token) return false;

//   try {
//     const parsed = JSON.parse(token);
//     // Check if user object exists and role is 1 (admin)
//     return parsed.user && parsed.user.role === 1;
//   } catch (err) {
//     return false;
//   }
// };

export const isAdmin = () => {
  const token = localStorage.getItem("jwt");
  if (!token) return false;

  try {
    const parsed = JSON.parse(token);
    return parsed.user?.role === 1; // role 1 = admin
  } catch (err) {
    return false;
  }
};



export const loginReq = async ({ email, password }) => {
  const data = { email, password };
  try {
    let res = await axios.post(`${apiURL}/api/signin`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupReq = async ({ name, email, password, cPassword }) => {
  const data = { name, email, password, cPassword };
  try {
    let res = await axios.post(`${apiURL}/api/signup`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};




