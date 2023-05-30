import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSearchResults } from "../../../store/search";
import "./SearchBarNav.css";

const SearchBarNav = () => {
  const [searchWord, setSearchWord] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();


  const handleSearchWord = (e) => {
    e.preventDefault();
    setSearchWord(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getSearchResults(searchWord));
    return history.push(`/search/${searchWord}`);
  };

  // useEffect(() => {
  //   dispatch(getSearchResults(searchWord));
  // }, []);

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-bar-input"
          placeholder="Search for artists, bands, or tracks"
          value={searchWord}
          onChange={handleSearchWord}
        ></input>
        <button style={{ display: "none" }} type="submit"></button>
      </form>
    </>
  );
};

export default SearchBarNav;
