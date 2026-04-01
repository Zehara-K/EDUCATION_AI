import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />  {/* do NOT wrap App in BrowserRouter here if already in App.jsx */}
  </React.StrictMode>
);