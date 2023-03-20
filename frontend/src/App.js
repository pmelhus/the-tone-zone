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
  let currentAudio = useSelector((state) => state.currentSong);

  const [signInToggle, setSignInToggle] = useState(false);
  const [signUpToggle, setSignUpToggle] = useState(false);
  const [play, setPlay] = useState(false);
  const [pause, setPause] = useState(false);
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

  let h5CurrentTime = audioPlayer.current?.audio.current.currentTime;
  let h5Duration = audioPlayer.current?.audio.current.duration;

  const [currentTime, setCurrentTime] = useState(h5CurrentTime);

  const getCurrentDurationPercent = () => {
    let percentage = h5CurrentTime / h5Duration;
    console.log(h5CurrentTime, h5Duration, "TIME AND DURATION");
    return percentage;
  };

  const playFunc = () => {
    audioPlayer.current?.audio.current.play();

    // wavePlayer.current.play();
    // togglePlaying(true)
    // wavePlayer.current.play()
    // setPlay(true)
    // setPause(false)
  };

  const pauseFunc = () => {
    audioPlayer.current?.audio.current.pause();
    // setPlay(false)
    // setPause(true)
    // wavePlayer.current.pause();
    // togglePlaying(false)
  };

  const playFunc2 = (e) => {
    wavePlayer.current.play();

    // wavePlayer.pause = false;
  };

  const pauseFunc2 = (e) => {
    wavePlayer.current.pause();

    // wavePlayer.pause = true;
  };

  //     useEffect(()=> {

  // //  console.log( getCurrentDurationPercent(), 'TIME')
  // setCurrentTime(h5CurrentTime)

  //     }, [h5CurrentTime])

  const setNewTime = (player, time) => {
    player.currentTime = time;
  };
  // console.log(sessionUser)

  const onSeek = async (e) => {
    let seekPercentageString =
      audioPlayer.current.progressBar.current.ariaValueNow;
    let h5CurrentTime = audioPlayer.current?.audio.current.currentTime;
    let h5Duration = audioPlayer.current?.audio.current.duration;
    // Do something with the current time
    let seekPercentage = parseFloat(seekPercentageString, 10);

    const changeCurrentTimeToSeekedTime = () => {
      let seekPercentDecimal = seekPercentage * 0.01;
      let currentSeekedTime = seekPercentDecimal * h5Duration;
      let h5IsPlaying = audioPlayer.current.isPlaying();
      e.currentTime = currentSeekedTime;
      wavePlayer.current.seekTo(seekPercentDecimal);
      if (h5IsPlaying) {
        e.pause();
      }
    };


    await changeCurrentTimeToSeekedTime();
  };

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
              {...{ playFunc }}
              {...{ pauseFunc }}
              {...{ sessionUser }}
              {...{ waveLoading }}
              {...{ setWaveLoading }}
              {...{ wavePlayer }}
            />
          )}
        </div>
      </Switch>
      <div style={{ zIndex: "100" }} className="continuous-audio-playback">
        {currentAudio && isLoaded && (
          <div>
            <AudioPlayer
              className="audio-player"
              src={currentAudio.url}
              onPlay={playFunc2}
              onPause={pauseFunc2}
              layout="horizontal-reverse"
              autoPlayAfterSrcChange={true}
              // autoPlay={true}
              ref={audioPlayer}
              mse={{ onSeek: (e) => onSeek(e) }}
            />

            <div className="continuous-headings">
              <a href={`/${currentAudio?.User?.username}`} id="username">
                {currentAudio.User?.username}
              </a>
              <a href={`/stream/${currentAudio?.id}`} id="song-title">
                {currentAudio?.title}
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
