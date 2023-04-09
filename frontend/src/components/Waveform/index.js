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

}) => {
  const dispatch = useDispatch();
  const containerRef = useRef();

  const [time, setTime] = useState(null);

  const [isPlaying, toggleIsPlaying] = useState(false);
  const user = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.songs);
  const { pathname } = useLocation();
  const songId = parseInt(pathname.split("/")[2]);
  const currentSong = useSelector((state) =>
  Object.values(state.currentSong)
)[0];





  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      cursorWidth: 0,
      barWidth: 2,
      barHeight: 1,
    });

    if (audio) {
      waveSurfer.load(audio);
    }

    waveSurfer.on("ready", () => {
      wavePlayer.current = waveSurfer;
      setWaveLoading(false);
      waveSurfer.setMute(true);

      let seekPercentageString =
        audioPlayer.current.progressBar.current.ariaValueNow;
      let h5CurrentTime = audioPlayer.current?.audio.current.currentTime;
      let h5Duration = audioPlayer.current?.audio.current.duration;
      // Do something with the current time
      let seekPercentage = parseFloat(seekPercentageString, 10);

      const changeCurrentTimeToSeekedTime = () => {
        let seekPercentDecimal = seekPercentage * 0.01;
        wavePlayer.current.seekTo(seekPercentDecimal);
        if (audioPlayer.current.isPlaying()) {
          wavePlayer.current.play();
        }
      };
      console.log(currentSong, song)
      changeCurrentTimeToSeekedTime();
    });

    waveSurfer.on("play", () => {
      wavePlayer.current = waveSurfer;
      toggleIsPlaying(true);
    });

    waveSurfer.on("pause", () => {
      wavePlayer.current = waveSurfer;
      toggleIsPlaying(false);
    });

    waveSurfer.on("seek", (e) => {
      wavePlayer.current = waveSurfer;
      let h5Duration = audioPlayer.current?.audio.current.duration;
      let newSeekedValue = e * h5Duration;
      const seek = () => {
        audioPlayer.current.audio.current.currentTime = newSeekedValue;
      };

        seek();

    });

    return () => {
      waveSurfer.destroy();
      setWaveLoading(true);
    };
  }, [audio, pathname]);

  const handlePlayButton = () => {
    // if there is a currentSong in DB, then play/pause h5 audio player

    const payload = { user, song };

    if (currentAudio?.id === song?.id) {
      if (audioPlayer.current.isPlaying()) {
        audioPlayer.current.audio.current.pause();
        toggleIsPlaying(false);
      } else {
        audioPlayer.current.audio.current.play();
        toggleIsPlaying(true);
      }
    } else {
      // replace the currentsong in DB with the new song.
      const replaceCurrentSong = async () => {
        await dispatch(deleteCurrentSong());
        await dispatch(createCurrentSong(payload));
      };
      replaceCurrentSong();
      setCurrentAudio(song);
      if (audioPlayer.current.isPlaying()) {
        audioPlayer.current.audio.current.pause();
        toggleIsPlaying(false);
      } else {
        audioPlayer.current.audio.current.play();
        toggleIsPlaying(true);
      }
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
