import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ErrorForAllNews = ({ error }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card style={{ backgroundColor: "#0f172a", boxShadow: "none" }}>
          <CardContent>
            <Typography
              style={{
                color: "red",
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "20px",
              }}
            >
              {error}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ErrorForAllNews;
