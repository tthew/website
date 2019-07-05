/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import UpdateBanner from "./src/components/update-banner";

import theme from "./src/style/theme";

console.groupCollapsed(`👋 Hey there`);
console.info(`🔍 Wanna see what's under the hood?`);
console.info(`💻 Head over to Github for the for the full source:`);
console.info(`🔗 https://github.com/tthew/website`);
console.info(`🤔 Like what you see? Let's chat?`);
console.info(`📧 hallo@tthew.berlin`);
console.groupEnd();

const renderUpdateBanner = () => {
  const el =
    document.querySelector(".update-banner-container") ||
    document.createElement("div");
  el.classList.add("update-banner-container");
  const bodyEl = document.querySelector("body");
  bodyEl.insertBefore(el, bodyEl.firstChild);
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <UpdateBanner />
    </ThemeProvider>,
    el
  );
  setTimeout(() => {
    el.classList.add("update-banner-container--visible");
  }, 2000);
};

export const onServiceWorkerUpdateReady = () => renderUpdateBanner();
