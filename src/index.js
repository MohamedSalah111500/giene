import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { createBrowserHistory } from "history";
import "react-toastify/dist/ReactToastify.css"; // only needs to be imported once

import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "./redux/configureStore";
import initialState from "./redux/reducers/initialState";
import configureAxios from "./api/configureAxios";
import Amplify from "@aws-amplify/core";
import { BrowserRouter } from "react-router-dom";


import amplifyConfig from "./config/cognitoConfig";

import "react-toastify/dist/ReactToastify.css"; // only needs to be imported once

// const hist = createBrowserHistory();
// configuring redux store
export const store = configureStore(initialState);

// configuring Axios
configureAxios();

// configuring Amplify
Amplify.configure(amplifyConfig);

// configuring Notification Toast
// toast.configure();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReduxProvider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
