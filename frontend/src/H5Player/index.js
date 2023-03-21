import { createUseStyles, useTheme } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { Route, Switch, useLocation } from "react-router-dom";
import { useRef, forwardRef } from "react";

const useStyles = createUseStyles((theme) => ({}));

const H5AudioPLayer = ({ isLoaded, audioPlayer, wavePlayer, waveLoading }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  let currentAudio = useSelector((state) => state.currentSong);

  const { pathname } = useLocation();

  const wavePlayFunc = (e) => {
    if (!wavePlayer.current.isPlaying()) {
      wavePlayer.current.play();
    }
  };

  const wavePauseFunc = (e) => {
    if (wavePlayer.current.isPlaying()) {
      wavePlayer.current.pause();
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
      let h5IsPlaying = audioPlayer.current.isPlaying();
      e.currentTime = currentSeekedTime;
      wavePlayer.current.seekTo(seekPercentDecimal);
    };

    await changeCurrentTimeToSeekedTime();
    await console.log(audioPlayer.current, "CURRENT");
  };

  return (
    <div style={{ zIndex: "100" }} className="continuous-audio-playback">
      {isLoaded && !waveLoading && pathname !== "/" && (
        <div>
          <AudioPlayer
            className="audio-player"
            src={currentAudio.url}
            onPlay={wavePlayFunc}
            onPause={wavePauseFunc}
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
  );
};

export default H5AudioPLayer;
