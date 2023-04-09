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
  waveLoading,
  setWaveLoading,
  audio,
  song,
  wavePlayer,
  currentAudio,
  audioPlayer,
  setCurrentAudio,
  setSourceChangeSwitch,
}) => {
  const dispatch = useDispatch();
  const containerRef = useRef();



  const [isPlaying, toggleIsPlaying] = useState(false);
  const user = useSelector((state) => state.session.user);

  const { pathname } = useLocation();


  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      cursorWidth: 0,
      barWidth: 2,
      barHeight: 1,
    });

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

    if (audio) {
      waveSurfer.load(audio);
    }

    // if  (audioPlayer.current.audio.current.src === audio) {
    //   wavePlayer.current = waveSurfer
    // }

    waveSurfer.on("ready", () => {
      if (audioPlayer.current.audio.current.src === audio) {
        wavePlayer.current = waveSurfer;
        changeCurrentTimeToSeekedTime(seekPercentDecimal);
      }
      setWaveLoading(false);
      waveSurfer.setMute(true);
    });

    waveSurfer.on("play", () => {
      wavePlayer.current = waveSurfer;
      if (audioPlayer.current.audio.current.src === audio) {
        toggleIsPlaying(true);
      }
    });

    waveSurfer.on("pause", () => {
      wavePlayer.current = waveSurfer;
      if (audioPlayer.current.audio.current.src === audio) {
        toggleIsPlaying(false);
      }
    });

    waveSurfer.on("seek", (e) => {
      let h5Duration = audioPlayer.current?.audio.current.duration;
      let newSeekedValue = e * h5Duration;
      const seek = () => {
        audioPlayer.current.audio.current.currentTime = newSeekedValue;
      };

      if (audioPlayer.current.audio.current.src === audio) {
        wavePlayer.current = waveSurfer;
        seek();
      }
    });

    return () => {
      waveSurfer.destroy();
      setSourceChangeSwitch(false);
    };
  }, [audio, pathname]);


  const handlePlayButton = () => {
    // if there is a currentSong in DB, then play/pause h5 audio player

    const payload = { user, song };

    if (audioPlayer.current.audio.current.src === audio) {
      if (audioPlayer.current.isPlaying()) {
        audioPlayer.current.audio.current.pause();
        toggleIsPlaying(false);
        setSourceChangeSwitch(false);
      } else {
        audioPlayer.current.audio.current.play();
        toggleIsPlaying(true);
        setSourceChangeSwitch(false);
      }
    } else {
      // replace the currentsong in DB with the new song.

      const replaceCurrentSong = async () => {
        await dispatch(deleteCurrentSong());
        await dispatch(createCurrentSong(payload));
      };
      setSourceChangeSwitch(true);
      replaceCurrentSong();
      setCurrentAudio(song);

      audioPlayer.current.audio.current.play();
      toggleIsPlaying(true);
    }
  };

  return (
    <>
      <div className="waveform-button-title">
        {waveLoading ? (
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
          {waveLoading && (
            <img
              alt="loading"
              src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
            ></img>
          )}
        </div>

        <div ref={containerRef} />
      </div>
    </>
  );
};

Waveform.propTypes = {
  audio: PropTypes.string.isRequired,
};

export default Waveform;
