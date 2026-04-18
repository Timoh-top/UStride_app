import React from "react";
import { Box } from "@mui/material";

const PageContainer = ({ children }) => {
  return (
    <Box
      sx={{
        px: { xs: 1.5, sm: 2, md: 4 },
        py: 2,
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      {children}
    </Box>
  );
};

export default PageContainer;