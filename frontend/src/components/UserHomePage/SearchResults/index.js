import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// import {getSearchResults} from "../../../store/search"
import "./SearchResults.css";

const SearchResults = () => {
  const { pathname } = useLocation();
  const searchResults = useSelector((state) => state.search);
  // console.log(searchResults, "HALLO");
  const songs = Object.values(searchResults.songs);
  // console.log(songs)
  const users = Object.values(searchResults.users);
  const playlists = Object.values(searchResults.playlists);
  return (
    <>
      <div className="search-results-container">
        <div className="search-results-heading">
          <p>{`Search results for "${pathname.split("/")[2]}"`}</p>
        </div>
        <div className="search-results-categories">
          <ul className="search-categories-list">
            <li>
              <button>Everything</button>
            </li>
            <li>
              <button>Tracks</button>
            </li>
            <li>
              <button>People</button>
            </li>
            <li>
              <button>Playlists</button>
            </li>
          </ul>
        </div>
        <div className="search-results">
          <div className="number-of-results">
            <p>{`Found people, tracks, playlists`}</p>
          </div>
          <SearchUsers />
          <SearchSongs />
          <SearchPlaylists />
        </div>
      </div>
    </>
  );
};

export default SearchResults;
