import React, { Fragment } from "react";
import moment from "moment";

const AdminFooter = () => {
  return (
    <Fragment>
      <footer
        style={{ background: "#303031", color: "#87898A" }}
        className="z-10 py-6 px-4 md:px-12 text-center text-sm"
      >
        © {moment().format("YYYY")} JIWANTU Admin Panel — All rights reserved.
      </footer>
    </Fragment>
  );
};

export default AdminFooter;
