import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function NotFound({ message, to }) {
  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      margin:"2px",
      justifyContent:"center",
      alignItems:"center",
      minHeight:"100vh",
      height:"100%",
      width:"100%",
      fontFamily:"inherit"
    }}>
      <Typography variant="h3">{message}</Typography>
      {
        to && <Button
        LinkComponent={Link}
        variant="contained"
        color="error"
        to={to}
        >Go Back</Button>
      }
     
    </div>
  );
}

export default NotFound;
