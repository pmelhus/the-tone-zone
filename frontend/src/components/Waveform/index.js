import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import "./Waveform.css";
import { getCurrentSong } from "../../store/currentSong";

const Waveform = ({


  audio,
  song,
  playFunc,
  pauseFunc,
}) => {

  const dispatch = useDispatch();
  const containerRef = useRef();
  const waveSurferRef = useRef({
    isPlaying: () => false,
  });
  const [waveIsLoading, toggleWaveIsLoading] = useState()

  const [isPlaying, toggleIsPlaying] = useState(false);
  // const audio = useSelector(state=> (state.currentSong.song))
  // console.log(universalPlay)
  useEffect(() => {
    toggleWaveIsLoading(true);
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      cursorWidth: 0,
      barWidth: 2,
      barHeight: 1,
    });
    // console.log(waveSurfer)
    if (audio) {
      waveSurfer.load(audio);
    }
    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
      toggleWaveIsLoading(false);
    });
    waveSurfer.setMute(true);

    waveSurfer.on("play", () => {
      // console.log('play')
      playFunc();
    });

    if (playFunc()) {
      waveSurfer.play();
    }

    // setUniversalSeek(waveSurfer.getCurrentTime())
    // console.log(universalSeek, 'UNIVERSAL SEEK')

    // waveSurfer.on("audioprocess", () => {
    //   setUniversalSeek(waveSurfer.getCurrentTime())
    //   console.log(universalSeek, 'UNIVERSAL SEEK')
    // })
    waveSurfer.on("pause", () => {
      pauseFunc();
    });

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
            dispatch(getCurrentSong(song?.id));
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
        {waveIsLoading && (
          <img
            alt="loading"
            src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
          ></img>
        )}
        <div ref={containerRef} />
      </div>
    </>
  );
};

Waveform.propTypes = {
  audio: PropTypes.string.isRequired,
};

export default Waveform;
