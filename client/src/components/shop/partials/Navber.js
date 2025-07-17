import React, { Fragment, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./style.css";

import { isAdmin } from "../auth/fetchApi";
import { LayoutContext } from "../index";
import { logout } from "./Action";

const Navber = (props) => {
  const history = useHistory();
  const location = useLocation();

  const { data, dispatch } = useContext(LayoutContext);

  const navberToggleOpen = () =>
    data.navberHamburger
      ? dispatch({ type: "hamburgerToggle", payload: false })
      : dispatch({ type: "hamburgerToggle", payload: true });

  const loginModalOpen = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  return (
    <Fragment>
      {/* Navber Section */}
      <nav className="fixed top-0 w-full z-20 shadow-lg lg:shadow-none bg-white">
        <div className="m-4 md:mx-12 md:my-6 grid grid-cols-4 lg:grid-cols-3">
          <div className="hidden lg:block col-span-1 flex text-gray-600 mt-1">
            <span
              className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer"
              onClick={() => history.push("/")}
            >
              Home
            </span>
            <span
              className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer"
              onClick={() => history.push("/blog")}
            >
              Notice
            </span>
            
            <span
              className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer"
              onClick={() => history.push("/appointment")}
            >
              Appointment
            </span>
          </div>
          <div className="col-span-2 lg:hidden flex justify-items-stretch items-center">
            <svg
              onClick={() => navberToggleOpen()}
              className="col-span-1 lg:hidden w-8 h-8 cursor-pointer text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span
              onClick={() => history.push("/")}
              style={{ letterSpacing: "0.10rem" }}
              className="flex items-left text-center font-bold uppercase text-gray-800 text-2xl cursor-pointer px-2 text-center"
            >
              JIWANTU
            </span>
          </div>
          <div
            onClick={() => history.push("/")}
            style={{ letterSpacing: "0.70rem" }}
            className="hidden lg:block flex items-left col-span-1 text-center text-gray-800 font-bold tracking-widest uppercase text-2xl cursor-pointer"
          >
            JIWANTU
          </div>
          <div className="flex items-right col-span-2 lg:col-span-1 flex justify-end">
            {/* WishList Page Button */}
            <div
              onClick={() => history.push("/wish-list")}
              className="hover:bg-gray-200 rounded-lg px-2 py-2 cursor-pointer"
              title="Wishlist"
            >
              <svg
                className={`${
                  location.pathname === "/wish-list" ? "fill-current text-gray-800" : ""
                } w-8 h-8 text-gray-600 cursor-pointer`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            {localStorage.getItem("jwt") ? (
              <Fragment>
                <div
                  className="userDropdownBtn hover:bg-gray-200 px-2 py-2 rounded-lg relative"
                  title="Logout"
                >
                  <svg
                    className="cursor-pointer w-8 h-8 text-gray-600 hover:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="userDropdown absolute right-0 mt-1 bg-gray-200 rounded">
                    <li className="flex flex-col text-gray-700 w-48 shadow-lg">
                      {/* Admin Login visible to all logged-in users */}
                      <span
                        onClick={() => history.push("/admin-login")}
                        className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                      >
                        <span>
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </span>
                        <span>Admin Login</span>
                      </span>

                      {!isAdmin() ? (
                        <Fragment>
                          <span
                            onClick={() => history.push("/user/orders")}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </span>
                            <span>My Orders</span>
                          </span>
                          <span
                            onClick={() => history.push("/user/profile")}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </span>
                            <span>My Account</span>
                          </span>
                          
                          <span
                            onClick={() => history.push("/user/setting")}
                            className="flex space-x-1 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </span>
                            <span>Setting</span>
                          </span>
                          <span
                            onClick={() => logout()}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                            </span>
                            <span>Logout</span>
                          </span>
                        </Fragment>
                      ) : (
                        <Fragment>
                         
                          <span
                            onClick={() => logout()}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                            </span>
                            <span>Logout</span>
                          </span>
                        </Fragment>
                      )}
                    </li>
                  </div>
                </div>
              </Fragment>
            ) : (
              // Login Modal Button
              <div
                className="loginSignupBtn rounded-lg px-2 py-2 hover:bg-gray-200 cursor-pointer"
                title="Login"
                onClick={() => loginModalOpen()}
              >
                <svg
                  className="w-8 h-8 text-gray-600 cursor-pointer hover:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navber;


// import React, { Fragment, useContext } from "react";
// import { useHistory, useLocation } from "react-router-dom";
// import "./style.css";

// import { isAdmin } from "../auth/fetchApi";
// import { LayoutContext } from "../index";
// import { logout } from "./Action";

// const Navber = () => {
//   const history = useHistory();
//   const location = useLocation();
//   const { data, dispatch } = useContext(LayoutContext);

//   const navberToggleOpen = () =>
//     dispatch({ type: "hamburgerToggle", payload: !data.navberHamburger });

//   const loginModalOpen = () =>
//     dispatch({ type: "loginSignupModalToggle", payload: !data.loginSignupModal });

//   return (
//     <Fragment>
//       <nav className="fixed top-0 w-full z-20 shadow-lg lg:shadow-none bg-white">
//         <div className="m-4 md:mx-12 md:my-6 grid grid-cols-3 items-center">
//           {/* Logo always on the left */}
//           <div
//             onClick={() => history.push("/")}
//             style={{ letterSpacing: "0.70rem" }}
//             className="col-span-1 text-left text-gray-800 font-bold tracking-widest uppercase text-2xl cursor-pointer"
//           >
//             JIWANTU
//           </div>

//           {/* Center Nav Links (desktop only) */}
//           <div className="hidden lg:flex justify-center space-x-4 col-span-1 text-gray-600">
//             <span
//               className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer"
//               onClick={() => history.push("/")}
//             >
//               Home
//             </span>
//             <span
//               className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer"
//               onClick={() => history.push("/blog")}
//             >
//               Notice
//             </span>
//             <span
//               className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer"
//               onClick={() => history.push("/appointment")}
//             >
//               Appointment
//             </span>
//           </div>

//           {/* Right Section */}
//           <div className="col-span-1 flex justify-end items-center space-x-2">
//             {/* Hamburger for mobile */}
//             <div className="lg:hidden">
//               <svg
//                 onClick={navberToggleOpen}
//                 className="w-8 h-8 cursor-pointer text-gray-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </div>

//             {/* Wishlist */}
//             <div
//               onClick={() => history.push("/wish-list")}
//               className="hover:bg-gray-200 rounded-lg px-2 py-2 cursor-pointer"
//               title="Wishlist"
//             >
//               <svg
//                 className={`${
//                   location.pathname === "/wish-list" ? "fill-current text-gray-800" : ""
//                 } w-8 h-8 text-gray-600 cursor-pointer`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                 />
//               </svg>
//             </div>

//             {/* User or Admin Dropdown */}
//             {localStorage.getItem("jwt") ? (
//               <div className="userDropdownBtn hover:bg-gray-200 px-2 py-2 rounded-lg relative" title="Logout">
//                 <svg
//                   className="cursor-pointer w-8 h-8 text-gray-600 hover:text-gray-800"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <div className="userDropdown absolute right-0 mt-1 bg-gray-200 rounded shadow-lg">
//                   <li className="flex flex-col text-gray-700 w-48">
//                     <span
//                       onClick={() => history.push("/admin-login")}
//                       className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
//                     >
//                       <span>
//                         <svg
//                           className="w-6 h-6"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                         </svg>
//                       </span>
//                       <span>Admin Login</span>
//                     </span>

//                     {!isAdmin() ? (
//                       <Fragment>
//                         <span onClick={() => history.push("/user/orders")} className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer">
//                           <span>🧾</span>
//                           <span>My Orders</span>
//                         </span>
//                         <span onClick={() => history.push("/user/profile")} className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer">
//                           <span>👤</span>
//                           <span>My Account</span>
//                         </span>
//                         <span onClick={() => history.push("/user/setting")} className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer">
//                           <span>⚙️</span>
//                           <span>Setting</span>
//                         </span>
//                         <span onClick={() => logout()} className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer">
//                           <span>🚪</span>
//                           <span>Logout</span>
//                         </span>
//                       </Fragment>
//                     ) : (
//                       <span onClick={() => logout()} className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer">
//                         <span>🚪</span>
//                         <span>Logout</span>
//                       </span>
//                     )}
//                   </li>
//                 </div>
//               </div>
//             ) : (
//               <div
//                 className="loginSignupBtn rounded-lg px-2 py-2 hover:bg-gray-200 cursor-pointer"
//                 title="Login"
//                 onClick={loginModalOpen}
//               >
//                 <svg
//                   className="w-8 h-8 text-gray-600 cursor-pointer hover:text-gray-800"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>
//     </Fragment>
//   );
// };

// export default Navber;
