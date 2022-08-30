import { Route, Switch, Link, NavLink, useLocation } from "react-router-dom";
import ProfilePlaylists from "./ProfilePlaylists";
import { useDispatch, useSelector } from "react-redux";
import "./ProfilePage.css";
import ProfileTracks from "./ProfileTracks";
import ProfilePlaylist from "../ProfilePlaylist/index";
import { useState } from "react";

const ProfilePage = ({pauseFunc, playFunc, toggleWaveIsLoading, waveIsLoading}) => {
  const sessionUser = useSelector((state) => state.session.user);
  const [proPlayLoaded, setProPlayLoaded] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <div className="profile-page-main">
        {/* <h2>{sessionUser.username}</h2> */}
        {pathname.split("/")[1] !== "search" && (
          <>
            <NavLink
              hidden={proPlayLoaded}
              to={`/${sessionUser?.username}/tracks`}
            >
              Tracks
            </NavLink>
            <NavLink
              hidden={proPlayLoaded}
              to={`/${sessionUser?.username}/playlists`}
            >
              Playlists
            </NavLink>

            <Route exact path={`/${sessionUser?.username}/playlists`}>
              <ProfilePlaylists
                proPlayLoaded={proPlayLoaded}
                setProPlayLoaded={setProPlayLoaded}
                {...{toggleWaveIsLoading}}
                {...{waveIsLoading}}
              />
            </Route>

            <Route exact path={`/${sessionUser?.username}/tracks`}>
              <ProfileTracks
                proPlayLoaded={proPlayLoaded}
                setProPlayLoaded={setProPlayLoaded}
              />
            </Route>
          </>
        )}
      </div>
      <Route path={`/:username/playlists/:id`}>
        <ProfilePlaylist
        {...{pauseFunc}} {...{playFunc}}
          proPlayLoaded={proPlayLoaded}
          setProPlayLoaded={setProPlayLoaded}
          {...{toggleWaveIsLoading}}
          {...{waveIsLoading}}
        />
      </Route>
    </>
  );
};

export default ProfilePage;
