import { useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import PlaylistSong from "../UserHomePage/ProfilePlaylist/PlaylistSong";
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
  waveLoading,
  sessionUser,
  setShowSelected,
  showSelected,
  audioPlayer,
  setCurrentAudio,
  h5CanPlay,
  setSourceChangeSwitch,
  playlist,
  songPage,
  setUrl,
  playlistPage,

  setTitle,
}) => {
  const dispatch = useDispatch();
  const containerRef = useRef();

  const [waveHover, setWaveHover] = useState(false);
  const [isPlaying, toggleIsPlaying] = useState(false);

  const user = useSelector((state) => state.session.user);

  const history = useHistory();

  const [currentlyPlayingRef, setCurrentlyPlayingRef] = useState(null);

  const { pathname } = useLocation();
  const songId = pathname.split("/")[2];
  const search = pathname.split("/")[1];

  const changeCurrentTimeToSeekedTime = (seekPercent) => {
    wavePlayer.current?.seekTo(seekPercent);
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

      await audioPlayer?.current?.audio?.current?.pause();

      if (!wavePlayer.current?.isPlaying()) {
        await wavePlayer.current?.seekTo(0);
      }
      if (wavePlayer.current?.isPlaying()) {
        await wavePlayer.current?.stop();
      }

      // if (wavePlayer.current) {
      //   wavePlayer.current.seekTo(0);
      // }

      await setSourceChangeSwitch(true);
      await replaceCurrentSong();
      await setCurrentAudio(song);

      wavePlayer.current = currentWavePlayer;
      // await audioPlayer?.current?.audio.current.play();

      await wavePlayer.current.play(0);
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

    waveSurfer.load(audio);

    // if  (audioPlayer.current.audio.current.src === audio) {
    //   wavePlayer.current = waveSurfer
    // }

    waveSurfer.on("ready", () => {
      setIndieWaveLoading(false);
      waveSurfer.setMute(true);
      setWaveLoading(false);

      if (audioPlayer.current.audio.current.src === audio) {
        let seekPercentageString =
          audioPlayer.current.progressBar.current.ariaValueNow;
        // Do something with the current time
        let seekPercentage = parseFloat(seekPercentageString, 10);
        let seekPercentDecimal = seekPercentage * 0.0102;
        wavePlayer.current = waveSurfer;
        changeCurrentTimeToSeekedTime(seekPercentDecimal);
      }
    });

    waveSurfer.on("play", () => {
      waveSurfer?.setWaveColor("rgba(51, 51, 51, .5)");
      if (audioPlayer.current.audio.current.src === audio) {
        wavePlayer.current = waveSurfer;
        toggleIsPlaying(true);
      }
    });

    waveSurfer.on("pause", () => {
      toggleIsPlaying(false);
      waveSurfer?.setWaveColor("rgba(51, 51, 51, .4)");
    });

    waveSurfer.on("seek", (e) => {
      let h5Duration = audioPlayer.current?.audio.current.duration;
      let newSeekedValue = e * h5Duration;
      // audioPlayer.current.audio.current.currentTime = newSeekedValue;
      const seek = () => {
        audioPlayer.current.audio.current.currentTime = newSeekedValue;
      };

      if (audioPlayer.current.audio.current.src === audio) {
        // if (audioPlayer.current.isPlaying()) {
        //   return;
        // }
        seek();
      } else {
        const payload = { user, song };
        const replaceCurrentSong = async () => {
          await dispatch(deleteCurrentSong());
          await dispatch(createCurrentSong(payload));
        };
        setSourceChangeSwitch(true);
        setCurrentAudio(song);
        replaceCurrentSong();

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
      if (wavePlayer?.current !== waveSurfer) {
        waveSurfer.destroy();
      }
      setSourceChangeSwitch(false);
    };
  }, [audio, pathname]);

  const handleWaveHover = () => {
    if (!currentWavePlayer?.isPlaying()) {
      currentWavePlayer.setWaveColor("rgba(51, 51, 51, .5)");
    }
  };

  const handleWaveHoverLeave = () => {
    if (!currentWavePlayer?.isPlaying()) {
      currentWavePlayer.setWaveColor("rgb(51, 51, 51, .4)");
    }
  };

  const handleSongTitle = () => {
    history.push(`/stream/${song.id}`);
  };

  return (
    <>
      <div className="waveform-button-title">
        {indieWaveLoading && !h5CanPlay ? (
          <FaPlayCircle
            size="4em"
            disabled
            id={
              songPage
                ? "waveform-button-disabled-songPage"
                : "waveform-button-disabled"
            }
          />
        ) : (
          <button
            className={"waveform-button-all"}
            onClick={handlePlayButton}
            type="button"
          >
            {isPlaying ? (
              <FaPauseCircle
                size="4em"
                id={songPage ? "waveform-button-songPage" : "waveform-button"}
              />
            ) : (
              <FaPlayCircle
                size="4em"
                id={songPage ? "waveform-button-songPage" : "waveform-button"}
              />
            )}
          </button>
        )}

        {playlistPage ? (
          <>
            <div className="title-song-player">
              <p id="title-p">{playlist?.title}</p>
              <p id="username-p"> {playlist?.User.username}</p>
            </div>
          </>
        ) : (
          <>
            {songPage ? (
              <div className="title-song-player">
                <p id="title-p">{song?.title}</p>
                {playlistPage ? (
                  <>
                    <p id="username-p"></p>
                  </>
                ) : (
                  <>
                    <p ç>{song?.User?.username}</p>
                  </>
                )}
              </div>
            ) : (
              <div className="waveform-headings">
                <div>
                  <div id="username">{song?.User?.username}</div>
                </div>
                <div>
                  <div onClick={handleSongTitle} id="song-title">
                    {song?.title}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="waveform-container">
        <div className="waveform-image-container">
          {indieWaveLoading && !h5CanPlay && (
            <div
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "60px",
                right: "50%",
              }}
            >
              <img
                className="loading-image-gif"
                alt="loading"
                src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
              ></img>
            </div>
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
