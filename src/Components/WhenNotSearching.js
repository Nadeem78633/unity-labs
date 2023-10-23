import React from "react";
import { Card, CardContent } from "@mui/material";

const WhenNotSearching = ({ loading, searchResults, error }) => {
  return (
    <>
      {!error && !loading && searchResults.length === 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card style={{ backgroundColor: "#0f172a", color: "#A6FF96",boxShadow:'none' }}>
            <CardContent>
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "Poppins",
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                Perform a search to see results.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default WhenNotSearching;
