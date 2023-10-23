import { Link } from "react-router-dom";
import News from "./News";
import { Grid } from "@mui/material";

function SearchResults({ results }) {
  return (
    <div>
      <Grid container spacing={2}>
        {results.map((result) => (
          <Grid item lg={3} md={4} xl={3} sm={6} xs={12} key={result.objectID}>
            <div>
              <Link
                to={`/post/${result.objectID}`}
                style={{ textDecoration: "none" }}
              >
                <News result={result} />
              </Link>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
export default SearchResults;
