import React from "react";
import ReactDOM from "react-dom";
import "./sass/main.scss";
import { Provider } from "react-redux";
import store from "./app/store"; // Import your Redux store
import App from "./App";

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
