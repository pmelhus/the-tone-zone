import { Link } from "react-router-dom";
import Waveform from "../Waveform";
import "./SearchResults.css";

const SearchSongs = ({ searchResults, playFunc, pauseFunc }) => {
  return (
    <>
      {searchResults.songs &&
        Object.values(searchResults.songs).map((song) => {
          console.log(song.url);
          return (
            <ul>
              <li className="search-song-card">
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
                    {...{ pauseFunc }}
                    {...{ playFunc }}
                    {...{ song }}
                    audio={song.url}
                  />
                </div>
              </li>
            </ul>
          );
        })}
    </>
  );
};

export default SearchSongs;
