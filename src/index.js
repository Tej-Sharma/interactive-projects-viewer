import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// Get stylesheets for react-bootstrap components
import "bootstrap/dist/css/bootstrap.min.css";

// Tailwind custom CSS
import "./styles/main.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
