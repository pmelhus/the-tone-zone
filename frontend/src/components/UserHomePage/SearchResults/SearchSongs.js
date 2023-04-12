import { Link } from "react-router-dom";
import Waveform from "../../Waveform";
import "./SearchResults.css";

const SearchSongs = ({
  songResults,
  sessionUser,
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
}) => {
  return (
    <>
      {songResults?.map((song) => {
        return (

            <div className="search-song-card">
              <div className="song-image-container">
                <Link to={`/stream/${song.id}`}>
                  <img
                    id={song.imageUrl ? "song-image" : "song-no-image"}
                    src={song.imageUrl}
                  ></img>
                </Link>
              </div>
              <div className="song-search-player">
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
                />
              </div>
            </div>

        );
      })}
    </>
  );
};

export default SearchSongs;
