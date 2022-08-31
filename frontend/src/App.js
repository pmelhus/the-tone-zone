import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import UserHomePage from "./components/UserHomePage/index";
import Waveform from "./components/Waveform";
import WaveSurfer from "wavesurfer.js";
import WaveformContinuous from "./components/Waveform/WaveformContinuous";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useRef } from "react";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const sessionUser = useSelector((state) => state.session.user);
  let currentAudio = useSelector((state) => state.currentSong);

  const [signInToggle, setSignInToggle] = useState(false);
  const [signUpToggle, setSignUpToggle] = useState(false);


  // console.log(currentAudio, "CURRENT AUDIO");

  const audioPlayer = useRef();

console.log(WaveSurfer)


  const playFunc = () => {
    audioPlayer.current?.audio.current.play();

  };

  const pauseFunc = () => {
    audioPlayer.current?.audio.current.pause();

  };

  // console.log(audioPlayer.current?.audio.current)

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
        <div>
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

            />
          )}
          <div className="continuous-audio-playback">
            {currentAudio.url && (
              <div>

                  <AudioPlayer
                    className="audio-player"
                    src={currentAudio.url}
                    onPlay={(e) => playFunc()}
                    onPause={(e)=> pauseFunc()}
                    layout="horizontal-reverse"
                    autoPlay={true}
                    ref={audioPlayer}
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
        </div>
      </Switch>
    </>
  );
}

export default App;
