import "./SearchSongs.css";
import HomePageSongs from "./HomePageSongs.js"

const SearchSongs = ( {setSignInToggle}) => {
  return (
    <>
      <div className="home-search-container">
        <input  placeholder="Search for artists, bands, or tracks"></input>
        <HomePageSongs  {...{setSignInToggle}}/>
      </div>

    </>
  );
};

export default SearchSongs;
