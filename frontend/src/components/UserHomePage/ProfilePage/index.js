import { Route, Switch, Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ProfilePage.css";
import ProfileTracks from "./ProfileTracks";
import ProfilePlaylist from "../ProfilePlaylist/index";
import { useState, useEffect } from "react";

const ProfilePage = ({
  setCurrentAudio,
  audioPlayer,
  wavePlayer,
  waveLoading,
  setWaveLoading,
  isPlaying,
  currentAudio,
  toggleIsPlaying,
  setSourceChangeSwitch,
  h5CanPlay,
  sessionUser,
}) => {
  const [proPlayLoaded, setProPlayLoaded] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <div className="profile-page-main">
        <Route path={`/:username/playlists/:id`}>
          <ProfilePlaylist
            {...{ setCurrentAudio }}
            {...{ wavePlayer }}
            {...{ waveLoading }}
            {...{ setWaveLoading }}
            {...{ audioPlayer }}
            {...{ isPlaying }}
            {...{ toggleIsPlaying }}
            {...{ currentAudio }}
            {...{ setSourceChangeSwitch }}
            {...{ h5CanPlay }}
            sessionUser={sessionUser}
          />
        </Route>
      </div>
    </>
  );
};

export default ProfilePage;
