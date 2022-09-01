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

// howler.js range i
const UserHomePage = ({sessionUser, pauseFunc, playFunc }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const searchWord = pathname.split("/")[2];
  console.log(sessionUser);
  useEffect(() => {
    dispatch(getAllPlaylists());
    dispatch(getAllSongs());
    dispatch(getSearchResults(searchWord));
    setIsLoaded(true);
  }, [dispatch, pathname]);

  return (
    <div className="user-home-body">
      <Switch>
        <Route path="/discover">
          <Discover {...{ isLoaded }} />
        </Route>
        <Route path="/stream/:songId">
          <Song {...{ pauseFunc }} {...{ playFunc }} />
        </Route>
        <Route exact path="/stream">
          <Songs
            {...{ pauseFunc }}
            {...{ playFunc }}
            sessionUser={sessionUser}

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
          {isLoaded &&
          <>

        <Route path="/:username">
        <ProfilePage {...{pauseFunc}} {...{playFunc}}/>

        </Route>
        <Route path="/search">
          <SearchResults {...{pauseFunc}} {...{playFunc}} {...{ isLoaded }} />
        </Route>
          </>
        }
        {/* <Route path={`/:username/playlists/:id`}>
          <p>HALLO</p>
          <ProfilePlaylist {...{}}/>
        </Route> */}
      </Switch>
    </div>
  );
};

export default UserHomePage;
