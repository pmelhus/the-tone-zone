import { createUseStyles, useTheme } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { Route, Switch, useLocation } from "react-router-dom";
import { useRef, useEffect, forwardRef, useState } from "react";
import { getAllCurrentSongs } from "../../store/currentSong";
import "./H5Player.css";

const useStyles = createUseStyles((theme) => ({}));

const H5AudioPLayer = ({
  audioPlayer,
  wavePlayer,
  waveLoading,
  currentAudio,
  setCurrentAudio,
  isLoaded,
  setIsLoaded,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const allSongs = useSelector((state) => state.songs);
  const currentSong = useSelector((state) => Object.values(state.currentSong));
  const songId = parseInt(pathname.split("/")[2]);

  const wavePlayFunc = (e) => {
if (!waveLoading) {

  if (!wavePlayer.current?.isPlaying()) {
    wavePlayer.current.play();
  } else {
    return;
  }
} else {
  return
}
  };

  const wavePauseFunc = (e) => {
if (!waveLoading) {

  if (wavePlayer.current?.isPlaying()) {
    wavePlayer.current.pause();
  } else {
    return;
  }
} else {
  return
}
  };

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
      e.currentTime = currentSeekedTime;
      wavePlayer.current.seekTo(seekPercentDecimal);
    };
    await changeCurrentTimeToSeekedTime();
  };


  useEffect(() => {
    if (currentSong?.id === currentAudio?.id) {

      setCurrentAudio(allSongs[currentSong[0]?.songId]);
    }
  }, [currentSong]);

  useEffect(()=> {
console.log(currentAudio, 'CURRENT AUDIO IN H5 PLAYER')
  }, [currentAudio])

  return (
    <div style={{ zIndex: "100" }} className="continuous-audio-playback">
      {pathname !== "/" && isLoaded && (
        <div className="audio-player-div">
          <AudioPlayer
            className="audio-player"
            showSkipControls={false}
            showJumpControls={false}
            src={currentAudio?.url}
            layout="horizontal-reverse"
            autoPlayAfterSrcChange={true}
            autoPlay={false}
            onPlay={wavePlayFunc}
            onPause={wavePauseFunc}
            ref={audioPlayer}
            mse={{ onSeek: (e) => onSeek(e) }}
          />

          <div className="continuous-headings">
            <img
              className="continuous-audio-image"
              src={currentAudio?.imageUrl}
            ></img>
            <div className="continuous-name-title">
              <a href={`/${currentAudio?.User?.username}`} id="username">
                {currentAudio?.User?.username}
              </a>
              <a href={`/stream/${currentAudio?.id}`} id="song-title">
                {currentAudio?.title}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default H5AudioPLayer;
