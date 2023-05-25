import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSearchResults } from "../../../store/search";
import { useEffect, useState } from "react";
import "./SearchResults.css";
import SearchUsers from "./SearchUsers";
import SearchSongs from "./SearchSongs";
import SearchPlaylists from "./SearchPlaylists";

const SearchResults = ({
  sessionUser,
  waveLoading,
  setWaveLoading,
  wavePlayer,
  audioPlayer,
  currentAudio,
  isPlaying,
  toggleIsPlaying,
  setSourceChangeSwitch,
  setCurrentAudio,
  h5CanPlay,
}) => {
  const { pathname } = useLocation();

  const [userFilter, setUserFilter] = useState(true);
  const [songFilter, setSongFilter] = useState(true);
  const [everythingFilter, setEverythingFilter] = useState(true);
  const searchResults = useSelector((state) => state.search);
  const searchKeys = Object.keys(searchResults);
  const userResults = searchResults.users;
  const songResults = searchResults.songs;
  const playlistResults = searchResults.playlists;
const searchWord = pathname.split('/')[2]
  const dispatch = useDispatch();

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

  useEffect(()=> {
dispatch(getSearchResults(searchWord))
  }, [])

  return (
    <>
      <div className="search-results-container">
        <div className="search-results-heading">
          <p>{`Search results for "${pathname.split("/")[2]}"`}</p>
        </div>

        <div className="search-results-cats-results">
          <div className="search-results-relative">
            <div className="search-results-categories">
              <ul className="search-categories-list">
                <li
                  className={
                    userFilter && songFilter
                      ? "everything-selected"
                      : "everything-unselected"
                  }
                >
                  <i className="fa-solid fa-lg fa-magnifying-glass"></i>
                  <div
                    className="catagories-text"
                    onClick={handleEverythingFilter}
                  >
                    Everything
                  </div>
                </li>
                <li
                  className={
                    songFilter && !userFilter
                      ? "everything-selected"
                      : "everything-unselected"
                  }
                >
                  <i className="fa-solid fa-list-music"></i>
                  <div className="catagories-text" onClick={handleSongFilter}>
                    Tracks
                  </div>
                </li>
                <li
                  className={
                    !songFilter && userFilter
                      ? "everything-selected"
                      : "everything-unselected"
                  }
                >
                  <i className="fa-regular fa-user"></i>
                  <div className="catagories-text" onClick={handleUserFilter}>
                    People
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="search-results">
            <div
              style={{
                color: "gray",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
              className="number-of-results"
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0",
                  margin: "0",
                }}
              >
                Found&nbsp;
                <p
                  style={{
                    fontWeight: "bold",
                    color: "rgb(253, 77, 1)",
                    margin: "0",
                  }}
                >{`${userResults?.length ? userResults?.length : "0"}`}</p>
                &nbsp;
                {userResults?.length > 1 || userResults === null
                  ? "people"
                  : "person"}
                ,
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0",
                  margin: "0",
                }}
              >
                &nbsp;
                <p
                  style={{
                    fontWeight: "bold",
                    color: "rgb(253, 77, 1)",
                    margin: "0",
                  }}
                >{`${songResults?.length ? songResults?.length : "0"}`}</p>
                &nbsp;
                {songResults?.length > 1 || songResults === null
                  ? "tracks"
                  : "track"}
              </div>
              {/* <p style={{display: "inline-flex", alignItems: "center", padding: "0", margin: "0"}}>
              &nbsp;<p style={{fontWeight: "bold", color: "rgb(253, 77, 1)" }}>{`${Object.keys(searchResults.playlists).length}`}</p>&nbsp;playlists
            </p> */}
              {/* "${Object.keys(searchResults.songs).length} tracks, playlists"</p> */}
            </div>
            {searchKeys.length || searchKeys.length ? (
              <>
                {userFilter && (
                  <>
                    <SearchUsers {...{ userResults }} />
                  </>
                )}
                {songFilter && (
                  <>
                    <SearchSongs
                      {...{ h5CanPlay }}
                      {...{ wavePlayer }}
                      {...{ setCurrentAudio }}
                      {...{ waveLoading }}
                      {...{ setWaveLoading }}
                      {...{ currentAudio }}
                      {...{ isPlaying }}
                      {...{ toggleIsPlaying }}
                      {...{ setSourceChangeSwitch }}
                      {...{ audioPlayer }}
                      {...{ songResults }}
                    />
                  </>
                )}
              </>
            ) : (
              <h2>Looks like your search returned no results!</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
