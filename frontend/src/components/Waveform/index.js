import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import {
  FaPlayCircle,
  FaPauseCircle,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import "./Waveform.css";
import {
  createCurrentSong,
  getCurrentSong,
  deleteCurrentSong,
} from "../../store/currentSong";

const Waveform = ({
  setWaveLoading,
  audio,
  song,
  wavePlayer,
  audioPlayer,
  setCurrentAudio,
  h5CanPlay,
  setSourceChangeSwitch,
}) => {
  const dispatch = useDispatch();
  const containerRef = useRef();

  const [waveHover, setWaveHover] = useState(false);

  const [isPlaying, toggleIsPlaying] = useState(false);
  const user = useSelector((state) => state.session.user);
  const [currentlyPlayingRef, setCurrentlyPlayingRef] = useState(null);

  const { pathname } = useLocation();

  let seekPercentageString =
    audioPlayer.current.progressBar.current.ariaValueNow;
  let h5CurrentTime = audioPlayer.current?.audio.current.currentTime;
  let h5Duration = audioPlayer.current?.audio.current.duration;
  // Do something with the current time
  let seekPercentage = parseFloat(seekPercentageString, 10);
  let seekPercentDecimal = seekPercentage * 0.01;

  const changeCurrentTimeToSeekedTime = (seekPercent) => {
    wavePlayer?.current?.seekTo(seekPercent);
    if (audioPlayer.current?.isPlaying()) {
      wavePlayer.current?.play();
    }
  };

  const [currentWavePlayer, setCurrentWavePlayer] = useState(null);
  const [indieWaveLoading, setIndieWaveLoading] = useState(true);

  const handlePlayButton = async () => {
    // if there is a currentSong in DB, then play/pause h5 audio player

    const payload = { user, song };

    if (audioPlayer.current.audio.current.src === audio) {
      if (audioPlayer.current.isPlaying()) {
        await setSourceChangeSwitch(false);
        await audioPlayer.current.audio.current.pause();
        await toggleIsPlaying(false);
      } else {
        await setSourceChangeSwitch(false);
        await audioPlayer.current.audio.current.play();
        await toggleIsPlaying(true);
      }
    } else {
      // replace the currentsong in DB with the new song.
      const replaceCurrentSong = async () => {
        await dispatch(deleteCurrentSong());
        await dispatch(createCurrentSong(payload));
      };

      await audioPlayer.current.audio.current.pause();

      await changeCurrentTimeToSeekedTime(0);
      await setSourceChangeSwitch(true);
      await replaceCurrentSong();
      await setCurrentAudio(song);

      wavePlayer.current = currentWavePlayer;
      await audioPlayer?.current?.audio.current.play();
      await toggleIsPlaying(true);
    }
  };

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      cursorWidth: 0,
      barWidth: 2,
      barHeight: 1,
      waveColor: "rgba(51, 51, 51, .4)",
      progressColor: "rgb(253, 77, 1)",
    });
    setCurrentWavePlayer(waveSurfer);

    if (audio) {
      waveSurfer.load(audio);
    }

    // if  (audioPlayer.current.audio.current.src === audio) {
    //   wavePlayer.current = waveSurfer
    // }

    waveSurfer.on("ready", () => {
      setIndieWaveLoading(false);
      waveSurfer.setMute(true);
      setWaveLoading(false);
      if (audioPlayer.current.audio.current.src === audio) {
        wavePlayer.current = waveSurfer;
        changeCurrentTimeToSeekedTime(seekPercentDecimal);
      }
    });

    waveSurfer.on("play", () => {
      waveSurfer.setWaveColor("rgba(51, 51, 51, .5)");
      if (audioPlayer.current.audio.current.src === audio) {
        wavePlayer.current = waveSurfer;
        toggleIsPlaying(true);
      }
    });

    waveSurfer.on("pause", () => {
      toggleIsPlaying(false);
      waveSurfer.setWaveColor("rgba(51, 51, 51, .4)");
    });

    waveSurfer.on("seek", (e) => {
      let h5Duration = audioPlayer.current?.audio.current.duration;
      let newSeekedValue = e * h5Duration;
      audioPlayer.current.audio.current.currentTime = newSeekedValue;
      const seek = () => {
        audioPlayer.current.audio.current.currentTime = newSeekedValue;
      };

      if (audioPlayer.current.audio.current.src === audio) {
        seek();
      } else {
        const payload = { user, song };
        const replaceCurrentSong = async () => {
          await dispatch(deleteCurrentSong());
          await dispatch(createCurrentSong(payload));
        };
        setSourceChangeSwitch(true);
        replaceCurrentSong();
        setCurrentAudio(song);

        waveSurfer.play(0);
        toggleIsPlaying(true);
      }

      if (
        wavePlayer.current.isPlaying() &&
        audioPlayer.current.audio.current.src !== audio
      ) {
        wavePlayer.current.stop();
      }
      wavePlayer.current = waveSurfer;
    });

    return () => {
      waveSurfer.destroy();
      setSourceChangeSwitch(false);
    };
  }, [audio, pathname]);

  const handleWaveHover = () => {
    if (!currentWavePlayer.isPlaying()) {
      currentWavePlayer.setWaveColor("rgba(51, 51, 51, .5)");
    }
  };

  const handleWaveHoverLeave = () => {
    if (!currentWavePlayer.isPlaying()) {
      currentWavePlayer.setWaveColor("rgb(51, 51, 51, .4)");
    }
  };

  return (
    <>
      <div className="waveform-button-title">
        {indieWaveLoading && h5CanPlay ? (
          <FaPlayCircle size="3em" disabled id="waveform-button-disabled" />
        ) : (
          <button
            className={"waveform-button-all"}
            onClick={handlePlayButton}
            type="button"
          >
            {isPlaying ? (
              <FaPauseCircle size="3em" id="waveform-button" />
            ) : (
              <FaPlayCircle size="3em" id="waveform-button" />
            )}
          </button>
        )}
        <div className="waveform-headings">
          <div>
            <a href={`/${song?.User?.username}`} id="username">
              {song?.User?.username}
            </a>
          </div>
          <div>
            <a href={`/stream/${song?.id}`} id="song-title">
              {song?.title}
            </a>
          </div>
        </div>
      </div>
      <div className="waveform-container">
        <div className="waveform-image-container">
          {indieWaveLoading && h5CanPlay && (
            <img
              alt="loading"
              src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
            ></img>
          )}
        </div>
        <div
          className="container-ref-div"
          onMouseOver={handleWaveHover}
          onMouseLeave={handleWaveHoverLeave}
        >
          <div ref={containerRef} />
        </div>
      </div>
    </>
  );
};

Waveform.propTypes = {
  audio: PropTypes.string.isRequired,
};

export default Waveform;
