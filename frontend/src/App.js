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
import { getCurrentSong } from "./store/currentSong";
import H5AudioPlayer from "./H5Player/index"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { pathname } = useLocation();
  const streamUrl = pathname.split("/")[1];
  const currentSongId = parseInt(pathname.split("/")[2]);

  useEffect(async () => {
    await dispatch(sessionActions.restoreUser());
    if (streamUrl === "stream" && currentSongId) {
      await dispatch(getCurrentSong(currentSongId));
    }

    await setIsLoaded(true);
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);


  const [signInToggle, setSignInToggle] = useState(false);
  const [signUpToggle, setSignUpToggle] = useState(false);

  const [waveLoading, setWaveLoading] = useState(true);
  const [autoPlay, setAutoplay] = useState(false);
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

  const setNewTime = (player, time) => {
    player.currentTime = time;
  };
  // console.log(sessionUser)



  return (
    <>
      <Switch>
        <Route exact path="/">
          <HomePage
            {...{ signUpToggle }}
            {...{ setSignUpToggle }}
            {...{ signInToggle }}
            {...{ setSignInToggle }}
          />
        </Route>
        <div className="home-body-container">
          <Navigation
            isLoaded={isLoaded}
            sessionUser={sessionUser}
            {...{ signUpToggle }}
            {...{ setSignUpToggle }}
            {...{ signInToggle }}
            {...{ setSignInToggle }}
          />
          {isLoaded && (
            <UserHomePage

              {...{audioPlayer}}
              {...{ sessionUser }}
              {...{ waveLoading }}
              {...{ setWaveLoading }}
              {...{ wavePlayer }}
            />
          )}
        </div>
      </Switch>
      <H5AudioPlayer {...{waveLoading}}{...{audioPlayer}} {...{wavePlayer}} {...{isLoaded}}/>
    </>
  );
}

export default App;
