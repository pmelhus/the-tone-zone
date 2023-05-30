import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

import * as ReactDOMClient from "react-dom/client";
import App from "./App";
// import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from "./store";

import { restoreCSRF, csrfFetch } from "./store/csrf";

import * as sessionActions from "./store/session";

import { ThemeProvider } from "react-jss";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
}

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

const theme = {
  orangeTheme: "rgb(255, 85, 0)",
};

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
        <BrowserRouter>
      <React.StrictMode>
          <App />
      </React.StrictMode>
        </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
