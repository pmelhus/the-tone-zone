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
        <div className="search-results-categories">
          <ul className="search-categories-list">
            <li>
              <a>Everything</a>
            </li>
            <li>
              <a>Tracks</a>
            </li>
            <li>
              <a>People</a>
            </li>
            <li>
              <a>Playlists</a>
            </li>
          </ul>
        </div>
        <div className="search-results">
          <div className="number-of-results">
            <p>{`Found people, tracks, playlists`}</p>
          </div>
          <div className="search-result-card">
            <a>
              <img className="result-image" alt="profile-pic"></img>
            </a>
            <div className="result-content"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
