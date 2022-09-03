import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import "./Waveform.css";
import { getCurrentSong } from "../../store/currentSong";

const Waveform = ({
  waveLoading,
  setWaveLoading,
  audio,
  song,
  playFunc,
  pauseFunc,
wavePlayer



}) => {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const waveSurferRef = useRef({
    isPlaying: () => false,
  });
const [time, setTime] = useState(null)

const [isPlaying, toggleIsPlaying] = useState()
const [currentAudio, setCurrentAudio] = useState(null)
console.log(waveSurferRef)
console.log()


  // const audio = useSelector(state=> (state.currentSong.song))
  // console.log(universalPlay)
  useEffect(() => {

     const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      cursorWidth: 0,
      barWidth: 2,
      barHeight: 1,
    });


    console.log(waveSurferRef.current)
    if (audio) {
      waveSurfer.load(audio);
    }
    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
      wavePlayer.current = waveSurfer;

      setWaveLoading(false);
      waveSurfer.setMute(true);
    });

    if (audio !== currentAudio) {
      waveSurfer.pause()
    }

    waveSurfer.on("play", () => {
      // console.log('play')
      playFunc();
      waveSurferRef.current = waveSurfer;
      if (wavePlayer) {

        wavePlayer.current = waveSurfer;
      }
      toggleIsPlaying(true)
      setCurrentAudio(audio)
      setTime(waveSurfer.getCurrentTime())
    });
    waveSurfer.on("pause", () => {
      pauseFunc();
      waveSurferRef.current = waveSurfer;
      if (wavePlayer) {

        wavePlayer.current = waveSurfer;
      }
      toggleIsPlaying(false)
      setTime(waveSurfer.getCurrentTime())

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

  return (
    <>
      <div className="waveform-button-title">
        <button
          className="waveform-button-all"
          onClick={() => {
            waveSurferRef.current.playPause();
            toggleIsPlaying(waveSurferRef.current.isPlaying());
            dispatch(getCurrentSong(song.id, time));
          }}
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
