import "./SearchSongs.css";
import HomePageSongs from "./HomePageSongs.js";
import { useState } from "react";
import { useHistory} from "react-router-dom"
import {useDispatch} from "react-redux"
import {getSearchResults} from "../../../store/search"
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({

searchForm: {
  paddingTop: '20px'
}
}));


const SearchSongs = ({ setSignInToggle }) => {

  const theme = useTheme();
  const classes = useStyles({ theme });

  const [searchWord, setSearchWord] = useState(null);
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSearchWord = (e) => {
    e.preventDefault();
    setSearchWord(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getSearchResults(searchWord))
    return history.push(`/search/${searchWord}`)
  }

  return (
    <>
      <div className="home-search-container">
        <form className={classes.searchForm} onSubmit={handleSubmit}>
          <input
            placeholder="Search for artists, bands, or tracks"
            value={searchWord}
            onChange={handleSearchWord}
          ></input>
          <button style={{display:'none'}} type="submit"></button>
        </form>
        <HomePageSongs {...{ setSignInToggle }} />
      </div>
    </>
  );
};

export default SearchSongs;
