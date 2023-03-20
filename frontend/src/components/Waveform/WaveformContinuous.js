import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import WaveSurfer from "wavesurfer.js";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import "./Waveform.css";

const WaveformContinuous = ({ audio }) => {
  const containerRef = useRef();
  const waveSurferRef = useRef({
    isPlaying: () => false,
  });

  console.log(audio);

  const [isLoading, toggleIsLoading] = useState(false);
  const [isPlaying, toggleIsPlaying] = useState(false);
  // const audio = useSelector(state=> (state.currentSong.song))

  useEffect(() => {
    toggleIsLoading(true);
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      cursorWidth: 0,
      barWidth: 2,
      barHeight: 1,
    });
    waveSurfer.load(audio);
    waveSurfer.on("ready", () => {
      waveSurferRef.current = waveSurfer;
    });
    waveSurfer.on("ready", () => {
      toggleIsLoading(false);
    });

    return () => {
      waveSurfer.destroy();
    };
  }, [audio]);

  return (
    <>
      <div className="waveform-button-title">
        <button
          className="waveform-button-all"
          onClick={() => {
            waveSurferRef.current.playPause();
            toggleIsPlaying(waveSurferRef.current.isPlaying());
          }}
          type="button"
        >
          {isPlaying ? (
            <FaPauseCircle size="3em" id="waveform-button" />
          ) : (
            <FaPlayCircle size="3em" id="waveform-button" />
          )}
        </button>
      </div>
      <div className="waveform-container">
        {isLoading && (
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

// WaveformContinuous.propTypes = {
//   audio: PropTypes.string.isRequired,
// };

export default WaveformContinuous;
