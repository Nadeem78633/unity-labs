import { Typography, Card, CardContent } from "@mui/material";
import React from "react";

const ErrorForComment = ({ error }) => {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Card
        style={{
          backgroundColor: "#0f172a",
                  boxShadow: "none",
         
        }}
      >
        <CardContent>
          <Typography
            style={{ fontFamily: "Poppins", color: "red", fontWeight: 700,fontSize:'20px' }}
          >
            {error}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorForComment;
