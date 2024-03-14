import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./store/user_context";
import { ThemeProvider } from "@mui/material/styles";
import ByCityStatePage from "./pages/ByCityStatePage";
import ByLocationPage from "./pages/ByLocationPage";
import theme from "./theme";
import BeerStylesPage from "./pages/BeerStylesPage";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          <Navbar />
          <App />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/bycitystate" element={<ByCityStatePage />} />
            <Route exact path="/bylocation" element={<ByLocationPage />} />
            <Route exact path="/beerstyles" element={<BeerStylesPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
