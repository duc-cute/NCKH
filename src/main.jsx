/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";
import "./styles/index.css";
import "./styles/reset.css";
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
