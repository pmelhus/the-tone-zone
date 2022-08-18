import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./SearchResults.css";

const SearchResults = () => {
  const { pathname } = useLocation();
  return (
    <>
      <div className="search-results-container">
        <div className="search-results-heading">
          <p>{`Search results for "${pathname.split("/")[2]}"`}</p>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
