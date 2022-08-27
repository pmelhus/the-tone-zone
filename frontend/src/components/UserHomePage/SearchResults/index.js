import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getSearchResults} from "../../../store/search"
import {useEffect} from "react"
import "./SearchResults.css";
import SearchUsers from "./SearchUsers";
import SearchSongs from "./SearchSongs";
import SearchPlaylists from "./SearchPlaylists";


const SearchResults = ({isLoaded}) => {
  const { pathname } = useLocation();
  const searchResults = useSelector((state) => state?.search);
  console.log(searchResults, "HALLO");
  const dispatch = useDispatch()
  // console.log(songs)




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
          <SearchUsers {...{searchResults}} />
          <SearchSongs {...{searchResults}}/>
          <SearchPlaylists {...{searchResults}} />
        </div>
      </div>
    </>
  );
};

export default SearchResults;
