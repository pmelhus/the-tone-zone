import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
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
  const waveSurferRef = useRef({
    isPlaying: () => false,
  });
  const [time, setTime] = useState(null);

  const [isPlaying, toggleIsPlaying] = useState(false);
  const user = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.songs);

  // const h5AudioPlayer = audioPlayer.current?.audio.current;

  // const h5PauseFunc = () => {
  //   if (audioPlayer.current.isPlaying()) {
  //     audioPlayer.current?.audio.current.pause();
  //   } else {
  //     return;
  //   }
  // };

  // const h5PlayFunc = () => {
  //   if (!audioPlayer.current.isPlaying()) {
  //     audioPlayer.current?.audio.current.play();
  //   } else {
  //     return;
  //   }
  // };
  // const audio = useSelector(state=> (state.currentSong.song))
  // console.log(universalPlay)
console.log(audio)
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
      waveSurferRef.current = waveSurfer;
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
      changeCurrentTimeToSeekedTime();
    });

    waveSurfer.on("play", () => {
      waveSurferRef.current = waveSurfer;
      if (wavePlayer) {
        wavePlayer.current = waveSurfer;
      }
      toggleIsPlaying(true);
    });

    waveSurfer.on("pause", () => {
      waveSurferRef.current = waveSurfer;
      if (wavePlayer) {
        wavePlayer.current = waveSurfer;
      }
      toggleIsPlaying(false);
    });

    waveSurfer.on("seek", (e) => {
      let h5Duration = audioPlayer.current?.audio.current.duration;
      let progressBarValue = e;
      let h5CurrentTime = audioPlayer.current?.audio.current.currentTime;

      let newSeekedValue = e * h5Duration;
      const seek = () => {
        audioPlayer.current.audio.current.currentTime = newSeekedValue;
      };
      seek();
    });

    // setUniversalSeek(waveSurfer.getCurrentTime())
    // console.log(universalSeek, 'UNIVERSAL SEEK')

    // waveSurfer.on("audioprocess", () => {
    //   setUniversalSeek(waveSurfer.getCurrentTime())
    //   console.log(universalSeek, 'UNIVERSAL SEEK')
    // })

    // if (universalPlay) {
    //   waveSurfer.play()
    // }

    // if (universalPause) waveSurfer.pause()

    return () => {
      waveSurfer.destroy();
    };
  }, [audio]);

  // if (audio) {
  //   return (
  //     <>
  //       <p>No audio file!</p>
  //     </>
  //   );
  // }

  const fetchNewData = async () => {
    const payload = { user, song };
    // first check if currentSong exists
    const getCurrent = await dispatch(getCurrentSong(song.id));
    await console.log(getCurrent, "getCurrent");
    if (getCurrent) {
      // if it does exist, check to see if currentSong matches with song and if it does, play h5 player
      console.log(song, getCurrent, 'SONGS')
      if (song.id === getCurrent.id) {
        if (!currentAudio) {
          setCurrentAudio(getCurrent)
        }
        if (audioPlayer.current.isPlaying()) {
          await audioPlayer.current.audio.current.pause();
          await toggleIsPlaying(false);
        } else {

          await audioPlayer.current.audio.current.play();
          await toggleIsPlaying(true);
        }

        return false;
      } else {
        // if it doesn't match, delete old currentSong and create new currentSong
        await dispatch(deleteCurrentSong());
        const newCurrentSong = await dispatch(createCurrentSong(payload));
        return newCurrentSong;
      }
    } else {
      // if currentSong doesn't exist, createCurrentSong and then set currentAudio state to new currentSong
      await dispatch(deleteCurrentSong());
      const newCurrentSong = await dispatch(createCurrentSong(payload));

      return newCurrentSong.song;
    }
  };

  const handlePlayButton = async () => {
    const result = await fetchNewData();
    await console.log(result, "RESULT");
    if (result) {
      await setCurrentAudio(result);
    }
  };

  return (
    <>
      <div className="waveform-button-title">
        <button
          className="waveform-button-all"
          onClick={handlePlayButton}
          type="button"
        >
          {isPlaying ? (
            <FaPauseCircle size="3em" id="waveform-button" />
          ) : (
            <FaPlayCircle size="3em" id="waveform-button" />
          )}
        </button>
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
