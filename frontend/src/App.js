import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import UserHomePage from "./components/UserHomePage/index";
import Waveform from "./components/Waveform";
import WaveSurfer from "wavesurfer.js";
import WaveformContinuous from "./components/Waveform/WaveformContinuous";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useRef, forwardRef } from "react";
import H5AudioPlayer from "./H5Player/index";
import { getAllCurrentSongs } from "./store/currentSong";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { pathname } = useLocation();

  const [signInToggle, setSignInToggle] = useState(false);
  const [signUpToggle, setSignUpToggle] = useState(false);

  const [currentAudio, setCurrentAudio] = useState(null);

  const [waveLoading, setWaveLoading] = useState(true);
  const [autoPlay, setAutoplay] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  // const [isPlaying, toggleIsPlaying] = useState(false);

  // let waveSurfer

  // console.log(currentAudio, "CURRENT AUDIO");
  const audioPlayer = useRef();
  const wavePlayer = useRef();

  // console.log(audioPlayer.current?.audio.current)
  // console.log(wavePlayer)
  // useEffect(()=> {
  //   if (!waveLoading) {
  //     console.log(waveSurfer)
  //   }
  // },[waveLoading])

  //     useEffect(()=> {

  // //  console.log( getCurrentDurationPercent(), 'TIME')
  // setCurrentTime(h5CurrentTime)

  //     }, [h5CurrentTime])
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

        if (currentSongs.length) {
          await setCurrentAudio(currentSongs[0]);
        }
        await setIsLoaded(true);
      } else {
        await setIsLoaded(true);
      }
      getUser();
    };
    //  dispatch(getAllCurrentSongs(sessionUser.id));
  }, [dispatch]);

  useEffect(() => {
    const getUser = async () => {
      const sessionUser = await dispatch(sessionActions.restoreUser());
      if (sessionUser) {
      const currentSongs = await dispatch(getAllCurrentSongs(sessionUser?.id));

      if (currentSongs.length) {
        await setCurrentAudio(currentSongs[0]);
      }
      await setIsLoaded(true);
    } else {
      await setIsLoaded(true)
    }
  }
    getUser();
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
          {isLoaded && (
            <UserHomePage
              {...{ audioPlayer }}
              {...{ waveLoading }}
              {...{ setWaveLoading }}
              {...{ wavePlayer }}
              {...{ setCurrentAudio }}
              {...{ currentAudio }}
            />
          )}
        </div>
      </Switch>
      {isLoaded && (
        <>
          <H5AudioPlayer
            {...{ waveLoading }}
            {...{ audioPlayer }}
            {...{ wavePlayer }}
            {...{ isLoaded }}
            {...{ setCurrentAudio }}
            {...{ currentAudio }}
          />
        </>
      )}
    </>
  );
}

export default App;
