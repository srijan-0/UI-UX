// import moment from "moment";
// import React, { Fragment } from "react";

// const Footer = (props) => {
//   return (
//     <Fragment>
//       <footer
//         style={{ background: "#303031", color: "#87898A" }}
//         className="z-10 py-6 px-4 md:px-12 text-center"
//       >
//         Develop by Srijan {moment().format("YYYY")}
//       </footer>
//     </Fragment>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold text-white">JIWANTU</h2>
          <p className="mt-2">
            JIWANTU is a pet adoption web-based platform helping you find your perfect furry companion. 🐾
          </p>
          <p className="mt-4">© {year} JIWANTU. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/adopt" className="hover:underline">Adopt a Pet</Link></li>
            <li><Link to="/wish-list" className="hover:underline">Favorites</Link></li>
            <li><Link to="/blog" className="hover:underline">Notice</Link></li>
            <li><Link to="/contact-us" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <p>Email: <a href="mailto:srijan.shrestha000@gmail.com" className="hover:underline">srijan.shrestha000@gmail.com</a></p>
          <p className="mt-2">Phone: <a href="tel:9862107925" className="hover:underline">9862107925</a></p>
          <p className="mt-2">Location: Kathmandu, Nepal</p>
          <div className="mt-4 flex gap-4">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Instagram</a>
            {/* You can replace with real links or icons */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
