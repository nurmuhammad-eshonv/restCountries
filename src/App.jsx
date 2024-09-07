import React, { useState, createContext } from "react";
import Home from "./pages/Home";
import Details from "./pages/Details";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
