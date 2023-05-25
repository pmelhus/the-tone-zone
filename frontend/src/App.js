import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import UserHomePage from "./components/UserHomePage/index";
import Waveform from "./components/Waveform";
import WaveSurfer from "wavesurfer.js";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useRef, forwardRef } from "react";
import H5AudioPlayer from "./components/H5Player/index";
import { getAllCurrentSongs } from "./store/currentSong";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { pathname } = useLocation();

  const [signInToggle, setSignInToggle] = useState(false);
  const [signUpToggle, setSignUpToggle] = useState(false);

  const [currentAudio, setCurrentAudio] = useState();
  const [h5CanPlay, setH5CanPlay] = useState(false);

  const [waveLoading, setWaveLoading] = useState(true);
  const [autoPlay, setAutoplay] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.songs);
  const [sourceChangeSwitch, setSourceChangeSwitch] = useState(false);
const [isPlaying, toggleIsPlaying] = useState(false)
  const audioPlayer = useRef();
  const wavePlayer = useRef();

  const [user, setUser] = useState("");

  const setNewTime = (player, time) => {
    player.currentTime = time;
  };

  useEffect(() => {
    const getUser = async () => {
      const sessionUser = await dispatch(sessionActions.restoreUser());

      if (sessionUser) {
        const currentSongs = await dispatch(
          getAllCurrentSongs(sessionUser?.id)
        );
      }
    };
    getUser();
    setIsLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    const getUser = async () => {
      const sessionUser = await dispatch(sessionActions.restoreUser());
      if (sessionUser) {
        const currentSongs = await dispatch(
          await getAllCurrentSongs(sessionUser?.id)
        );
      }
    };
    getUser();
    setIsLoaded(true);
  }, [pathname]);

  return (
    <>
      <Switch>
        <Route exact path="/">
          {isLoaded && (
            <HomePage
              {...{ signUpToggle }}
              {...{ setSignUpToggle }}
              {...{ signInToggle }}
              {...{ setSignInToggle }}
            />
          )}
        </Route>
        <div className="home-body-container">
          <Navigation
            isLoaded={isLoaded}
            {...{ signUpToggle }}
            {...{ setSignUpToggle }}
            {...{ signInToggle }}
            {...{ setSignInToggle }}
          />
          {isLoaded && sessionUser && (
            <UserHomePage
              {...{ audioPlayer }}
              {...{ waveLoading }}
              {...{ setWaveLoading }}
              {...{ wavePlayer }}
              {...{ setCurrentAudio }}
              {...{toggleIsPlaying}}
              {...{isPlaying}}
              {...{ sessionUser }}
              {...{ currentAudio }}
              {...{ setSourceChangeSwitch }}
              {...{ h5CanPlay }}
            />
          )}
          <H5AudioPlayer
            {...{ waveLoading }}
            {...{ audioPlayer }}
            {...{ sourceChangeSwitch }}
            {...{ wavePlayer }}
            {...{ isLoaded }}
            {...{ setIsLoaded }}
            {...{ setCurrentAudio }}
            {...{ currentAudio }}
            {...{ h5CanPlay }}
            {...{ setH5CanPlay }}
          />
        </div>
      </Switch>
    </>
  );
}

export default App;
