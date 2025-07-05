import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Master from "./pages/master/Master";
import Team from "./pages/Team";
import Alert from "./pages/Alert";

export default function App({ mode, setMode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        darkMode={mode === "dark"}
        setDarkMode={() => setMode(mode === "light" ? "dark" : "light")}
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        sidebarCollapsed={sidebarCollapsed}
      />
      <Sidebar collapsed={sidebarCollapsed} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, width: `calc(100% - ${sidebarCollapsed ? 70 : 240}px)`,
      transition: "all 0.3s ease",}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/master" element={<Master />} />
          <Route path="/team" element={<Team />} />
          <Route path="/alert" element={<Alert />} />
        </Routes>
      </Box>
    </Box>
  );
}
