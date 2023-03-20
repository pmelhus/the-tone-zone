import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "../../../store/search";

const SearchBar = ({setSearchWord, searchWord}) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSearchWord = (e) => {
    e.preventDefault();
    setSearchWord(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      getSearchResults(searchWord).then(history.push(`/search/${searchWord}`))
    );
  };
  return (

  <>
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search for artists, bands, or tracks"
        value={searchWord}
        onChange={handleSearchWord}
      ></input>
      <button style={{ display: "none" }} type="submit"></button>
    </form>
  </>
  )
};

export default SearchBar;
