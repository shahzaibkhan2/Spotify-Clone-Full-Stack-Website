import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AddContextProvider from "./context/AddContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AddContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AddContextProvider>
  </React.StrictMode>
);
