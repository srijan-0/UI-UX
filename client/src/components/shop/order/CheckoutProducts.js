
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";  // add useLocation
import { LayoutContext } from "../layout";
import { quantity, subTotal } from "../partials/Mixins";  // no totalCost needed now

import { getUserIdFromToken } from "../../admin/categories/FetchApi";
import { fetchbrainTree } from "./Action";
import { getBrainTreeToken } from "./FetchApi";

import axios from 'axios';
import DropIn from "braintree-web-drop-in-react";

const apiURL = process.env.REACT_APP_API_URL;

export const CheckoutComponent = () => {
  const history = useHistory();
  const location = useLocation();  // get location
  const userId = getUserIdFromToken();
  const { dispatch } = useContext(LayoutContext);

  const product = location.state?.product || null; // get product from state

  const [state, setState] = useState({
    address: "",
    phone: "",
    error: false,
    success: false,
    clientToken: null,
    instance: {},
  });

  const [successMessage, setSuccessMessage] = useState("");
  


  useEffect(() => {
    fetchbrainTree(getBrainTreeToken, setState);
  }, []);

  

  // Calculate total amount from single product (assuming quantity 1)
  const totalAmount = product ? product.pPrice : 0;

  const handleOrderSubmit = async () => {
    if (!product) {
      setState({ ...state, error: "No product selected for adoption" });
      return;
    }

    const orderData = {
      allProduct: [
        {
          id: product._id,
          quantity: 1, // fixed quantity for single product
        },
      ],
      user: userId,
      amount: totalAmount,
      address: state.address,
      phone: state.phone,
    };

    try {
      const response = await axios.post(`${apiURL}/api/order/create-order`, orderData);
      if (response.data.success) {
        setSuccessMessage("Adoption successful!");
        setTimeout(() => {
          setSuccessMessage("");
          history.push("/");
        }, 3000);
      } else {
        setState({ ...state, error: "Order creation failed. Please try again." });
      }
    } catch (error) {
      setState({
        ...state,
        error: error.response ? error.response.data.message : "An error occurred while creating the order",
      });
    }
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-red-600">
        No product selected for checkout.
      </div>
    );
  }

  return (
    <Fragment>
      <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
        <div className="text-2xl mx-2">Order</div>

        {successMessage && (
          <div className="mx-2 my-4 p-4 bg-green-200 text-green-900 font-semibold rounded">
            {successMessage}
          </div>
        )}

        <div className="flex flex-col md:flex md:space-x-2 md:flex-row">
          <div className="md:w-1/2">
            <CheckoutProducts products={[product]} />
          </div>
          <div className="w-full order-first md:order-last md:w-1/2">
            {state.clientToken !== null ? (
              <Fragment>
                <div onBlur={() => setState({ ...state, error: false })} className="p-4 md:p-8">
                  {state.error && (
                    <div className="bg-red-200 py-2 px-4 rounded">
                      {state.error}
                    </div>
                  )}
                  <div className="flex flex-col py-2">
                    <label htmlFor="address" className="pb-2">Delivery Address</label>
                    <input
                      value={state.address}
                      onChange={(e) =>
                        setState({ ...state, address: e.target.value, error: false })
                      }
                      type="text"
                      id="address"
                      className="border px-4 py-2"
                      placeholder="Address..."
                    />
                  </div>
                  <div className="flex flex-col py-2 mb-2">
                    <label htmlFor="phone" className="pb-2">Phone</label>
                    <input
                      value={state.phone}
                      onChange={(e) =>
                        setState({ ...state, phone: e.target.value, error: false })
                      }
                      type="number"
                      id="phone"
                      className="border px-4 py-2"
                      placeholder="+977"
                    />
                  </div>
                  <DropIn
                    options={{
                      authorization: state.clientToken,
                      paypal: { flow: "vault" },
                    }}
                    onInstance={(instance) => (state.instance = instance)}
                  />
                  <div
                    onClick={handleOrderSubmit}
                    className="w-full px-4 py-2 text-center text-white font-semibold cursor-pointer"
                    style={{ background: "#6CC580" }}
                  >
                    Adopt Now
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="flex items-center justify-center py-12">
                <svg
                  className="w-12 h-12 animate-spin text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
              </div>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProducts = ({ products }) => {
  const history = useHistory();

  return (
    <Fragment>
      <div className="grid grid-cols-2 md:grid-cols-1">
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={index}
              className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 md:flex md:items-center md:justify-between"
            >
              <div className="md:flex md:items-center md:space-x-4">
                <img
                  onClick={() => history.push(`/products/${product._id}`)}
                  className="cursor-pointer md:h-20 md:w-20 object-cover object-center"
                  src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                  alt="product"
                />
                <div className="text-lg md:ml-6 truncate">{product.pName}</div>
                <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                  Price: ${product.pPrice}.00
                </div>
                <div className="font-semibold text-gray-600 text-sm">
                  Subtotal: ${subTotal(product._id, product.pPrice)}.00
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No product found for checkout</div>
        )}
      </div>
    </Fragment>
  );
};

export default CheckoutComponent;


// import React, { Fragment, useContext, useEffect, useState } from "react";
// import { useHistory, useLocation } from "react-router-dom";
// import { LayoutContext } from "../layout";
// import { quantity, subTotal } from "../partials/Mixins";

// import { getUserIdFromToken } from "../../admin/categories/FetchApi";
// import { fetchbrainTree } from "./Action";
// import { getBrainTreeToken } from "./FetchApi";

// import axios from "axios";
// import DropIn from "braintree-web-drop-in-react";

// const apiURL = process.env.REACT_APP_API_URL;

// export const CheckoutComponent = () => {
//   const history = useHistory();
//   const location = useLocation();
//   const userId = getUserIdFromToken();
//   const { dispatch } = useContext(LayoutContext);

//   const product = location.state?.product || null;

//   const [state, setState] = useState({
//     address: "",
//     phone: "",
//     error: false,
//     success: false,
//     clientToken: null,
//     instance: {},
//   });

//   const [successMessage, setSuccessMessage] = useState("");
//   const [phoneError, setPhoneError] = useState("");

//   useEffect(() => {
//     fetchbrainTree(getBrainTreeToken, setState);
//   }, []);

//   const totalAmount = product ? product.pPrice : 0;

//   const handleOrderSubmit = async () => {
//     if (!product) {
//       setState({ ...state, error: "No product selected for adoption" });
//       return;
//     }

//     // ✅ Phone number validation
//     const phonePattern = /^[0-9]{10}$/;
//     if (!phonePattern.test(state.phone)) {
//       setPhoneError("Phone number must be exactly 10 digits and numeric only.");
//       return;
//     }
//     setPhoneError(""); // Clear error if valid

//     const orderData = {
//       allProduct: [
//         {
//           id: product._id,
//           quantity: 1,
//         },
//       ],
//       user: userId,
//       amount: totalAmount,
//       address: state.address,
//       phone: state.phone,
//     };

//     try {
//       const response = await axios.post(`${apiURL}/api/order/create-order`, orderData);
//       if (response.data.success) {
//         setSuccessMessage("Adoption successful!");
//         setTimeout(() => {
//           setSuccessMessage("");
//           history.push("/");
//         }, 3000);
//       } else {
//         setState({ ...state, error: "Order creation failed. Please try again." });
//       }
//     } catch (error) {
//       setState({
//         ...state,
//         error: error.response ? error.response.data.message : "An error occurred while creating the order",
//       });
//     }
//   };

//   if (!product) {
//     return (
//       <div className="flex items-center justify-center h-screen text-xl text-red-600">
//         No product selected for checkout.
//       </div>
//     );
//   }

//   return (
//     <Fragment>
//       <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
//         <div className="text-2xl mx-2">Order</div>

//         {successMessage && (
//           <div className="mx-2 my-4 p-4 bg-green-200 text-green-900 font-semibold rounded">
//             {successMessage}
//           </div>
//         )}

//         <div className="flex flex-col md:flex md:space-x-2 md:flex-row">
//           <div className="md:w-1/2">
//             <CheckoutProducts products={[product]} />
//           </div>
//           <div className="w-full order-first md:order-last md:w-1/2">
//             {state.clientToken !== null ? (
//               <Fragment>
//                 <div onBlur={() => setState({ ...state, error: false })} className="p-4 md:p-8">
//                   {state.error && (
//                     <div className="bg-red-200 py-2 px-4 rounded">
//                       {state.error}
//                     </div>
//                   )}
//                   <div className="flex flex-col py-2">
//                     <label htmlFor="address" className="pb-2">Delivery Address</label>
//                     <input
//                       value={state.address}
//                       onChange={(e) =>
//                         setState({ ...state, address: e.target.value, error: false })
//                       }
//                       type="text"
//                       id="address"
//                       className="border px-4 py-2"
//                       placeholder="Address..."
//                     />
//                   </div>
//                   <div className="flex flex-col py-2 mb-2">
//                     <label htmlFor="phone" className="pb-2">Phone</label>
//                     <input
//                       value={state.phone}
//                       onChange={(e) =>
//                         setState({ ...state, phone: e.target.value, error: false })
//                       }
//                       type="text"
//                       id="phone"
//                       className="border px-4 py-2"
//                       placeholder="+977"
//                     />
//                     {phoneError && (
//                       <div className="text-sm text-red-500 mt-1">{phoneError}</div>
//                     )}
//                   </div>
//                   <DropIn
//                     options={{
//                       authorization: state.clientToken,
//                       paypal: { flow: "vault" },
//                     }}
//                     onInstance={(instance) => (state.instance = instance)}
//                   />
//                   <div
//                     onClick={handleOrderSubmit}
//                     className="w-full px-4 py-2 text-center text-white font-semibold cursor-pointer"
//                     style={{ background: "#6CC580" }}
//                   >
//                     Adopt Now
//                   </div>
//                 </div>
//               </Fragment>
//             ) : (
//               <div className="flex items-center justify-center py-12">
//                 <svg
//                   className="w-12 h-12 animate-spin text-gray-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                   ></path>
//                 </svg>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </Fragment>
//   );
// };

// const CheckoutProducts = ({ products }) => {
//   const history = useHistory();

//   return (
//     <Fragment>
//       <div className="grid grid-cols-2 md:grid-cols-1">
//         {products && products.length > 0 ? (
//           products.map((product, index) => (
//             <div
//               key={index}
//               className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 md:flex md:items-center md:justify-between"
//             >
//               <div className="md:flex md:items-center md:space-x-4">
//                 <img
//                   onClick={() => history.push(`/products/${product._id}`)}
//                   className="cursor-pointer md:h-20 md:w-20 object-cover object-center"
//                   src={`${apiURL}/uploads/products/${product.pImages[0]}`}
//                   alt="product"
//                 />
//                 <div className="text-lg md:ml-6 truncate">{product.pName}</div>
//                 <div className="md:ml-6 font-semibold text-gray-600 text-sm">
//                   Price: ${product.pPrice}.00
//                 </div>
//                 <div className="font-semibold text-gray-600 text-sm">
//                   Subtotal: ${subTotal(product._id, product.pPrice)}.00
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div>No product found for checkout</div>
//         )}
//       </div>
//     </Fragment>
//   );
// };

// export default CheckoutComponent;
