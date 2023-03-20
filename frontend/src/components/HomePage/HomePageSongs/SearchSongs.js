import "./SearchSongs.css";
import HomePageSongs from "./HomePageSongs.js";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const SearchSongs = ({ setSignInToggle }) => {


  return (
    <>
      <div className="home-search-container">
        <HomePageSongs {...{ setSignInToggle }} />
      </div>
    </>
  );
};

export default HomePageSongs;
