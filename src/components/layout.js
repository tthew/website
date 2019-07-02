import React from "react";
import PropTypes from "prop-types";

import "./layout.css";

const Layout = ({ children }) => (
  <div className="container">
    <main id="main" role="main">
      {children}
    </main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
