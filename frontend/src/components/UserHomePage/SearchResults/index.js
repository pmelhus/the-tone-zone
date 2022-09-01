import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSearchResults } from "../../../store/search";
import { useEffect, useState } from "react";
import "./SearchResults.css";
import SearchUsers from "./SearchUsers";
import SearchSongs from "./SearchSongs";
import SearchPlaylists from "./SearchPlaylists";

const SearchResults = ({ playFunc, pauseFunc, isLoaded }) => {
  const { pathname } = useLocation();
  const searchResults = useSelector((state) => state?.search);
  const [userFilter, setUserFilter] = useState(true);
  const [songFilter, setSongFilter] = useState(true);
  const [everythingFilter, setEverythingFilter] = useState(true);

  // console.log(searchResults, "HALLO");
  const dispatch = useDispatch();
  // console.log(songs)

  const handleSongFilter = () => {
    setUserFilter(false);
    setSongFilter(true);
  };

  const handleUserFilter = () => {
    setUserFilter(true);
    setSongFilter(false);
  };

  const handleEverythingFilter = () => {
    setUserFilter(true);
    setSongFilter(true);
  };

  return (
    <>
      <div className="search-results-container">
        <div className="search-results-heading">
          <p>{`Search results for "${pathname.split("/")[2]}"`}</p>
        </div>
        <div className="search-results-categories">
          <ul className="search-categories-list">
            <li>
            <i className="fa-solid fa-magnifying-glass"></i>
              <button onClick={handleEverythingFilter}>Everything</button>
            </li>
            <li>
            <i className="fa-solid fa-list-music"></i>
              <button onClick={handleSongFilter}>Tracks</button>
            </li>
            <li>
            <i className="fa-regular fa-user"></i>
              <button onClick={handleUserFilter}>People</button>
            </li>
          </ul>
        </div>
        <div className="search-results">
          <div className="number-of-results">
            <p>{`Found people, tracks, playlists`}</p>
          </div>
          {userFilter && (
            <>
              <SearchUsers {...{ searchResults }} />
            </>
          )}
          {songFilter && (
            <>
              <SearchSongs
                {...{ pauseFunc }}
                {...{ playFunc }}
                {...{ searchResults }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
