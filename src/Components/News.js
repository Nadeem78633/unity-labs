import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
const News = ({ result }) => {
  return (
    <>
      <Card style={{ backgroundColor: "#1f293b", height: "150px" }}>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Avatar
              variant="rounded"
              style={{
                background: "#A6FF96",
                color: "#1f293b",
                fontFamily: "Poppins",
                fontWeight: 600,
                marginBottom: "20px",
              }}
            >
              {result.author.slice(0, 1).toUpperCase()}
            </Avatar>
            <Typography
              style={{
                color: "#5B9A8B",
                fontFamily: "Poppins",

                fontWeight: 600,
              }}
            ><span style={{color:'white',marginRight:'5px',fontWeight:400} }>Author : </span>
              {result.author}
            </Typography>
          </div>
          <Typography
            style={{ fontFamily: "Poppins", fontWeight: 600, color: "white" }}
          >
            {result.title}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default News;
