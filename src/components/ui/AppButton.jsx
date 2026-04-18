import React from "react";
import { Button } from "@mui/material";

const AppButton = ({ children, variant = "contained", ...props }) => {
  return (
    <Button
      variant={variant}
      {...props}
      sx={{
        textTransform: "none",
        fontWeight: 600,
        borderRadius: "10px",
        padding: "10px 14px",
        boxShadow: "none",
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;