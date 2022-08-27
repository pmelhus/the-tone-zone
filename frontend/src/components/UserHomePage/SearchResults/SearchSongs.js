import { Link } from "react-router-dom";


const SearchSongs = ({ searchResults }) => {
  return (
    <>
      {searchResults.songs &&
        Object.values(searchResults.songs).map((song) => {
          console.log(song.url)
          return (
            <ul>
              <li className="search-song-card">
                <div className="song-image-container">
                  <Link to={`/stream/${song.id}`}>
                    <img id={song.imageUrl ? "song-image" : "song-no-image"} src={song.imageUrl}></img>
                  </Link>
                </div>
                <div className="song-search-player">
                  <h4>{song.title}</h4>
                  <p></p>

                </div>
              </li>
            </ul>
          );
        })}
    </>
  );
};

export default SearchSongs;
