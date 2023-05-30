import { Link, useHistory } from "react-router-dom";
import Waveform from "../../Waveform";
import "./SearchResults.css";

const SearchSongs = ({
  songResults,

  waveLoading,
  setWaveLoading,
  wavePlayer,
  audioPlayer,
  currentAudio,
  isPlaying,
  toggleIsPlaying,
  setSourceChangeSwitch,
  setCurrentAudio,
  h5CanPlay,
  signInToggle,
  setSignInToggle,
  signUpToggle,
  setSignUpToggle,
}) => {
  const history = useHistory();
  const handleImageClick = (song) => {

    history.push(`/stream/${song.id}`);
  };
  return (
    <>
      {songResults?.map((song) => {
        return (
          <div className="search-song-card">
            {song?.imageUrl ? (
              <div
                className="image-content"
                onClick={() => handleImageClick(song)}
              >
                <img src={song?.imageUrl} />
              </div>
            ) : (
              <div
                className="image-content"
                onClick={() => handleImageClick(song)}
              >
                <img src="https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg" />
              </div>
            )}

            <div className="waveform-player">
              <Waveform
                {...{ wavePlayer }}
                {...{ setCurrentAudio }}
                audio={song.url}
                {...{ waveLoading }}
                {...{ setWaveLoading }}
                song={song}
                {...{ currentAudio }}
                {...{ isPlaying }}
                {...{ toggleIsPlaying }}
                {...{ setSourceChangeSwitch }}
                {...{ audioPlayer }}
                {...{ h5CanPlay }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SearchSongs;
