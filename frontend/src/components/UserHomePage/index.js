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
import { getAllCurrentSongs } from "../../store/currentSong";

// howler.js range i
const UserHomePage = ({
  waveLoading,
  setSourceChangeSwitch,
  setWaveLoading,
  isPlaying,
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
  const sessionUser = useSelector((state) => state.session.user);


  console.log(searchWord, "SEARCH WORD");
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllPlaylists());
      await dispatch(getAllSongs());
      await dispatch(getSearchResults(searchWord));
    };
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
          <nav className="library-nav">
            {/* <Link to="/you/library/overview">Overview</Link> */}
            {/* <Link to="/you/library/likes">Likes</Link> */}
            <Link to="/you/library/playlists">Playlists</Link>
          </nav>
          <Library />
        </Route>
        <Route path="/upload">
          <Upload sessionUser={sessionUser} />
        </Route>
        {isLoaded && (
          <>
            <Route path="/:username">
              <ProfilePage {...{ audioPlayer }} />
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
        {/* <Route path={`/:username/playlists/:id`}>
          <p>HALLO</p>
          <ProfilePlaylist {...{}}/>
        </Route> */}
      </Switch>
    </div>
  );
};

export default UserHomePage;
