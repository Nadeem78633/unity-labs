import React, { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import SearchResults from "./Components/SearchResults";
import PostDetail from "./Components/PostDetail";
import WhenNotSearching from "./Components/WhenNotSearching";

// Error component
import ErrorForAllNews from "./Components/ErrorForAllNews";

// Css
import "./app.css";

// Loader from material ui
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  // Location
  const location = useLocation();
  const isPostDetailRoute = location.pathname.includes("/post");

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setSearchResults(response.data.hits);
    } catch (err) {
      setError(
        "An error occurred while fetching data. Please Check Your Internet Connection."
      );
    } finally {
      setLoading(false);
    }
  };
  console.log(searchResults)

  return (
    <>
      <div>
        {!isPostDetailRoute ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "220px",
                borderRadius: "5px",
                paddingRight: "5px",
                padding: "3px",
              }}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  outline: "none",
                  backgroundColor: "#1f293b",
                  fontSize: "16px",
                  fontFamily: "Poppins",
                  height: "50px",
                  borderRadius: "5px",
                  color: "white",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  border: "1px solid white",
                }}
                placeholder="Search Hacker News"
              />
            </div>
            <button
              style={{
                backgroundColor: "white",
                fontSize: "16px",
                fontFamily: "Poppins",
                height: "50px",
                borderRadius: "5px",
                color: "black",
                paddingLeft: "10px",
                paddingRight: "10px",
                border: "none",
                marginTop: "5px",
                fontWeight: "600",
                cursor: "pointer",
              }}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        ):null}

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
        {error && <ErrorForAllNews error={error} />}
        <WhenNotSearching
          loading={loading}
          searchResults={searchResults}
          error={error}
        />

        <Routes>
          <Route path="/" element={<SearchResults results={searchResults} />} />
          <Route path="/post/:objectId" element={<PostDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
