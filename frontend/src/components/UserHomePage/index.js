import "./UserHomePage.css";
import Songs from "./Songs";
import { useDispatch, useSelector } from "react-redux";
import Upload from "./Upload";
import Discover from "./Discover";
import { Route, Switch, Link, NavLink, useLocation } from "react-router-dom";
import Song from "./Song";
import Library from "./Library";
import ProfilePage from "./ProfilePage";
import ProfilePlaylist from "./ProfilePlaylist";
import { restoreUser } from "../../store/session";
import { useEffect, useState } from "react";
import { getAllPlaylists } from "../../store/playlists";
import { getAllSongs } from "../../store/songs";
import SearchResults from "./SearchResults";
import { getSearchResults } from "../../store/search";
import LibraryNav from "./LibraryNav";
import { getAllCurrentSongs } from "../../store/currentSong";

// howler.js range i
const UserHomePage = ({
  waveLoading,
  setSourceChangeSwitch,
  setWaveLoading,
  isPlaying,
  sessionUser,
  toggleIsPlaying,
  wavePlayer,
  audioPlayer,
  setCurrentAudio,
  currentAudio,
  h5CanPlay,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const searchWord = pathname.split("/")[2];
  const searchPath = pathname.split("/")[1];

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllPlaylists(sessionUser.id));
      await dispatch(getAllSongs());
    };

    const fetchSearch = async () => {
      await dispatch(getSearchResults(searchWord));
    };

    if (searchPath === "search") {
      fetchSearch();
    }
    fetchData();
    setIsLoaded(true);
  }, [dispatch, pathname]);



  return (
    <div className="user-home-body">
      <Switch>
        <Route path="/discover">
          <Discover {...{ isLoaded }} />
        </Route>
        <Route path="/stream/:songId">
          <Song
            {...{ h5CanPlay }}
            {...{ audioPlayer }}
            sessionUser={sessionUser}
            {...{ waveLoading }}
            {...{ setWaveLoading }}
            {...{ wavePlayer }}
            {...{ isPlaying }}
            {...{ toggleIsPlaying }}
            {...{ setCurrentAudio }}
            {...{ currentAudio }}
            {...{ setSourceChangeSwitch }}
            {...{ h5CanPlay }}
          />
        </Route>
        <Route exact path="/stream">
          <Songs
            {...{ audioPlayer }}
            sessionUser={sessionUser}
            {...{ setSourceChangeSwitch }}
            {...{ waveLoading }}
            {...{ setWaveLoading }}
            {...{ wavePlayer }}
            {...{ isPlaying }}
            {...{ toggleIsPlaying }}
            {...{ setCurrentAudio }}
            {...{ currentAudio }}
            {...{ h5CanPlay }}
          />
        </Route>
        <Route path="/you/library">
          <LibraryNav />

          <Library />
        </Route>
        <Route path="/upload">
          <Upload sessionUser={sessionUser} />
        </Route>
        {isLoaded && (
          <>
            <Route path="/:username">
              <ProfilePage
                sessionUser={sessionUser}
                {...{ audioPlayer }}
                {...{ wavePlayer }}
                {...{ setSourceChangeSwitch }}
                {...{ waveLoading }}
                {...{ setWaveLoading }}
                {...{ wavePlayer }}
                {...{ isPlaying }}
                {...{ toggleIsPlaying }}
                {...{ setCurrentAudio }}
                {...{ currentAudio }}
                {...{ h5CanPlay }}
                {...{setCurrentAudio}}
         
              />
            </Route>
            <Route path="/search">
              <SearchResults
                {...{ audioPlayer }}
                {...{ isLoaded }}
                sessionUser={sessionUser}
                {...{ setSourceChangeSwitch }}
                {...{ waveLoading }}
                {...{ setWaveLoading }}
                {...{ wavePlayer }}
                {...{ isPlaying }}
                {...{ toggleIsPlaying }}
                {...{ setCurrentAudio }}
                {...{ currentAudio }}
                {...{ h5CanPlay }}
              />
            </Route>
          </>
        )}
      </Switch>
    </div>
  );
};

export default UserHomePage;
