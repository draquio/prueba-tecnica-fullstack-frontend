import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/Auth.jsx";
import { FilterProvider } from "./contexts/Filter.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FilterProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </FilterProvider>
  </React.StrictMode>
);
