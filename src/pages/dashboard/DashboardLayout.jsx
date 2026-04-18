import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          backgroundColor: "#f5f6fa",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;