import { Link } from "react-router-dom";
import Waveform from "../Waveform";
import "./SearchResults.css";

const SearchSongs = ({ searchResults}) => {
  return (
    <>
      {searchResults.songs &&
        Object.values(searchResults.songs).map((song) => {

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
