import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";

import ErrorForComment from "./ErrorForComment";

function PostDetail() {
  const { objectId } = useParams();
  const [postDetail, setPostDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [expanded, setExpanded] = useState([]);

  const handleExpand = (commentIndex) => {
    const newExpanded = [...expanded];
    newExpanded[commentIndex] = !newExpanded[commentIndex];
    setExpanded(newExpanded);
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://hn.algolia.com/api/v1/items/${objectId}`
        );
        setPostDetail(response.data);
        // Initialize the expanded state array with all values set to false
        setExpanded(new Array(response.data.children.length).fill(false));
      } catch (error) {
        setError(
          "An error occurred while fetching post detail. Please Check Your Internet."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [objectId]);

  return (
    <div>
      {loading && (
        <div
          style={{
            display: "flex",
            color: "white",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
          }}
        >
          <CircularProgress
            style={{ color: "white", height: "50px", width: "50px" }}
          />
        </div>
      )}
      {error && <ErrorForComment error={error} />}
      {postDetail && (
        <Card style={{ backgroundColor: "#1f293b" }}>
          <CardContent style={{ marginTop: "20px" }}>
            <Typography
              style={{
                color: "#5B9A8B",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  color: "white",
                  marginRight: "10px",
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                Title:
              </span>
              {postDetail.title}
            </Typography>
            <Typography
              style={{
                color: "#5B9A8B",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  color: "white",
                  marginRight: "10px",
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Points:
              </span>
              {postDetail.points}
            </Typography>
            <h3
              style={{
                color: "white",
                fontFamily: "Poppins",
                fontSize: "20px",
              }}
            >
              Comments:
            </h3>

            {postDetail.children && postDetail.children.length > 0 ? (
              <Grid container spacing={2}>
                {postDetail.children.map((comment, index) => (
                  <Grid
                    item
                    xl={3}
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                    key={comment.id}
                  >
                    <Card style={{ backgroundColor: "#0f172a" }}>
                      <CardContent>
                        {comment.text.length > 20 ? (
                          <Accordion
                            style={{
                              backgroundColor: "#0f172a",
                              boxShadow: "none",
                            }}
                          >
                            <AccordionSummary
                              expandIcon={
                                <ExpandMoreIcon
                                  style={{
                                    color: "white",
                                    position: "relative",
                                    top: "-25px",
                                    right: "-10px",
                                  }}
                                />
                              }
                              onClick={() => handleExpand(index)}
                            >
                              <Typography
                                style={{
                                  color: "white",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {expanded[index]
                                  ? comment.text
                                  : comment.text.substring(0, 30) + "..."}
                              </Typography>
                            </AccordionSummary>
                          </Accordion>
                        ) : (
                          <Typography
                            style={{ color: "white", fontFamily: "Poppins" }}
                          >
                            {comment.text}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <p>No comments found.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default PostDetail;
