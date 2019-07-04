import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";

import theme from "../style/theme";

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>{children}</Wrapper>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

const Wrapper = styled.main``;

export default Layout;
